"use client"
import React, { useState } from 'react'
import "@/app/styles/header.css"
import { ChevronDown, CircleUserRound } from 'lucide-react'
import Link from 'next/link';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [isLoggedIn, setLogged] = useState(Boolean(localStorage.getItem("isLoggedIn")))

    const logout = () => {
        localStorage.clear()
        setLogged(false)
    }

    return (
    <header className='font-kanit text-white flex justify-between items-center w-full h-[50px] bg-[#091EDE] fixed bg-opacity-20 backdrop-blur'>
        <h1 className='text-4xl ml-[50px]'>Révise</h1>
        <div className='md:flex hidden flex justify-between p-2 items-center text-2xl w-2/6'>
            <Link className='text-slate-200 hover:text-white' href={"/"}>Accueil</Link>
            <Link className='text-slate-200 hover:text-white' href={"/cours/add"}>Créez</Link>
            <Link className='text-slate-200 hover:text-white' href={"/cours?p=1"}>Parcourir</Link>
        </div>
        {isLoggedIn === true ? (
            <DropdownMenu>
                <DropdownMenuTrigger className='font-kanit text-xl w-[13%] mr-[50px] transition hover:bg-cyan-500 border border-cyan-400 pl-2 pr-2 pb-1 pt-1 rounded-lg pr-1 flex justify-between items-center'>
                    <CircleUserRound className='mr-2'></CircleUserRound>
                    <p className='mr-4 w-2/4 text-left'>{localStorage.getItem("userName")}</p>
                    <ChevronDown className='border-l border-slate-300 p-1 w-[30px] h-[30px]'></ChevronDown>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>Mes cours</DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' onClick={logout}>Déconnexion</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ) : (
            <Link className='font-kanit text-xl w-[13%] mr-[50px] p-1 text-center border border-cyan-400 transition hover:bg-cyan-500 rounded-lg' href={"/login"}>Connexion</Link>
        )}
    </header>
    
  )
}

export default Header