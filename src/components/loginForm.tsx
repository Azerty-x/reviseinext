"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from './ui/use-toast';



export default function LoginForm() {

  const [formData, setFormData] = useState({
    "username": "",
    "password": ""
  })
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const { toast } = useToast()
  
  const router = useRouter()
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    const username = formData.username
    const password = formData.password
    const res = await fetch(`/api/login?u=${username}&p=${password}&isLoggedIn=false`)
        .then(data => data.json())
        .then(response => {
            if (response.isLoggedIn === true) {
                localStorage.setItem("userId", response.id)
                localStorage.setItem("userName", response.username)
                localStorage.setItem("isLoggedIn", response.isLoggedIn)
                router.push("/")
            } else if (response === "user not exist") {
                toast({
                    title:"Erreur de connexion",
                    description:"Votre mot de passe ou nom d'utilisateur est incorrect",
                    variant:"notExist"
                })
            }
        })
  }



  return (
    <div>
        {isLoggedIn !== "true" ? (
            <form onSubmit={handleSubmit}>
                <input className='border-2 m-2' type="text" onChange={(e) => {setFormData({"username": e.target.value, "password": formData.password})}} value={formData.username}/>
                <input className='border-2 m-2' type="password" onChange={(e) => {setFormData({"username": formData.username, "password": e.target.value})}} value={formData.password}/>
                <input className='cursor-pointer border-2 p-2 pl-5 pr-5 rounded hover:bg-[#234592] transition' type="submit" value="Sub" />
            </form>
        ) : (router.push("/"))}

        <Link href={"/signup"}>Inscription</Link>
    </div>
  )
}
