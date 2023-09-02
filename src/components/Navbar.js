import React from "react";
import ReactDOM from "react-dom";

export default function Navbar() {
  return (
    <div>
      <body>
        <nav>
          <a href="#" className="logo">
            Tacotrak
          </a>
          <a
            href="javascript:void(0);"
            className="icon menu-icon"
            onclick="myFunction()"
          >
            <i className="fa fa-bars"></i>
          </a>
          <ul className="nav-list">
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

          <a href="#" className="btn">
            Entrar
          </a>
        </nav>
      </body>
      <div className="content"></div>
    </div>
  );
}

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
