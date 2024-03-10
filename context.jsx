import { createContext, useContext, useState } from "react";


let UserAuth = createContext()



export let UserProvider =({children}) =>{

    let [condata,setcondata] = useState({
        isLoggedIn:false,
        userName:null,
        userId:null,
        userData:null
    })
    
// console.log('context says ',condata);

    let logout =() =>{
        setcondata(
            {   isLoggedIn:false,
                userName:null,
                userId:null,
                userData:null     }
        )
    }

    return <UserAuth.Provider value={{condata,setcondata,logout}}>
{children}
    </UserAuth.Provider>
}


// use context
export let authUser= () => useContext( UserAuth )
