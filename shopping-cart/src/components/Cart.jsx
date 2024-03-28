import { ClearCartIcon, RemoveFromCartIcon, CartIcon } from "./Icons.jsx";
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
            <img src="" alt="iphone" />
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
