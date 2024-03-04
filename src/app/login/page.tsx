import React from 'react'
import LoginForm from '@/components/loginForm'
import Header from '@/components/header'



const page = async () => {
  

  return (
    <div>
      <Header></Header>
      <div 
      style={{
        backgroundImage: "url('/Gradient.png')",
        backgroundSize: "cover",
        width: "100%",
        height: "404px",
        zIndex: "-1",
        position:"absolute",
        top:0,
        left:0
    }}
      ></div>
      <LoginForm></LoginForm>
      
    </div>
  )
}

export default page
