"use client"

import { Heart } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import "@/app/globals.css"

const Cour = ({auth, time, title, description, id}) => {
    const [liked, setLiked] = useState(false)
    const heartIcon = useRef(null)

    useEffect(() => {
        if (liked === false) {
            heartIcon.current.style.color = "white"
            const changeLike = async() => {
                const req = await fetch("/api/cours", {
                    method:"PUT",
                    body:{
                        id:id
                    }
                })
            }
        }else {
            heartIcon.current.style.color = "red"
        }
    }, [liked])

    return (
    
    <div className='ml-auto mr-auto p-2 bg-gradient-to-t from-cyan-600 to-blue-500 w-3/4 sm:w-2/3 md:w-3/5 lg:w-4/6 h-80 rounded-xl relative border border-teal-400 m-2'>
        <div className='flex justify-between border-b border-slate-200 pt-2 pb-2 pr-2'>
            <h1 className="text-white text-xl font-semibold">{title}</h1>
            <Heart className='cursor-pointer transition' ref={heartIcon} onClick={() => {setLiked(!liked)}}/>
        </div>
        <div className='bg-white rounded-xl mt-3 p-3 h-3/4'>
            <p>{description}</p>
        </div>
        <p className='text-slate-200'>Par {auth} Le {time}</p>
    </div>
  )
}

export default Cour