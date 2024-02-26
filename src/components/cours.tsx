"use client"

import React, { useEffect, useState } from 'react'

const Cours = () => {

    const [coursList, setCours] = useState([])
    const [page, setPage] = useState(1)

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

    return (
    <div>
        {coursList.map((cours) => (
            <p key={cours.id}>{cours.title}</p>
        ))}
    </div>
  )
}

export default Cours