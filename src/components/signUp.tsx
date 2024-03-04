"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'
import Link from 'next/link'
import { Button, FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'

const SignUpForm = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const { toast } = useToast()
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const res = await fetch('/api/signup', {
            method:"POST",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }).then(data => data.json()).then(response => {
            if (response.isLoggedIn === true) {
                localStorage.setItem("userId", response.id)
                localStorage.setItem("userName", response.username)
                localStorage.setItem("isLoggedIn", response.isLoggedIn)
                router.push("/")
            } else if (response === "user already exist") {
                toast({
                    title:"Ce compte existe déjà",
                    description:"Essayez de vous connecter ou changer de pseudonyme",
                    variant:"notExist"
                })
            }
        })
    }


    return (
        <div className='w-2/5 p-5 ml-auto mr-auto shadow-[0_0_5px_1px_rgba(0,0,0,0.25)] rounded-lg bg-white mt-[8rem]'>
            <h1 className='text-center text-2xl font-bold mb-5'>Inscription</h1>
            <FormControl className='flex flex-col'>
                <FormLabel>Nom d&apos;utilisateur</FormLabel>
                <Input onChange={(e) => {setUsername(e.target.value)}} value={username} placeholder='Jackson123'/>
                <FormLabel>Mot de passe</FormLabel>
                <Input onChange={(e) => {setPassword(e.target.value)}} value={password} type='password' placeholder='********'/>
                <FormHelperText>Votre mot de passe ne pourra pas être récuperé</FormHelperText>
                <FormHelperText>Déjà un compte ? <Link className='text-[#1710e3] underline hover:decoration-2' href={"/login"}>Connectez vous</Link></FormHelperText>
                <Button onClick={handleSubmit} colorScheme='green' className='mt-2 mr-auto ml-auto'>S&apos;inscrire</Button>
            </FormControl>
    </div>
  )
}

export default SignUpForm