import React from "react";
import Loader from '../assets/loading.gif'

export default function Loading() {
  return (
    <div className="loading">
      <h2>Loading...</h2>
      <img src={Loader} alt="loading gif" />
    </div>
  )
}
