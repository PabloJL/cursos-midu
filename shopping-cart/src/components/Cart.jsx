import { ClearCartIcon, CartIcon } from "./Icons.jsx";
import { useId } from "react";
import "./Cart.css";

function Cart() {
  const cartCheckBoxId = useId();
  return (
    <>
      <label className="cart-button" htmlFor={cartCheckBoxId}>
        <CartIcon />
      </label>
      <input id={cartCheckBoxId} type="checkbox" hidden />

      <aside className="cart">
        <ul>
          <li>
            <img
              src="https://media.es.wired.com/photos/6500b64ec39444b642c78a09/1:1/w_1800,h_1800,c_limit/Apple-iPhone-15-Pro-Hero-Gear.jpg"
              alt="iphone"
            />
            <div>
              <strong>Iphone</strong> -$1499
            </div>

            <footer>
              <small>Qty: 1</small>
              <button>+</button>
            </footer>
          </li>
        </ul>
        <button>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}

export default Cart;
