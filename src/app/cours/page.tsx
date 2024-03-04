"use client"
import Cours from '@/components/cours'
import Header from '@/components/header'
import ViewCour from '@/components/viewCour'
import { AnimatePresence, backIn, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {

  const searchParams = useSearchParams()
  const courId = searchParams.get("cour")
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (courId) {
      const getCourById = async() => {
        const req = await fetch(`/api/cours?id=${courId}`,
        {method:"GET"})
        .then(data => data.json())
        .then(response => {
          if (response.ok === "true") {
            setData(response.cours)
            setLoading(false)
          }
        })
      }
      getCourById()
    }
  }, [])

  return (
    <div>
      <Header></Header>
      <div
      style={{
        backgroundImage: "url('/Gradient.png')",
        backgroundSize: "cover",
        width: "100%",
        height: "337px",
        zIndex: "-1",
        position:"absolute",
        top:0,
        left:0
    }}
      ></div>
      {courId ? (
        <>
            {loading && (
                <Loader2 className='block ml-auto mr-auto mt-[5em] h-20 w-20 animate-spin text-white'/>
            )}
          {data && (
          <AnimatePresence>
            <motion.div
            initial={{y:-1000}}
            animate={{y:0}}
            exit={{y:-1000, transition:{ease:backIn}}}
            >
              <ViewCour 
            auth={data.author}
            title={data.title}
            description={data.description} 
            content={data.content}
            date={data.createdAt}
            preview={false}
            />
            </motion.div>
          </AnimatePresence>
        )}
        </>
      ) : (
        <Cours></Cours>
      )}
    </div>
  )
}

export default Page