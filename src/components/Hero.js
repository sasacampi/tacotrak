import React from "react";
import ReactDOM from "react-dom";
import HeroIMG from "../img/girl.svg";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero--text">
        <h1>
          Inicie Sua Jornada
          <br />
          Saudável com <br />
          <span>Tacotrak.</span>{" "}
        </h1>
        <h2>
          Nosso aplicativo de dieta e fitness usa a Tabela TACO para informações
          precisas sobre alimentos locais. Alcance seus objetivos de saúde com
          confiança!
        </h2>
        <button type="btn" className="btn">
          Comece Gratuitamente
        </button>
      </div>
      <img src={HeroIMG} className="hero--image" alt="Hero Image"></img>
    </div>
  );
}
