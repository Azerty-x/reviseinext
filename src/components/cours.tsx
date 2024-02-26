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

    useEffect(() => {
        const getCours = async() => {
            const cours = await fetch(`/api/cours?p=${page}`, {
                method:"GET"
            })
            .then(data => data.json())
            .then(response => {
                setCours(response.data)
            })
        }
        getCours()
    }, [page])

    const changePage = (state:boolean) => {
        if (state === true) {
            router.push(`/cours?p=${parseInt(page)-1}`)
        }else {
            router.push(`/cours?p=${parseInt(page)+1}`)
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
                ></Cour>
            ))}
        </div>
        
        <Button className='ml-auto' onClick={() => changePage(true)}>Précedent</Button>
        <Button className='ml-auto' onClick={() => changePage(false)}>Suivant</Button>
    </div>
  )
}

export default Cours