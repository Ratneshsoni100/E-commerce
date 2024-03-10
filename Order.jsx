import React from 'react'

function Order(props) {
  let {orderid, productid,userid,quantity,price,productName,isPaymentCompleted, OnBuyClick,onDelClick} = props
  console.log('Orders');
  return (
  <div className="card border my-2 py-3 shadow-lg  w-75 m-auto">
    <div className="card-body">
      
      <h4 className='fs-5'>
      <i className="fa-brands fa-product-hunt mx-2"></i>
        {productName}</h4>
        <table className='table  text-center'>
          <tbody>
      <tr>
      <td>
              Quantity = {quantity}
            </td>
            <td>
              Price = ${price}
            </td>
      </tr>
          </tbody>
        </table>
   {/* buttons for buying and cacelling item */}
{
  isPaymentCompleted===false ?
  <div className=" m-2 d-flex justify-content-evenly ">
  <button 
  onClick={()=>OnBuyClick(orderid,userid,productid,quantity)}
  className="btn btn-success">Buy Now</button>
  <button 
  onClick={()=>onDelClick(orderid)}
  className="btn btn-danger">Remove Item</button>
</div>
:
''
}
   
    </div>
  </div>
  )
}

export default React.memo(Order)