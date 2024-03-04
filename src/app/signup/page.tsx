import Header from '@/components/header'
import SignUpForm from '@/components/signUp'
import React from 'react'

const page = () => {
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
      <SignUpForm></SignUpForm>
      
    </div>
  )
}

export default page