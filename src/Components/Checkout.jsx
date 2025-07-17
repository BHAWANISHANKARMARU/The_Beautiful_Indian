import { useContext, useState } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../Store/CartContext";
import { currencyFormatter } from "../util/currencyFormatter";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../Store/UserProgressContext";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const cartTotal = cartCtx.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
       

        try {
            const response = await fetch('https://the-beautiful-indian.onrender.com/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order: {
                        items: cartCtx.items,
                        customer: customerData
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong!');
            }

            setSuccess(true);
            cartCtx.clearCart();

            setTimeout(() => {
                userProgressCtx.hideCheckout();
            }, 1500);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Modal open={userProgressCtx.progress === 'Checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {isSubmitting && <p style={{ color: "blue" }}>Submitting order...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                {success && <p style={{ color: "green" }}>Order submitted successfully!</p>}

                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleClose} disabled={isSubmitting}>Close</Button>
                    <Button disabled={isSubmitting}>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
}
