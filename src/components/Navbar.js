import React from "react";
import ReactDOM from "react-dom";

export default function Navbar() {
  return (
    <div>
      <body>
        <nav>
          <a href="#" class="logo">
            Tacotrak
          </a>
          <div class="bx bx-menu" id="menu-icon"></div>

          <ul class="nav-list">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Sobre nos</a>
            </li>
            <li>
              <a href="">Menu</a>
            </li>
            <li>
              <a href="">Ferramentas</a>
            </li>
            <li>
              <a href="">Contato</a>
            </li>
          </ul>

          <a href="#" class="btn">
            Entrar
          </a>
        </nav>
      </body>
      <div class="content"></div>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", function () {
  let menu = document.querySelector("#menu-icon");
  let navList = document.querySelector(".nav-list");

  menu.onclick = () => {
    menu.classList.toggle("bx-x");
    navList.classList.toggle("open");
  };
});
