"use client"
import React, { useState } from 'react'
import { useToast } from './ui/use-toast'

const SendView = ({auth, title, description, content}) => {
    
    const [isSend, setSend] useState({send:false, loading:false})
    const { toast } = useToast()


    const sendCour = async() => {
        setSend({send:isSend.send, loading:true})
        const req = await fetch("/api/cours", {
            method:"POST",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({author:auth,
                title:title,
                description:description,
                content:content, 
                isLoggedIn:localStorage.getItem("isLoggedIn"), 
                datetime:"010"})
        })
        .then(data => data.json())
        .then(response => {
            if (response.ok === "true") {
                setSend({send:true,loading:false})
            } else {
                setSend({send:false,loading:false})
                toast({
                    title:"Une erreur est survenue",
                    description:"Reéssayer dans quelques minutes..."
                })
            }
        })
    }

    return (
    <div>



    </div>
  )
}

export default SendView