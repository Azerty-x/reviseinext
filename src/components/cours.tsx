"use client"

import React, { useEffect, useState } from 'react'
import Cour from './cour'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'
import { Menu, MenuButton, MenuItem, MenuList, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import {Input} from './ui/input'
import { ChevronDown } from 'lucide-react'

const Cours = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const page = searchParams.get('p')
    const [username, setUsername] = useState("")
    const [coursList, setCours] = useState([])
    const [pageState, setPage] = useState(0)
    const [category, setCategory] = useState("Filtre")
    const [onError, setError] = useState(false)

    useEffect(() => {
        setUsername(`${localStorage.getItem("userName")}`)
        const getCours = async() => {
            const cours = await fetch(`/api/cours?p=${page}`, {
                method:"GET"
            })
            .then(data => data.json())
            .then(response => {
                setCours(response.data)
                setPage(Number(response.pages))
            })
        }
        if (page < 1) {
            setError(true)
        } else {
            getCours()
        }
    }, [page])
    
    
    
    let pages = []
    for (let i = 1; i <= pageState ; i++) {
        pages.push(
            <PaginationItem key={i}>
                <PaginationLink onClick={() => {router.push(`/cours?p=${i}`)}} className='cursor-pointer'>{i}</PaginationLink>
            </PaginationItem>
        )
    }

    const changePage = (state:boolean) => {
        console.log(page, pageState);
        if (state === true) {
            if (Number(page) >= pageState && Number(page) !== 0) {
                router.push(`/cours?p=${parseInt(page)-1}`)
            }
        }else {
            if (Number(page) < pageState) {
                router.push(`/cours?p=${parseInt(page)+1}`)
            }
        }
    }

    const handleChange = async(e) => {
        setCategory("Filtre")
        const query = e.target.value
        const req = await fetch(`/api/search?q=${query}`, {method:"GET"})
        .then(data => data.json())
        .then(response => {
            if (response.data.length > 0) {
                setCours(response.data)
            } else {
                setCours(["Error"])
            }
        })
    }

    const handleCategories = async(category:any) => {
        setCategory(category)
        if (category !== "Filtre") {
            const req = await fetch(`/api/search?cat=${category}`, {method:"GET"})
            .then(data => data.json())
            .then(response => {
                if (response.data.length > 0) {
                    setCours(response.data)
                } else {
                    setCours(["Error"])
                }
            })
        } else {
            const cours = await fetch(`/api/cours?p=${page}`, {
                method:"GET"
            })
            .then(data => data.json())
            .then(response => {
                setCours(response.data)
                setPage(Number(response.pages))
            })
        }
    }

    return (
    <div className='mt-[2rem]'>
        {onError ? (
            <h1>Erreur !</h1>
        ): (
        <>
            <div className='mr-auto ml-auto mb-5 w-4/6 flex flex-row items-center justify-between'>
            <Input onChange={handleChange} placeholder='cours sur la programmation ' className='bg-[#fff] border-[#8DB5FC] rounded-full w-3/4 h-full text-[1.2em]'/>
            <Menu>
                <MenuButton className='bg-white relative text-black rounded-full border-black border hover:bg-slate-100 pt-2 pb-2 p-5 pr-[35px]'>
                    {category}
                    <ChevronDown className='absolute right-2' style={{"top": "50%", transform: "translateY(-40%)"}} />
                </MenuButton>
                <MenuList className='mb-5 w-2/6'>
                    <MenuItem onClick={() => {handleCategories("Filtre")}} className='w-full'>Filtre</MenuItem>
                    <MenuItem onClick={() => {handleCategories("Mathématique")}} className='w-full'>Mathématique</MenuItem>
                    <MenuItem onClick={() => {handleCategories("Physique-chimie")}} className='w-full'>Physique-chimie</MenuItem>
                    <MenuItem onClick={() => {handleCategories("Histoire")}} className='w-full'>Histoire</MenuItem>
                    <MenuItem onClick={() => {handleCategories("Géographie")}} className='w-full'>Géographie</MenuItem>
                    <MenuItem onClick={() => {handleCategories("Education morale et civique")}} className='w-full'>Education morale et civique</MenuItem>
                    <MenuItem onClick={() => {handleCategories("Français")}} className='w-full'>Français</MenuItem>
                    <MenuItem onClick={() => {handleCategories("Anglais")}} className='w-full'>Anglais</MenuItem>
                    <MenuItem onClick={() => {handleCategories("Allemand")}} className='w-full'>Allemand</MenuItem>
                    <MenuItem onClick={() => {handleCategories("Espagnole")}} className='w-full'>Espagnole</MenuItem>
                    <MenuItem onClick={() => {handleCategories("Informatique")}} className='w-full'>Informatique</MenuItem>
                    <MenuItem onClick={() => {handleCategories("Design")}} className='w-full'>Design</MenuItem>
                    <MenuItem onClick={() => {handleCategories("Svt")}} className='w-full'>Svt</MenuItem>
                    <MenuItem onClick={() => {handleCategories("Autres")}} className='w-full'>Autres</MenuItem>
                </MenuList>
            </Menu>
        </div>
        {coursList[0] === "Error" && (
            <h1 className='text-[2.5em] font-bold text-center'>Aucun résultat... :(</h1>
        )}
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            {coursList.length  ? (
                    coursList[0] !== "Error" && (
                        coursList.map((cours) => (
                            <Cour
                                key={cours.id}
                                auth={cours.author}
                                time={cours.createdAt}
                                title={cours.title}
                                description={cours.description}
                                id={cours.id}
                                likes={cours.likes}
                                hasliked={cours.userLiked?.includes(username) ? true : false}
                                ></Cour>
                            ))
                    )
            ): (
                <>
                <div className='ml-auto mr-auto p-2 bg-gradient-to-b from-[#4192DD] to-[#0C5D8A] w-3/4 sm:w-2/3 md:w-3/5 lg:w-4/6 h-[22rem] rounded-xl relative border border-teal-400 m-2'>
                    <div className='flex justify-between border-b border-slate-200 pt-2 pb-2 pr-2'>
                        <SkeletonText w={"80%"} mt={"14px"} noOfLines={1} spacing='4' skeletonHeight='3'></SkeletonText>
                        <div className='flex flex-row justify-between items-center text-white'>
                            <SkeletonCircle size="10"></SkeletonCircle>
                            <p className='ml-1 mr-1'>0</p>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl mt-3 p-3 h-3/4'>
                        <SkeletonText noOfLines={4} spacing='4' skeletonHeight='3'></SkeletonText>
                    </div>
                    <SkeletonText mt={2} noOfLines={1} spacing='4' skeletonHeight='2'></SkeletonText>
                </div>
                <div className='ml-auto mr-auto p-2 bg-gradient-to-b from-[#4192DD] to-[#0C5D8A] w-3/4 sm:w-2/3 md:w-3/5 lg:w-4/6 h-[22rem] rounded-xl relative border border-teal-400 m-2'>
                    <div className='flex justify-between border-b border-slate-200 pt-2 pb-2 pr-2'>
                        <SkeletonText w={"80%"} mt={"14px"} noOfLines={1} spacing='4' skeletonHeight='3'></SkeletonText>
                        <div className='flex flex-row justify-between items-center text-white'>
                            <SkeletonCircle size="10"></SkeletonCircle>
                            <p className='ml-1 mr-1'>0</p>
                        </div>
                    </div>
                    <div className='bg-white rounded-xl mt-3 p-3 h-3/4'>
                        <SkeletonText noOfLines={4} spacing='4' skeletonHeight='3'></SkeletonText>
                    </div>
                    <SkeletonText mt={2} noOfLines={1} spacing='4' skeletonHeight='2'></SkeletonText>
                </div>
                </>
            )}
        </div>
        {coursList[0] !== "Error" && (
            <Pagination className='p-1 border border-slate-800 rounded-full w-fit'>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious className='cursor-pointer' onClick={() => changePage(true)}></PaginationPrevious>
                    </PaginationItem>
                    {pages}
                    <PaginationItem>
                        <PaginationEllipsis></PaginationEllipsis>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext className='cursor-pointer' onClick={() => changePage(false)}></PaginationNext>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            )}
        </>
        )}
        

    </div>
  )
}

export default Cours