import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let AuthContext = createContext();

export default function AuthContextProvider({children}){

    const [UserToken , setuserToken]=useState(null)
    const [UserData , setUserData]=useState(null)



async function getUserData(){
  let {data} = await axios.get('https://route-posts.routemisr.com/users/profile-data' , {
      headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`
      }
  })
 setUserData(data.data.user)
  
}

useEffect(()=>{
    if(localStorage.getItem('token')){
    setuserToken(localStorage.getItem('token'))
    getUserData()
    }
    },[])


    return<AuthContext.Provider value={{UserToken , setuserToken ,UserData}}>

        {children}
    
    </AuthContext.Provider>

}