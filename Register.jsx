import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authUser } from '../Context/context'

function Register() {

let [state,setState] = useState({
email:'',
password:'',
fullName:'',
dateOfBirth:'',
country:'',
gender:'',
receiveNewsLetters:''
})

// onchange
let handleChange = (e) =>{
  setState(
    {...state,[e.target.name]:e.target.value}
  )
}

// //for checkbox reciecenewsLetter
let handleCheck = (e) =>{
  setState(
    {...state,[e.target.name]:e.target.checked}
  )
}

// country filed data
let country = [
  {id:1,countryName:'India'},
  {id:2,countryName:'Nepal'},
  {id:3,countryName:'Bhutan'},
  {id:4,countryName:'Myanmar'},
  {id:5,countryName:'Thailand'},
]

// navigate to dasboard
let navigate = useNavigate()


// context use
let user= authUser()
// console.log(user);
let {condata,setcondata} = user

// onRegisterClick

let onRegisterClick = async() =>{
  // console.log(5656);

try {
  let response = await axios.post('http://localhost:4000/users',state)
setState(
  {
    email:'',
    password:'',
    fullName:'',
    dateOfBirth:'',
    country:'',
    gender:'',
    receiveNewsLetters:''
    }
)
  
if(response.status===201){
  // add data to context
  let newuser = response.data
  setcondata(
    {
      isLoggedIn:true,
      userName:newuser?.fullName,
      userId:newuser?.id,
      userData:newuser
    }
  )

// navigate to store
navigate('/store')
  // toatify login success

}else{
  // toastify login falied
}

} catch (error) {
  console.log(error);
}

}

  return (
 <div className="row">
  <div className="col-lg-6 m-auto my-3 rounded-3 border border-4 w-75">
    <h1 className="text-center p-2 border-bottom border-4 border-success my-3 ">RegisTer</h1>
{/* forms */}
{/* email */}
<div className="input-group my-2 w-75 m-auto">
<input 
type="text" 
name="email" 
value={state.email}
onChange={handleChange}
id=""
className='form-control'
placeholder='UserEmail...'
/>
</div>
{/* pass */}
<div className="input-group my-2 w-75 m-auto">
<input 
type="text" 
name="password" 
value={state.password}
onChange={handleChange}
id=""
className='form-control'
placeholder='UserPassword...'
/>
</div>
{/* fullname */}
<div className="input-group my-2 w-75 m-auto">
<input 
type="text" 
name="fullName" 
value={state.fullName}
onChange={handleChange}
id=""
className='form-control'
placeholder='UserName...'
/>
</div>
{/* dob */}
<div className="input-group my-2 w-75 m-auto border p-2 rounded-2 ">
  <label className='mt-2' htmlFor="">DateOfBirth = </label>
<input 
type="date" 
name="dateOfBirth" 
value={state.dateOfBirth}
onChange={handleChange}
id=""
className='form-control ms-2'

/>
</div>
{/* gender */}
<div className="input-group my-2 w-75 m-auto border p-2 rounded-2 ">
  <label className='mt-2' htmlFor="">Gender = </label>

  <div className="form-check  m-2">
      <input 
      className="form-check-input" 
      type="radio" 
      name="gender" 
      id="flexRadioDefault1"
      value='male'
      checked={ state.gender==='male' ? true : false}
      onChange={handleChange}
      />
      <label className="form-check-label" >
       Male
      </label>
    </div>
    <div className="form-check  m-2">
    <input 
      className="form-check-input" 
      type="radio" 
      name="gender" 
      id="flexRadioDefault1"
      value='female'
      checked={ state.gender==='female' ? true : false}
      onChange={handleChange}
      />
      <label className="form-check-label" >
       Female
      </label>
    </div>

</div>
{/* country */}
<div className="input-group p-2 rounded-2  border  w-75 m-auto  my-2">

  <label className='mt-2' htmlFor="">Country=</label>
  <select
  name="country" 
  value={state.country}
  onChange={handleChange}
  className="form-select ms-2" aria-label="Default select example">
  <option defaultValue>Open this select menu</option>
{
  country.map(ele=>{
    return <option 
    key={ele.id}
    value={ele.countryName}>
      {ele.countryName}
      </option>
  })
}

{/* 
[ <option value="1">One</option>, <option value="2">One1</option>, <option value="3">One3</option>, <option value="4">One4</option>] */}

</select>
</div>
{/* recievenewsletter */}
<div className="form-check p-2 rounded-2  border  w-75 m-auto  my-2">
  <input 
  className="form-check-input ms-5 me-4 mt-3" 
  type="checkbox" 
  name="receiveNewsLetters" 
  value={state.receiveNewsLetters}
  onChange={handleCheck}
  checked={state.receiveNewsLetters===true ? true : false}
  id="flexCheckDefault"
  />
  <label className="form-check-label fs-2" htmlFor="flexCheckDefault">
   RecieveNewsLetters
  </label>
</div>
{/* form */}
  </div>
  <button
  onClick={onRegisterClick}
  className="btn btn-info w-75 m-auto fs-4 text-light fst-italic fw-bold">Register</button>
 </div>
  )
}

export default Register