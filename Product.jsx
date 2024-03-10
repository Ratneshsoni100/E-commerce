import React from 'react'

function Product(props) {
let {name,price,ratings,brandname,categoryname,addToCart,prod} = props

  return (
    <div className='card w-50 d-inline-block '>
      <div className="card-body">
        <div className="card-title text-end shadow-lg p-1 text-bg-warning">
          <h3 >{name}</h3>
        </div>
        <div className="card-text">
          <h5>${(price/100).toFixed(2)}</h5>
       
          <p>#{brandname}  #{categoryname}</p>

          <span> 
            { 
       [...Array(ratings).keys()].map(n=>(
        <i className="fs-6 fa-solid fa-star text-info" key={n}></i>
       ))
             }
             </span>
             <span> 
            { 
       [...Array(5-ratings).keys()].map(n=>(
        <i className="fa-regular fa-star" key={n}></i>
       ))
             }
             </span>
       {
       
        prod.isOrdered === true ? 
        (
          <h5>Added to Cart </h5>
        )
        :
        (
          <button
          onClick={()=>addToCart(prod)}
          className='d-block my-2 mx-auto w-75 btn btn-outline-success'>ADD TO CART</button>
        )
       }
        </div>
      </div>
    </div>
  )
}

export default Product