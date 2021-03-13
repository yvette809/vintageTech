// cart context
import React, { useState, useEffect } from 'react'
import localCart from '../utils/localCart'


function getCartFromLocalStorage() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}


const CartContext = React.createContext()

function CartProvider({ children }) {
    const [cart, setCart] = useState(getCartFromLocalStorage())
    const [total, setTotal] = useState(0)
    const [cartItems, setCartItems] = useState(0)

    useEffect(() => {
        //local storage
        localStorage.setItem('cart', JSON.stringify(cart))
        // cart items
        let newCartItems = cart.reduce((total, cartItem) => {
            return (total += cartItem.amount)
        }, 0)
        setCartItems(newCartItems)

        //cart total
        let newTotal = cart.reduce((total, cartItem) => {
            return (total += cartItem.amount * cartItem.price)
        }, 0)
        newTotal = parseFloat(newTotal.toFixed(2))

    }, [cart])

    //remove item
    const removeItem = (id) => {
        const fiteredCart = cart.filter(item => item.id !== id)
        setCart(fiteredCart)
    }
    //increase amount
    const increaseAmount = (id, amount) => {
        if (amount === 1) {
            removeItem(id)
            return
        }
        const newCart = [...cart].map(item => item.id === id ? { ...item, amount: item.amount + 1 } : { ...item })
        setCart(newCart)
    }
    //decrease amount
    const decreaseAmount = (id, amount) => {
        const newCart = [...cart].map(item => item.id === id ? { ...item, amount: item.amount - 1 } : { ...item })
        setCart(newCart)
    }
    //add to cart
    const addToCart = (product) => {
        const { id, image, title, price } = product
        const item = [...cart].find(item => item.id === id)
        if (item) {
            increaseAmount(id)
        } else {
            const newItem = { id, image, title, price, amount: 1 }
            const newCart = [...cart, newItem]
            setCart(newCart)
        }
    }
    //clear cart
    const clearCart = () => {
        setCart([])
    }




    return <CartContext.Provider value={cart, total, cartItems, removeItem, increaseAmount, decreaseAmount, addToCart, clearCart}>
        {children}
    </CartContext.Provider>
}


export { CartContext, CartProvider }