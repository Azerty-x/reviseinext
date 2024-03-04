"use client"

import React, { useEffect, useState } from 'react'
import Cour from './cour'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'
import { SkeletonCircle, SkeletonText, useDisclosure } from '@chakra-ui/react'
import {Input} from './ui/input'
import { ChevronDown, Search } from 'lucide-react'
import { Button } from './ui/button'

const Cours = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const page = searchParams.get('p')
    const username = localStorage.getItem("userName")
    const [coursList, setCours] = useState([])
    const [pageState, setPage] = useState(0)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
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
        getCours()
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
        if (state === true) {
            if (page >= pageState) {
                router.push(`/cours?p=${parseInt(page)-1}`)
            }
        }else {
            if (page < pageState) {
                router.push(`/cours?p=${parseInt(page)+1}`)
            }
        }
    }

    return (
    <div className='mt-20'>
        <div className='mr-auto ml-auto m-2 w-3/6 flex flex-row justify-between'>
            <Input placeholder='cours sur la programmation ' className='bg-[#fff] border-[#8DB5FC] rounded-full w-3/4 h-full text-[1.2em]'/>
            <Button className='bg-white text-black rounded-full border-[#8DB5FC] border hover:bg-slate-100'>Filtre <ChevronDown /></Button>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            {coursList.length  ? (
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

    </div>
  )
}

export default Cours