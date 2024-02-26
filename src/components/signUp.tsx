"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'

const SignUpForm = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const router = useRouter()
    const { toast } = useToast()
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        const username = form.get("username")
        const password = form.get("password")
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
    <div>
        {isLoggedIn !== "true" ? (
            <div>
                <form onSubmit={handleSubmit}>
                    <input className='border-2' type="text" name='username' required/>
                    <input className='border-2' type="password" name='password' required/>
                    <Button variant={"link"}>S&apos;inscrire</Button>
                </form>
            </div>
        ) : (router.push("/"))}
    </div>
  )
}

export default SignUpForm