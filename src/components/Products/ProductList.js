import React from "react";
import Product from './Product'

export default function ProductList({title,products}) {
  return (
    <section className="section">
      <h2 className="section-tilte">{title}</h2>
      <div className="products-center">
        {products.map(item=>(
          <Product key={item.id} {...item}/>
        ))}

      </div>
    </section>
  )
}
