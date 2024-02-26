"use client"

import { Heart } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import "@/app/globals.css"

const Cour = (props: any) => {
    

    const [liked, setLiked] = useState(false)
    const heartIcon = useRef(null)

    useEffect(() => {
        if (liked === false) {
            heartIcon.current.style.color = "black"
        }else {
            heartIcon.current.style.color = "red"
        }
    }, [liked])

    return (
    
    <div className='p-2 bg-gradient-to-t from-cyan-600 to-blue-500 w-2/6 h-80 rounded-xl relative border border-teal-400'>
        <div className='flex justify-between border-b border-slate-600 pt-2 pb-2 pr-2'>
            <h1 className="text-white text-xl font-semibold">{props.title}</h1>
            <Heart className='cursor-pointer transition' ref={heartIcon} onClick={() => {setLiked(!liked)}}/>
        </div>
        <div className='bg-white rounded-xl mt-3 p-3 h-3/4'>
            <p>{props.description}</p>
        </div>
        <p className='text-white'>Par {props.auth} Le {props.time}</p>
    </div>
  )
}

export default Cour