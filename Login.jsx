import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authUser } from '../Context/context';

function Login() {

let [logindata,setlogindata] = useState( 
  {myemail:'scott@test.com',mypass:'Scott123'}
   )

let handleChange = (e) =>{
  // console.log('car');
  setlogindata(
    {...logindata,[e.target.name]:e.target.value}
  )
}

// tpastify alert

const notifySuccess = () => toast.success('🦄 Login SuccessFul!', {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
 
  });
  
  let notifyUnsuccess = () => toast.error('🦄 Login failed!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
   
    });

    // navigate to dashboard
    let navigate = useNavigate()

// context data
let user= authUser()
// console.log(user);
let {condata,setcondata} = user

// onogin
let handleSubmit = async(e) =>{
  e.preventDefault()
  // console.log(4545);

try {
  //for succesfull operation

let response = await axios.get(`http://localhost:4000/users?email=${logindata.myemail}&password=${logindata.mypass}`)



if(response.data.length > 0){
  // alert('Success')
  // update context
  let user = response.data[0]
setcondata(
  {
    isLoggedIn:true,
    userName:user?.fullName,
    userId:user?.id,
    userData:user
  }
)
  // alert on login
  notifySuccess()

setTimeout(() => {
  navigate('/store')
}, 3000);

}else{
  // alert('Unsuccess')
  notifyUnsuccess()
}

} catch (error) {
    //for unsuccesfull operation
    console.log(error);
}

}

  return (
 
<>
<h1 className='border border-3 p-2 text-bg-info text-center my-3 '>LOGIN</h1>

<form onSubmit={handleSubmit} >
  <input 
  type="text" 
  name="myemail" 
  id=""
  placeholder='UserEmail...'
  className='form-control w-75 m-auto'
  value={logindata.myemail}
onChange={handleChange}
  />
    <input 
  type="text" 
  name="mypass" 
  id=""
  placeholder='UserPassword...'
  className='form-control w-75 m-auto my-3'
  value={logindata.mypass}
  onChange={handleChange}
  />
  <button 
  type='submit' 
  className='btn btn-warning d-block w-50 m-auto fs-5 '>Login</button>
</form>
<ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>

</>

  )
}

export default Login