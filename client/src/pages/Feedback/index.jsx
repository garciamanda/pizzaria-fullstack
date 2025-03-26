import React from "react";
import "./index.css";

function Feedback() {

  

  return (
    <div className="feedback mt-32 h-[86vh] w-full flex">
      <div className="sessaofeedback h-[60vh] w-[45%] flex flex-col  justify-center items-center gap-50 mt-15">
        <h1 className="text-[80px] text-white font-bold mt-50">Sessão - <br /> Feedback</h1>
        <div id="icons" className="">
          <i className='bx bxl-facebook'></i> 
          <i className='bx bxl-instagram'></i>
          <i className='bx bxl-tiktok'></i>
        </div>
      </div>
      
      <div className="enviarfeedback h-[65vh] w-[45%] flex justify-center items-center mt-20">
          <div className="caixafeedback w-[30vw] h-[70vh] bg-white rounded-[20px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] p-[20px] transition-all duration-300 ease-in-out">
            <p>Eu quero fazer uma avaliação...</p>

            <div className="btn_feedbackcont flex justify-evenly flex-wrap">
              <button className="btn_feedback cursor-pointer">Positiva</button>
              <button className="btn_feedback cursor-pointer">Negativa</button>
              <button className="btn_feedback cursor-pointer">Sugestão</button>

              <div className="rating flex cursor-pointer mt-[15px]">
                <span className="star" data-value="1">&#9733;</span>
                <span className="star" data-value="2">&#9733;</span>
                <span className="star" data-value="3">&#9733;</span>
                <span className="star" data-value="4">&#9733;</span>
                <span className="star" data-value="5">&#9733;</span>
              </div>
            </div>

            <form action="" method="post">

              <label htmlFor="nome">
                <input type="text" id="nome" maxLength="25" placeholder="Seu Nome:" />
              </label><br />
            
              <label htmlFor="email">
                <input type="email" id="email" maxLength="40" placeholder="Seu Email:" />
                </label>

                <textarea rows="10" cols="50" id="areatexto" placeholder="Digite sua avaliação aqui..."></textarea>

            </form>
            
            <div id="botaoenviar">
              <button id="enviar">
                <div class="svg-wrapper-1">
                  <div class="svg-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path fill="currentColor"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z">
                      </path>Eu quero fazer uma avaliação...
                    </svg>
                  </div>
                </div>
                <span>Enviar Feedback</span>
              </button>
            </div>
            
          </div>
      </div>

    </div>


    






  
  );
}


export default Feedback;
