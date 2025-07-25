import { useContext } from 'react'
import logoImg from '../assets/logo.png'
import Button from './UI/Button'
import { CartContext } from '../Store/CartContext'
import UserProgressContext from '../Store/UserProgressContext'

export default function Header() {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0)
    function handleShowCart(){
        userProgressCtx.showCart()
    }
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="logoImage" />
                <h1>THE BEAUTIFUL INDIAN</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}
