"use client"

import React, { useEffect, useState } from 'react'
import Cour from './cour'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'

const Cours = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const page = searchParams.get('p')
    const username = localStorage.getItem("userName")
    const [coursList, setCours] = useState([])
    const [pageState, setPage] = useState(0)

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
    <div>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            {coursList.map((cours) => (
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
            ))}
        </div>
        
        <Pagination className='p-5'>
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