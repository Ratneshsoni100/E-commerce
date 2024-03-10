import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { authUser } from '../Context/context'
import { OrdersService, ProductService } from '../../helper';
import Order from './Order';

function Dashboard() {
let [order,setOrder] = useState([])
// console.log(order);
// get data from context
let users = authUser()
// console.log(users);
  // on refrsh
let loadDataFromDatabase = useCallback(
  async() =>{
    try {
      
      let ordersResponse = await axios.get (`http://localhost:4000/orders?userId=${users.condata.userId}`)
     
    
      if(ordersResponse.status=== 200){
        let ordersResponseBody= ordersResponse.data
        // console.log(ordersResponseBody);
        // get all rpoducts
        let productsResponse =await  ProductService.fetchProducts()
    
    // merger product data ibto orders
    if(productsResponse.status===200){
      let productsResponseBody = productsResponse.data
      // console.log(productsResponseBody);
    
    ordersResponseBody.forEach(order => {
      order.product = ProductService.getProductByProductId(productsResponseBody,order.productId)
    });
    setOrder(ordersResponseBody)
    }else{
    
    }
    
      }
    
    } catch (error) {
      console.log(error);
    }
    
    }
  ,[users.condata.userId])

  // get order data for the first time when we will visit the dashboard
useEffect(()=>{
loadDataFromDatabase()
},[users.condata.userId,loadDataFromDatabase])

// console.log(OrdersService.getPrevorders(order));

// onBuyNowClick
let OnBuyClick = useCallback(
  async(orderid,userid,productid,quantity) => {
    // alert(456)
    if(window.confirm('Wanna Buy ?')){
      // alert('Item Bought')
      let neworder = {
        userId:userid,
        productId:productid,
        quantity:quantity,
        isPaymentCompleted:true
      }
      let orderresponse = await axios.patch(`http://localhost:4000/orders/${orderid}`,neworder)
      console.log(orderresponse);
      loadDataFromDatabase()
    }else{
      alert('Buying cancelled')
    }
  }
  ,[loadDataFromDatabase])

let onDelClick = useCallback(async(orderid)=>{
  if(window.confirm('Wanna Remove From Bag ?')){
    let orderresponse = await axios.delete(`http://localhost:4000/orders/${orderid}`)
    if(orderresponse){
      console.log(orderresponse);
      alert('Item Removed From BAG')
      loadDataFromDatabase()
    }
  }
},[loadDataFromDatabase])

  return (
  
    <div className=" border border-2 my-3">
      <div className="header ">
        <h1 className='p-2 text-bg-primary'>DashBoard
      
        <i
        onClick={loadDataFromDatabase}
        className="fa-solid fa-arrows-rotate ms-4 text-warning"></i>
        </h1>
      </div>
      <div className="row border border-danger my-3 gap-2">
        <div className="col-sm-5 bg-info offset-1 p-3 ">
          <h3 className="">
          <i className="fa-solid fa-list-check mx-3"></i>
          <button type="button" className="btn btn-primary position-relative">
  Previous Orders
  <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
    <span className="">
      {OrdersService.getPrevorders(order).length}
    </span>
  </span>
</button>
            </h3>

            {/* show Order componentunder PrevOrders */}

            {
  OrdersService.getPrevorders(order).length === 0 ?
  <h1 className='text-light'>Nothing Purchased Yet</h1> : ''
}

            {
              OrdersService.getPrevorders(order).map(ele=>{
                return <Order
                key={ele.id}
                orderid={ele.id}
                productid= {ele.productId}
                userid={ele.userId}
                quantity={ele.quantity}
                price={ele.product.price}
                productName={ele.product.productName}
                isPaymentCompleted={ele.isPaymentCompleted}
                OnBuyClick={OnBuyClick}
                onDelClick={onDelClick}
                />
              })
            }

        </div>
        {/* cart👇👇👇👇 */}
        <div className="col-sm-5 text-bg-dark p-3">
        <h3 className="">
        <i className="fa-brands fa-opencart mx-3"></i>
        <button type="button" className="btn btn-primary position-relative">
Cart Items
  <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
    <span className="">
      {OrdersService.getCart(order).length}
    </span>
  </span>
</button>
          </h3>
            {/* show Order componentunder cart */}

{
  OrdersService.getCart(order).length === 0 ?
  <h1>No Items Added</h1> : ''
}

            {
              OrdersService.getCart(order).map(ele=>{
                return <Order
                key={ele.id}
                orderid={ele.id}
                productid= {ele.productId}
                userid={ele.userId}
                quantity={ele.quantity}
                price={ele.product.price}
                productName={ele.product.productName}
                isPaymentCompleted={ele.isPaymentCompleted}
                OnBuyClick={OnBuyClick}
                onDelClick={onDelClick}
                />
              })
            }

        </div>
      </div>
    </div>

  )
}

export default Dashboard