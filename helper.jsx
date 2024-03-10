import axios from "axios"

export const ProductService = {
    fetchProducts(){
     return axios.get(`http://localhost:4000/products`)
    },
    getProductByProductId(products,orderPID){
return  products.find((ele)=> ele.id==orderPID )
    }
}


export const OrdersService ={
    //  here the para👇 is orders array of ojects
    getPrevorders(orders){
        return orders.filter(ord=> ord.isPaymentCompleted===true)
    },
    getCart(orders){
        return orders.filter(ord=> ord.isPaymentCompleted===false)
    }
}

export const BrandsService ={
    fetchBrands:()=>{
        return axios.get(`http://localhost:4000/brands`)
    },
    getBrandsByBrandId(brands,brandid){
return brands.find(ele=>ele.id==brandid)
    }
}

export const CategoriesService ={
    fetchCategories:()=>{
        return axios.get(`http://localhost:4000/categories`)
    },
    getCategoryByCategoryId(categories,categoryid){
        return categories.find(ele=>ele.id==categoryid)
            }
}