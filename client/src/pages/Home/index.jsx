import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ModalEntradas from "../../components/Modal/ModalEntradas";
import "./index.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { ArrowLeft, ArrowRight, ShoppingCart } from "phosphor-react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import slide_image1 from "/assets/tranding-food-1.png";
import slide_image2 from "/assets/pizza8.webp";
import slide_image3 from "/assets/pizza7.webp";
import slide_image4 from "/assets/pizzas10.png";
import slide_image5 from "/assets/pizza5.avif";
import slide_image6 from "/assets/jardineira-delicioso.jpg";
import slide_image7 from "/assets/pizza(18).jpg";
import Produto from "../../components/Produto/Produto";
import { UserContext } from "../../contexts/UserContext";
import Spinner from "../../components/Spinner/Spinner";

function Home() {
  const [isFloating, setIsFloating] = useState(false);
  const [modalEntradasOpen, setModalEntradasOpen] = useState(false);
  const [selectedEntrada, setSelectedEntrada] = useState(null);

  const handleEntradaClick = (entrada) => {
    setSelectedEntrada(entrada);
    setModalEntradasOpen(true);
  };
  useEffect(() => {
    const handleScroll = () => {
      const cardapioSection = document.getElementById("card-cardapio");
      if (cardapioSection) {
        const { top, bottom } = cardapioSection.getBoundingClientRect();
        const isInside = top <= window.innerHeight / 2 && bottom >= 0;
        setIsFloating(isInside);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTranding = () => {
    const trandingSection = document.getElementById("tranding");
    if (trandingSection) {
      trandingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const produtos = [
    {
      imagem: "/assets/pizza(8).jpg",
      nome: "Pizza de Chocolate",
      descricao:
        "Uma deliciosa explosão de sabor doce, coberta com uma generosa camada de chocolate derretido e finalizada com um toque especial para os apaixonados por sobremesas.",
      preco: "30.25",
    },
    {
      imagem: "/assets/pizza(13).jpg",
      nome: "Pizza de Calabresa",
      descricao:
        "A clássica pizza de calabresa, com fatias suculentas, cebolas fresquinhas e uma pitada de orégano, perfeita para os amantes de sabores intensos.",
      preco: "28.90",
    },
    {
      imagem: "/assets/pizza(16).jpg",
      nome: "Pizza de Carne",
      descricao:
        "Recheada com carne moída temperada, pimentões coloridos e uma camada irresistível de queijo derretido, essa é a escolha certa para quem adora um toque caseiro.",
      preco: "32.00",
    },
    {
      imagem: "/assets/pizza(22).jpg",
      nome: "Pizza de Frango",
      descricao:
        "Frango desfiado suculento, combinado com requeijão cremoso e um toque especial de temperos, trazendo leveza e sabor em cada fatia.",
      preco: "29.90",
    },
  ];

  const entradas = [
    {
      imagem: "/assets/entrada(1).jpg",
      nome: "Pão de alho recheado com queijo",
      descricao:
        "Uma deliciosa explosão de sabor doce, coberta com uma generosa camada de chocolate derretido e finalizada com um toque especial para os apaixonados por sobremesas.",
      preco: "30.25",
    },
    {
      imagem: "/assets/entrada(2).jpg",
      nome: "Bruschetta",
      descricao:
        "A Bruschetta Tradicional é uma entrada clássica italiana, feita com pão tostado, tomate fresco, manjericão e azeite de oliva, finalizada com um toque de balsâmico. Simples e saborosa!",
      preco: "28.90",
    },
    {
      imagem: "/assets/entrada(3).jpg",
      nome: "Provolone à Milanesa",
      descricao:
        "O Provolone à Milanesa é uma entrada deliciosa, com cubos de queijo provolone empanados e fritos até ficarem dourados, servidos com molho de tomate artesanal. Crocante por fora e cremoso por dentro!",
      preco: "32.00",
    },
    {
      imagem: "/assets/entrada(4).jpg",
      nome: "Anéis de Cebola Artesanais",
      descricao:
        "Os Anéis de Cebola Artesanais são uma entrada irresistível, feitos com cebolas frescas empanadas em uma massa temperada e fritas até ficarem douradas. Crocantes e perfeitos para acompanhar com molhos!",
      preco: "29.90",
    },
    {
      imagem: "/assets/entrada(5).jpg",
      nome: "Mini Calzones",
      descricao:
        "Os Mini Calzones são pequenos pastéis italianos assados, recheados com queijo derretido, presunto e ervas. Servidos com molho marinara, são uma entrada deliciosa e cheia de sabor!",
      preco: "30.25",
    },
    {
      imagem: "/assets/entrada(6).jpg",
      nome: "Bolinho de Risoto",
      descricao:
        "Os Bolinho de Risoto são pequenos pastéis italianos assados, recheados com queijo derretido, presunto e ervas. Servidos com molho marinara, são uma entrada deliciosa e cheia de sabor!",
      preco: "28.90",
    },
    {
      imagem: "/assets/entrada(7).webp",
      nome: "Carpaccio de Abobrinha",
      descricao:
        "Carpaccio de Abobrinha são pequenas pizzas assadas, recheadas com queijo derretido, presunto e ervas. Servidas com molho marinara, são uma entrada deliciosa e cheia de sabor!",
      preco: "32.00",
    },
    {
      imagem: "/assets/entrada(8).webp",
      nome: "Tabua de Antepasto",
      descricao:
        "Tabua de Antepasto são pequenas pizzas assadas, recheadas com queijo derretido, presunto e ervas. Servidas com molho marinara, são uma entrada deliciosa e cheia de sabor!",
      preco: "29.90",
    },
  ];

  const bebidas = [
    {
      imagem: "/assets/bebida(1).jpeg",
      nome: "Fanta Laranja",
      descricao: "",
      preco: "5.00",
    },
    {
      imagem: "/assets/bebida(2).jpeg",
      nome: "Fanta Uva",
      descricao: "",
      preco: "5.00",
    },
    {
      imagem: "/assets/bebida(3).jpeg",
      nome: "Sprite",
      descricao: "",
      preco: "5.00",
    },
    {
      imagem: "/assets/bebida(4).jpeg",
      nome: "Guarana",
      descricao: "",
      preco: "5.00",
    },
    {
      imagem: "/assets/bebida(5).webp",
      nome: "Coca-cola",
      descricao: "",
      preco: "5.00",
    },
  ];

  return (
    <main className="">
      <section className="bg-[url('/assets/bg.jpeg')] bg-cover bg-center bg-no-repeat h-screen overflow-hidden items-center flex flex-row relative justify-center z-10">
        <div className="absolute inset-0 bg-[#1D1D1DE6] z-1"></div>

        <div className="home-content relative z-10 flex flex-col justify-center items-center max-w-[600px]">
          <h1 className="text-[#FFC506] text-[30px] uppercase mb-1 font-bold text-center">
            Pizzaria Al Volo
          </h1>
          <h2 className="text-[#837474] text-[15px] uppercase font-normal mb-4">
            Venha conhecer nossa pizzaria
          </h2>
          <div className="btn w-[480px] flex items-center justify-center">
            <button
              className="btnpedido bg-[#FFC506] text-black outline-none text-[10px] font-bold w-[230px] h-[60px] cursor-pointer uppercase rounded-[10px] mt-5 border border-transparent hover:border-[#ffc506] hover:bg-transparent hover:text-[#ffc506] transition duration-300"
              id="btnpedido"
              onClick={handleScrollToTranding}
            >
              Peça Agora
            </button>
          </div>
        </div>
      </section>

      <section id="tranding" className="pt-30 pr-0 tranding">
        <div className="container max-w-[124rem] pt-0 pr-4  mr-auto mb-0 mt-5 ">
          <h1 className=" text-center section-heading text-5xl text-[#f58a26] pt-2 pr-0 font-bold">
            Cardápio Principal
          </h1>
        </div>

        <div className="container max-w-[124rem] pt-5 pr-4 pl-4 mt-2 mr-auto mb-6 ">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: -10,
              depth: 250,
              modifier: 1.5,
              slideShadows: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            modules={[EffectCoverflow, Navigation]}
          >
            <SwiperSlide>
              <img src={slide_image1} />
              <div className="tranding-slide-content">
                <h1 className="food-price">R$25</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">Pizza Especial</h2>
                  <h3 className="food-rating">
                    <span>5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide_image2} />
              <div className="tranding-slide-content">
                <h1 className="food-price">R$36</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">Pizza Calabresa</h2>
                  <h3 className="food-rating">
                    <span>5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide_image3} />
              <div className="tranding-slide-content">
                <h1 className="food-price">R$40</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">Pizza de Folha</h2>
                  <h3 className="food-rating">
                    <span>5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide_image4} />
              <div className="tranding-slide-content">
                <h1 className="food-price">R$15</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">Pizza de Carne</h2>
                  <h3 className="food-rating">
                    <span>5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide_image5} />
              <div className="tranding-slide-content">
                <h1 className="food-price">$15</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">Pizza de Ovo</h2>
                  <h3 className="food-rating">
                    <span>5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide_image6} />
              <div className="tranding-slide-content">
                <h1 className="food-price">R$42</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">Pizza de Verdura</h2>
                  <h3 className="food-rating">
                    <span>5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide_image7} />
              <div className="tranding-slide-content">
                <h1 className="food-price">R$38</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">Pizza de Morango</h2>
                  <h3 className="food-rating">
                    <span>5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className="card-cardapio">
        <h1 className="text-center font-bold text-4xl mt-25">Cardápio</h1>
        <div className="card-cardapio-content">
          <div className="flex items-center my-4">
            <hr className="flex-1 border-t-2 border-gray-300" />
            <p className="mx-4 text-[#F58A26] text-4xl">Pizzas</p>
            <hr className="flex-1 border-t-2 border-gray-300" />
          </div>
        </div>

        <div className="cardapio-title mb-7">
          <h2 className="mt-12 ml-20 font-extrabold text-2xl lg:text-4xl">
            Pizzas Mais Pedidas
          </h2>
          <p className="mt-4 text-[18px] text-[#808080] text-center md:text-left md:ml-20">
            CONFIRA AS PIZZAS MAIS PEDIDAS!
          </p>
        </div>

        <div
          className="cardapio grid  gap-x-[1px] gap-y-5 lg:ml-20 md:ml-20 ml-5 mr-5 mt-2 mb-8 px-0 "
          id="cardapio-principal"
        >
          {produtos.map((produto, index) => (
            <Produto
              key={index}
              imagem={produto.imagem}
              nome={produto.nome}
              descricao={produto.descricao}
              preco={produto.preco}
            />
          ))}
        </div>

        <div className="cardapio-title mb-7">
          <h2 className="mt-12 text-center md:text-left md:ml-20 lg:text-left font-extrabold text-2xl lg:text-4xl lg:ml-20">
            Entradas
          </h2>
          <p className="mt-4 text-[18px] text-[#808080] text-center md:text-left md:ml-20">
            INICIE SEU MOMENTO COM SABOR: ENTRADAS PERFEITAS PARA ABRIR O
            APETITE.
          </p>
        </div>

        <div
          className="cardapio grid gap-x-[1px] gap-y-5 lg:ml-20 md:ml-20 ml-5 mr-5 mt-2 mb-8 px-0"
          id="cardapio-entradas"
        >
          {entradas.map((entrada, index) => (
            <Produto
              key={index}
              imagem={entrada.imagem}
              nome={entrada.nome}
              descricao={entrada.descricao}
              preco={entrada.preco}
              onClick={() => handleEntradaClick(entrada)} // Passa a função corretamente
            />
          ))}
        </div>

        {modalEntradasOpen && (
          <ModalEntradas
            modalEntradasOpen={modalEntradasOpen} // Corrigido para usar o nome correto
            setModalEntradasOpen={setModalEntradasOpen} // Corrigido para usar o nome correto
            imagem={selectedEntrada.imagem}
            nome={selectedEntrada.nome}
            descricao={selectedEntrada.descricao}
            preco={selectedEntrada.preco}
          />
        )}

        <div className="cardapio-title mb-7">
          <h2 className="mt-12 ml-20 font-extrabold text-2xl lg:text-4xl">
            Nossas Pizzas
          </h2>
          <p className="mt-4 text-[18px] text-[#808080] text-center md:text-left md:ml-20">
            CONFIRA AS NOSSAS MELHORES PIZZAS!
          </p>
        </div>

        <div
          className="cardapio grid  gap-x-[1px] gap-y-5 lg:ml-20 md:ml-20 ml-5 mr-5 mt-2 mb-8 px-0"
          id="cardapio-produtos"
        >
          {produtos.map((produto, index) => (
            <Produto
             key={index}
              imagem={produto.imagem}
              nome={produto.nome}
              descricao={produto.descricao}
              preco={produto.preco}
            />
          ))}
        </div>

        <div className="cardapio-title mb-7">
          <h2 className="mt-12 text-center md:text-left md:ml-20 lg:text-left font-extrabold text-2xl lg:text-4xl lg:ml-20">
            Bebidas
          </h2>
          <p className="mt-4 text-[18px] text-[#808080] text-center md:text-left md:ml-20">
            AS BEBIDAS MAIS GOSTOSAS E GELADAS PARA ACOMPANHAR!
          </p>
        </div>

        <div
          className="cardapio grid  gap-x-[1px] gap-y-5 lg:ml-20 md:ml-20 ml-5 mr-5 mt-2 mb-8 px-0"
          id="cardapio-bebidas"
        >
          {bebidas.map((bebida, index) => (
            <Produto
              key={index}
              imagem={bebida.imagem}
              nome={bebida.nome}
              descricao={bebida.descricao}
              preco={bebida.preco}
              onClick={() => handleEntradaClick(bebida)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
