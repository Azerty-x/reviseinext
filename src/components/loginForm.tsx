"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from './ui/use-toast';
import { Button, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react';



export default function LoginForm() {

  const [formData, setFormData] = useState({
    "username": "",
    "password": ""
  })
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const { toast } = useToast()
  
  const router = useRouter()
  if (isLoggedIn === "true") {
    router.push("/")
  }

  
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
    <div className='w-2/5 p-5 mr-auto ml-auto shadow-[0_0_5px_1px_rgba(0,0,0,0.25)] rounded-lg bg-white mt-[8rem]'>
        <h1 className='text-center text-2xl font-bold mb-5'>Connexion</h1>
        <FormControl className='flex flex-col'>
            <FormLabel>Nom d&apos;utilisateur</FormLabel>
            <Input onChange={(e) => {setFormData({"username": e.target.value, "password": formData.password})}} value={formData.username} type='text' placeholder='Patrick256'/>
            <FormLabel>Mot de passe</FormLabel>
            <Input onChange={(e) => {setFormData({"username": formData.username, "password": e.target.value})}} value={formData.password} type='password' placeholder='********'/>
            <FormHelperText>Votre mot de passe est irrécupérable</FormHelperText>
            <FormHelperText>Pas encore de compte ? <Link className='text-[#1710e3] underline hover:decoration-2' href={"/signup"}>Inscrivez vous</Link></FormHelperText>
            <Button className='ml-auto mr-auto mt-5' colorScheme='green' onClick={handleSubmit}>Se connecter</Button>
        </FormControl>
    </div>
  )
}
