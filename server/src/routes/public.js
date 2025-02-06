import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import auth from "../middlewares/auth.js";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const __dirname = path.resolve();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, "../uploads");
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.test(ext)) {
      return cb(new Error("Somente arquivos JPG, JPEG e PNG são permitidos!"));
    }
    cb(null, true);
  },
});

const downloadImage = async (imageUrl, filename) => {
  const writer = fs.createWriteStream(
    path.join(__dirname, "../uploads", filename)
  );

  const response = await axios({
    url: imageUrl,
    method: "GET",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

router.post("/cadastro", upload.single("avatar"), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let avatarPath = null;
    if (req.file) {
      avatarPath = `/uploads/${req.file.filename}`;
    }

    const userDB = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        avatar: avatarPath,
      },
    });

    res.status(201).json(userDB);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

router.get("/uploads/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "Arquivo não encontrado" });
  }
});

router.post("/auth/google", async (req, res) => {
  const { token } = req.body;

  try {
    // Verifica o token do Google
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    // Verifica se o usuário já existe no banco de dados
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Cria um novo usuário se não existir
      const filename = `avatar-${Date.now()}.jpg`; // Geração do nome único para o arquivo

      // Quando o avatar é baixado do Google
      await downloadImage(picture, filename);
      const avatarPath = `/uploads/${filename}`;

      user = await prisma.user.create({
        data: {
          name,
          email,
          avatar: avatarPath, // Salvar o caminho no banco de dados
          password: null, // Usuários do Google não terão senha
        },
      });
    }

    // Gera tokens de acesso
    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error("Erro ao autenticar com o Google:", err);
    res.status(400).json({ message: "Erro na autenticação com o Google" });
  }
});

export default router;
