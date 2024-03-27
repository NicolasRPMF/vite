import React, { useState } from "react";
import "./App.css"; // Archivo de estilos CSS
import Swal from "sweetalert2";

import cervezaImage from "../images/cerveza.jpeg";
import fernetImage from "../images/fernet.jpg";
import whiskyImage from "../images/whisky.png";
import vodkaImage from "../images/vodka.jpg";
import ronImage from "../images/ron.jpeg";
import ginImage from "../images/gin.jpg";

function App() {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: "Cerveza", price: 10, image: cervezaImage },
    { id: 2, name: "Fernet", price: 20, image: fernetImage },
    { id: 3, name: "Whisky", price: 30, image: whiskyImage },
    { id: 4, name: "Vodka", price: 15, image: vodkaImage },
    { id: 5, name: "Ron", price: 25, image: ronImage },
    { id: 6, name: "Gin", price: 35, image: ginImage },
  ]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((item, index) => {
        if (index === existingProductIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      Swal.fire(
        "¡Carrito vacío!",
        "Agrega productos antes de confirmar la compra.",
        "error"
      );
      return;
    }

    Swal.fire({
      title: "Confirmar compra",
      html: `
        <p>Total: $${totalPrice}</p>
        <hr>
        <ul>
          ${cart
            .map(
              (product) =>
                `<li>${product.name} - Cantidad: ${product.quantity}</li>`
            )
            .join("")}
        </ul>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]);
        Swal.fire("¡Gracias por tu compra!", "", "success");
      }
    });
  };

  return (
    <div className="App">
      <h1 className="title">Bar LaFak</h1>
      <p className="description">
        En un rincón sombrío de la ciudad se alzaba Lafak, un bar clandestino
        que fungía como el epicentro de la mafia local. Regido por "El Jefe", un
        hombre de mirada fría, Lafak era un refugio de intrigas, traiciones y
        ambiciones despiadadas. Entre el humo del cigarrillo y el aroma a whisky
        barato, mafiosos, políticos corruptos y empresarios ambiciosos se
        congregaban para sellar tratos oscuros y resolver disputas a punta de
        balas. En Lafak, las lealtades eran frágiles y las traiciones, moneda
        corriente, mientras el bar se erguía como un bastión de oscuridad,
        desafiando al destino y manteniendo su reinado de terror sobre la
        ciudad.
      </p>

      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <a href="#inicio">Inicio</a>
          </li>
          <li>
            <a href="#productos">Productos</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
        </ul>
      </nav>

      <div className="products">
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <p style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}>
                {product.name} - ${product.price}
              </p>
              <button onClick={() => addToCart(product)}>
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart">
        <h2>Carrito:</h2>
        <h3>Total: ${totalPrice}</h3>
        <div className="checkout">
          <button onClick={handleCheckout}>Confirmar compra</button>
        </div>
      </div>
      <div style={{ marginBottom: "50px" }}></div>
      <footer className="footer">
        <p>
          Síguenos en Instagram:{" "}
          <a href="#" target="_blank">
            @barlafak
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
