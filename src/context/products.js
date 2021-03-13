// products context
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import url from '../utils/URL'
import { featuredProducts, flattenProducts } from '../utils/helpers'
export const ProductContext = React.createContext()

// when we create context, we  have access to the provider and the consumer
// provider, consumer, useContext()
const ProductProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [featured, setFeatured] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get(`${url}/products`).then(response => {
            const featured = featuredProducts(flattenProducts(response.data))
            const products = flattenProducts(response.data)
            setProducts(products)
            setFeatured(featured)
            setLoading(false)
        })

    }, [])
    return (
        <ProductContext.Provider value={{ products, loading, featured }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider
