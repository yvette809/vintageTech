import React from "react";
import { useParams } from 'react-router-dom'
import { ProductContext } from '../context/products'
//import {CartContext} from '../context/cart'
import { useHistory } from 'react-router-dom'
import Loading from '../components/Loading'
import { CartContext } from "../context/cart";


export default function ProductDetails() {
  const { id } = useParams()
  const history = useHistory()
  const { products } = React.useContext(ProductContext)
  const { addToCart } = React.useContext(CartContext)
  const product = products.find(item => item.id === parseInt(id))
  const { image, title, price, description } = product
  if (products.length === 0) {
    return <Loading />

  }
  return (
    <section className="single-product">
      <img src={image} alt={title} className="single-product-image" />
      <article>
        <h1>{title}</h1>
        <h2>${price}</h2>
        <p>{description}</p>
        <button className="btn btn-primary btn-block" onClick={() => { addToCart(product); history.push("/cart") }}>add to Cart</button>
      </article>

    </section>
  )
}
