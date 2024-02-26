"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useToast } from './ui/use-toast'
import { Loader2 } from 'lucide-react'
import Cour from './cour'

const AddCour = () => {
   
    const formattedDate = `11/02/07`;
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const [send, setSend] = useState({state:false, loading:false})
    const [cour, setCour] = useState({
        author: "",
        title:"",
        description:"",
        content:""
    })
    const {toast} = useToast()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const username = localStorage.getItem("userName")
        const title = data.get("title")
        const description = data.get("description")
        const content = data.get("content")
        setSend({state:send.state,loading:true})
        const req = await fetch("/api/cours", {
            method:"POST",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({author:username,
                title:title,
                description:description,
                content:content, 
                isLoggedIn:isLoggedIn, 
                datetime:"010"})
        })
        .then(data => data.json())
        .then(response => {
            if (response.ok === "true") {
                setSend({state:true,loading:false})
                setCour({
                    author:response.author,
                    title:response.title,
                    description:response.description,
                    content:response.content
                })
            } else {
                setSend({state:false,loading:false})
                toast({
                    title:"Une erreur est survenue",
                    description:"Reéssayer dans quelques minutes..."
                })
            }
        })
    }

    return (
    <div>
        <h1 className='text-2xl text-center mt-20'>Ajouter un cours</h1>
        {isLoggedIn ? (
            <>
                {!send.state ? (
                    <form onSubmit={handleSubmit} className='flex flex-col w-1/4 ml-auto mr-auto mt-5'>
                        <input type="text" placeholder='Titre...' className='border border-slate-700 p-2 m-2 rounded-xl' name='title' required/>
                        <input type="text" placeholder='Description...' className='border border-slate-700 p-2 m-2 rounded-xl' name='description' required/>
                        <input type="text" placeholder='Contenu...' className='border border-slate-700 p-2 m-2 rounded-xl' name='content' required/>
                        <Button className='w-2/4 ml-auto mr-auto'>
                            {!send.loading ? (
                                "Enregistrez"
                            ) : (
                                <Loader2 className='animate-spin' />
                            )}
                        </Button>
                    </form>
                ) : (
                    <div>
                        <p>Cour ajouté avec succès!</p>
                    </div>
                )}
                <Cour 
                title={cour.title} 
                description={cour.description} 
                auth={cour.author}
                time={formattedDate}
                />
            </>
        ) : (
            <p className='text-center text-2xl bg-black text-white m-20'>Merci de vous connecter <br />
            <Link className='text-slate-300 hover:text-white' href={"/login"}>Connexion</Link></p>
        )}
    </div>
  )
}

export default AddCour