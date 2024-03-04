"use client"

import { Heart } from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import "@/app/globals.css"

const Cour = ({auth, time, title, description, id, likes,hasliked }) => {
    const [liked, setLiked] = useState(false)
    const [like, setLike] = useState(likes)
    const heartIcon = useRef(null)
    const userLiker = localStorage.getItem("userName")
    const [goto, setGoto] = useState(false)

    const changeLike = async(state) => {
        const req = await fetch("/api/cours", {
            method:"PUT",
            body: state ? JSON.stringify({
                id:id,
                likes:1,
                userLiked:userLiker
            }) : JSON.stringify({
                id:id,
                likes:0,
                userLiked:userLiker
            })
        }).then(data => data.json())
        .then(response => {
            const likes = response.newData.likes
            setLike(likes)
            if (response.newData.userLiked?.includes(userLiker)) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        })
    }

    const load = useMemo(() => {
        setLiked(hasliked)
    }, [])

    useEffect(() => {
        if (!liked) {
            heartIcon.current.style.color = "white"
        }else {
            heartIcon.current.style.color = "red"
        }
    }, [liked])

    return (
    <div onClick={} className='ml-auto mr-auto p-2 bg-gradient-to-b from-[#4192DD] to-[#0C5D8A] w-3/4 sm:w-2/3 md:w-3/5 lg:w-4/6 h-80 rounded-xl relative border border-teal-400 m-2 hover:scale-105'>
        <div className='flex justify-between border-b border-slate-200 pt-2 pb-2 pr-2'>
            <h1 className="text-white text-xl font-semibold">{title}</h1>
            <div className='flex flex-row justify-between items-center text-white'>
                <Heart className='cursor-pointer transition ml-1 mr-1' ref={heartIcon} onClick={() => {changeLike(!liked)}}/>
                <p className='ml-1 mr-1'>{like}</p>
            </div>
        </div>
        <div className='bg-white rounded-xl mt-3 p-3 h-3/4'>
            <p>{description}</p>
        </div>
        <p className='text-slate-200'>Par {auth} Le {time}</p>
    </div>
  )
}

export default Cour