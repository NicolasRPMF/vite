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
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Cerveza",
      price: 10,
      image: cervezaImage,
      quantityInCart: 0,
    },
    { id: 2, name: "Fernet", price: 20, image: fernetImage, quantityInCart: 0 },
    { id: 3, name: "Whisky", price: 30, image: whiskyImage, quantityInCart: 0 },
    { id: 4, name: "Vodka", price: 15, image: vodkaImage, quantityInCart: 0 },
    { id: 5, name: "Ron", price: 25, image: ronImage, quantityInCart: 0 },
    { id: 6, name: "Gin", price: 35, image: ginImage, quantityInCart: 0 },
  ]);

  const addToCart = (product) => {
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, quantityInCart: p.quantityInCart + 1 } : p
    );
    setProducts(updatedProducts);

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

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);

    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, quantityInCart: 0 } : p
    );
    setProducts(updatedProducts);
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
        setProducts(products.map((p) => ({ ...p, quantityInCart: 0 })));
        Swal.fire("¡Gracias por tu compra!", "", "success");
      }
    });
  };

  return (
    <div className="App">
      <h1 className="title">Bar LaFak</h1>
      <p className="description">
        En este nuevo capítulo de LaFak, no solo se trata de disfrutar de las
        mejores bebidas, sino también de adquirir los productos más exclusivos.
        Junto al bar, se ha establecido una boutique selecta donde los clientes
        pueden comprar las botellas más codiciadas de licores raros y whiskys de
        calidad inigualables. Con una cuidadosa selección de productos de alta
        gama, esta extensión del antiguo bastión de la mafia se ha convertido en
        el epicentro de la cultura de las bebidas finas en la ciudad. Los
        conocedores y los buscadores de lo excepcional ahora acuden a LaFak no
        solo en busca de placer, sino también para satisfacer sus más exigentes
        caprichos.
      </p>

      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <a href="#description">Inicio</a>
          </li>
          <li>
            <a href="#productos">Productos</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
          <li>
            <a href="#carrito">Carrito</a>
          </li>
        </ul>
      </nav>

      <div className="products" id="productos">
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <p style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}>
                {product.name} - ${product.price}
              </p>
              <button onClick={() => addToCart(product)}>
                Agregar al carrito ({product.quantityInCart})
              </button>
              <button onClick={() => removeFromCart(product.id)}>
                Eliminar del carrito
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart" id="carrito">
        <h2>Carrito:</h2>
        <h3>Total: ${totalPrice}</h3>
        <div className="checkout">
          <button onClick={handleCheckout}>Confirmar compra</button>
        </div>
      </div>

      <div style={{ marginBottom: "50px" }}></div>
      <footer className="footer" id="contacto">
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
