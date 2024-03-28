/* eslint-disable react/prop-types */
import { ClearCartIcon, CartIcon } from "./Icons.jsx";
import { useId } from "react";
import { useCart } from "../hooks/useCart.js";
import "./Cart.css";

function CartItem({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

function Cart() {
  const { cart, clearCart, addToCart } = useCart();
  const cartCheckBoxId = useId();
  return (
    <>
      <label className="cart-button" htmlFor={cartCheckBoxId}>
        <CartIcon />
      </label>
      <input id={cartCheckBoxId} type="checkbox" hidden />

      <aside className="cart">
        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}

export default Cart;
