"use client"

import React, { useEffect, useState } from 'react'
import Cour from './cour'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

const Cours = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const page = searchParams.get('p')

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
            <div key={i} onClick={() => {router.push(`/cours?p=${i}`)}} className='bg-black text-white text-xl p-3 rounded-lg cursor-pointer m-5 w-1/5'>
                <p>Page {i}</p>
            </div>
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
                ></Cour>
            ))}
        </div>
        
        <Button className='ml-auto' onClick={() => changePage(true)}>Précedent</Button>
        {pages}
        <Button className='ml-auto' onClick={() => changePage(false)}>Suivant</Button>

    </div>
  )
}

export default Cours