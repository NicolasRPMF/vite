import React, { useState, useEffect } from 'react';
import './App.css'; // Archivo de estilos CSS
import Swal from 'sweetalert2';

function App() {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Cerveza', price: 10 },
    { id: 2, name: 'Fernet', price: 20 },
    { id: 3, name: 'Whisky', price: 30 },
    { id: 4, name: 'Vodka', price: 15 },
    { id: 5, name: 'Ron', price: 25 },
    { id: 6, name: 'Gin', price: 35 }
  ]);



  const addToCart = (product) => {
    // Comprobamos si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      // Si ya está en el carrito, actualizamos la cantidad
      const updatedCart = cart.map((item, index) => {
        if (index === existingProductIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      // Si no está en el carrito, lo agregamos
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productToRemove) => {
    // Eliminamos el producto del carrito
    const updatedCart = cart.filter(product => product !== productToRemove);
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);

  const handleCheckout = () => {
    Swal.fire({
      title: 'Confirmar compra',
      text: `Total: $${totalPrice}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]);
        Swal.fire('¡Gracias por tu compra!', '', 'success');
      }
    });
  };

  return (
    <div className="App">
      <h1 className="title">Bar LaFak</h1>
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
      <div className="products">
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <p style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)' }}>{product.name} - ${product.price}</p>
              <button onClick={() => addToCart(product)}>Agregar al carrito</button>
            </div>
          ))}
        </div>
      </div>
      <div className="cart">
        <h2>Carrito:</h2>
        <ul>
          {cart.map(product => (
            <li key={product.id}>
              {product.name} - Cantidad: {product.quantity} - Total: ${product.price * product.quantity}
              <button onClick={() => removeFromCart(product)}>Eliminar</button>
            </li>
          ))}
        </ul>
        {cart.length > 0 && (
          <div className="checkout">
            <button onClick={handleCheckout}>Confirmar compra</button>
          </div>
        )}
        <h3>Total: ${totalPrice}</h3>
      </div>
    </div>
  );
}

export default App;
