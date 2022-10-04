import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './CartItem'
import { clearCart } from '../features/cart/cartSlice'
import { openModal } from '../features/modal/modalSlice'
const CartContainer = () => {
    const dispatch = useDispatch()
    const { amount, total, cartItems } = useSelector(state => state.cart)
    if (amount < 1) {
        return (
            <section className="cart">
                <header>
                    <h2>Your bag</h2>
                    <h4 className="empty-cart">is currently empty</h4>
                </header>
            </section>
        )
    }
    return (
        <section className="cart">
            <header>
                <h2>Your bag</h2>
            </header>
            <div>
                {cartItems.map(item => <CartItem key={item.id} {...item} />)}
            </div>
            <footer>
                <div className='cart-total'>
                    <hr />
                    <h4>total: <span>${total}</span></h4>
                </div>
                <button onClick={() => dispatch(openModal())} className='btn clear-btn'>clear cart</button>
                {/* <button onClick={() => dispatch(clearCart())} className='btn clear-btn'>clear cart</button> */}
            </footer>
        </section>
    )
}

export default CartContainer