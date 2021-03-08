import React,{useContext} from "react";
import {ProductContext} from '../context/products'
import Loading from '../components/Loading'
import ProductList from '../components/Products/ProductList'

export default function Products() {
  const {loading,products} = useContext(ProductContext)
 
 if(loading){
   return <Loading/>
 }

 return(
   <ProductList title="our Products" products ={products}/>
 )
}
