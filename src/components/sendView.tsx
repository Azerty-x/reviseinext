"use client"
import React, { useEffect, useState } from 'react'
import { useToast } from './ui/use-toast'
import { Button } from './ui/button'
import { Check, Loader2Icon } from 'lucide-react'

const SendView = ({auth, title, description, content, category, date}) => {
    
    const [isSend, setSend] = useState({send:false, loading:false})
    const [data, setData] = useState(null)
    const [isLoggedIn, setLog] = useState("false")
    const { toast } = useToast()

    useEffect(() => {
        setLog(`${localStorage.getItem("isLoggedIn")}`)
    }, [])

    const sendCour = async() => {
        setSend({send:isSend.send, loading:true})
        const req = await fetch("/api/cours", {
            method:"POST",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({author:auth,
                title:title,
                description:description,
                content:content, 
                isLoggedIn:isLoggedIn, 
                datetime:"010",
                category:category
            })
        })
        .then(data => data.json())
        .then(response => {
            if (response.ok === "true") {
                setSend({send:true,loading:false})
                setData(response.createdElement)
            } else {
                setSend({send:false,loading:false})
                setData("error")
                toast({
                    title:"Une erreur est survenue",
                    description:"Réessayer dans quelques minutes..."
                })
            }
        })
    }

    return (
    <div className='ml-auto mr-auto w-full h-full lg:w-3/4'>
        <h1 className='text-center text-[2em] text-white font-bold'>Preview</h1>
        <div className='flex flex-col justify-between h-full bg-white border border-salte-200 p-5'>
            <div className='flex flex-col border-b border-slate-500'>
                <div className='inline'>
                    <p className='text-xl'>Par <span className='font-bold'>{auth}</span></p>
                    <h1 className='text-[1.9em] text-center font-bold'>{title}</h1>
                </div>
                <p className='m-2 font-semibold'>{description}</p>
            </div>
            <div className='m-5'>
                <div dangerouslySetInnerHTML={{__html:content}}></div>
            </div>
            <p className='text-slate-800 w-full text-right border-t border-slate-500 '>Le {date}</p>
        </div>
        {!data && (
            <Button disabled={isSend.loading} variant={"success"} onClick={sendCour}
            className='font-semibold text-xl ml-auto mt-2 mr-2 block py-0 pr-1'
            >{isSend.loading ? (<Loader2Icon className='animate-spin'/>) : (
                <span className='flex flex-row justify-between items-center'>
                    Terminé
                    <Check className='mr-1 ml-1'/>
                </span>
            )}</Button>
        )}
    </div>
  )
}

export default SendView