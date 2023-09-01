import React from "react";
import ReactDOM from "react-dom";

export default function Navbar() {
  return (
    <div>
        <header>
            <div className="navbar--logo">
            <h1 class="title" >Tacotrak</h1>         
                  </div>
                  <label for="nav-toggle" className = "nav-toggle-label"> 
                    <span className="label-span"></span> 
                  </label>
                  <nav> 
                    <ul>                      
                      <li><a>Home</a></li>
                      <li><a>Sobre nós</a></li>
                      <li><a>Menu</a></li>
                      <li><a>Ferramentas</a></li>
                      <li><a>Contato</a></li> 
                      <li><button><h1>Entrar</h1></button></li>
                    </ul>
                  </nav>
                  
                </header>
                  <div class="content">
                  </div>
                </div>

    )
}
