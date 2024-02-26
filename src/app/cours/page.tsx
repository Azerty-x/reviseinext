"use client"
import Cours from '@/components/cours'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Page = () => {

    const searchParams = useSearchParams()


    return (
    <div>
        <Link href={"/cours/add"}>Add cour</Link>
        <Cours></Cours>
    </div>
  )
}

export default Page