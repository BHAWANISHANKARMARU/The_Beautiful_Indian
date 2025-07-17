import { useContext } from "react"
import { CartContext } from "../Store/CartContext"
import Modal from "./UI/Modal"
import Button from './UI/Button'
import UserProgressContext from "../Store/UserProgressContext"
import { currencyFormatter } from "../util/currencyFormatter"
export default function Cart() {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)
    const cartTotal = cartCtx.items.reduce((total, item) =>
        total + item.quantity * item.price,
        0
    )
    function handleCloseCart() {
        userProgressCtx.hideCart()
    }

    function handleCheckOut() {
        userProgressCtx.showCheckout()
    }

    return <Modal open={userProgressCtx.progress == 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>{
            cartCtx.items.map((item) => (
                <li className="cart-items">
                    <p>
                        {item.name} - {item.quantity} X {currencyFormatter.format(item.price)}
                    </p>
                    <p className="cart-item-actions">
                        <button onClick={() => cartCtx.removeItems(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => cartCtx.addItems(item)}>+</button>
                    </p>
                </li>
            ))
        }</ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">

            <Button onClick={handleCloseCart}>Close</Button>

            <Button onClick={handleCheckOut}>Go to Checkout</Button>
        </p>
    </Modal>
}