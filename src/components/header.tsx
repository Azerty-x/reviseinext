"use client"
import React, { useEffect, useState } from 'react'
import "@/styles/header.css"
import Link from 'next/link';
import { Button } from './ui/button';

const Header = () => {
    const [isLoggedIn, setLog] = useState(false)
    const [btnValue, setValue] = useState("Créez")

    useEffect(() => {
        setLog(Boolean(localStorage.getItem("isLoggedIn")))
    }, [])

    const checkIfLogged = () => {
        setValue("Connecté vous d'abord!")
    }

    return (
    <header className='font-kanit text-white flex justify-between items-center w-full h-[50px] bg-[#091EDE] fixed top-0 z-20 bg-opacity-20 backdrop-blur'>
        <h1 className='text-4xl ml-[50px]'>Révise</h1>
        <div className='md:flex hidden flex justify-between p-2 items-center text-2xl w-2/6'>
            <Link className='text-slate-200 hover:text-white' href={"/"}>Accueil</Link>
            <Link className='text-slate-200 hover:text-white' href={isLoggedIn ? "/?add=true" : "#"} onClick={!isLoggedIn ? checkIfLogged : undefined}>{btnValue}</Link>
            <Link className='text-slate-200 hover:text-white' href={"/cours?p=1"}>Parcourir</Link>
        </div>
        {isLoggedIn === true ? (
            <Button className='mr-5' variant={"login"}>
                <Link className='text-xl' href={"#"}>Profil</Link>
            </Button>
        ) : (
            <Link className='font-kanit text-xl w-[13%] mr-[50px] p-1 text-center border border-cyan-400 transition hover:bg-cyan-500 rounded-lg' href={"/login"}>Connexion</Link>
        )}
    </header>
    
  )
}

export default Header