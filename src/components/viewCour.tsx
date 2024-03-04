"use client"

import React from 'react'

const ViewCour = ({auth, title, description, content, date, preview}) => {
  return (
    <div className='mt-20 ml-auto mr-auto w-full h-full lg:w-3/4'>
        <div className='flex flex-col justify-between h-full bg-white border border-salte-200 p-5'>
            <div className='flex flex-col border-b border-slate-500'>
                <div className='inline'>
                    <p className='text-xl'>Par <span className='font-bold'>{auth}</span></p>
                    <h1 className='text-[1.9em] text-center font-bold'>{title}</h1>
                </div>
                <p className='m-2 font-semibold'>{description}</p>
            </div>
            <div className='m-5'>
                <div dangerouslySetInnerHTML={{__html:content}}></div>
            </div>
            <p className='text-slate-800 w-full text-right border-t border-slate-500 '>Le {date}</p>
        </div>
    </div>
  )
}

export default ViewCour