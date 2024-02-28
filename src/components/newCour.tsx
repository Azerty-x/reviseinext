"use client"
import { Heart } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { motion, AnimatePresence } from "framer-motion"
import "./newcour.css"
import { Editor } from '@tinymce/tinymce-react';

const NewCour = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const time = new Date().toLocaleDateString()
    const auth = localStorage.getItem("userName")
    const [nextPart, setPart] = useState(false)
    const [displayEditor, setDisplayEditor] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const divElt = useRef(null)
    const titleField = useRef(null)
    const descField = useRef(null)

    const variants = {
        show: {
            opacity: 1,
            x: 0,
            transition: {
              ease: 'easeOut',
              duration: 0.3
            }
        },
        hide: {
            opacity: 1,
            x: -1000,
            transition: {
              ease: 'easeOut',
              duration: 0.15
            }
        },
        return : {
            x: 1000,
            transition : {
                ease: "easeOut",
                duration: 0.15
            }
        },
        reshow : {
            x: -(divElt.current?.offsetWidth)/2 || 0,
            transition : {
                ease: "easeOut",
                duration: 0.15
            }
        },
        hideFirstPart : {
            y:-1000,
            transition : {
                ease: "backInOut",
                duration : 0.3
            }
        }
    }

    return (
    <div>
        <AnimatePresence>
        { !displayEditor && (
            <motion.div
            variants={variants}
            initial={{y:0}}
            exit="hideFirstPart"
            
            className='flex flex-row ml-auto mr-auto w-3/4 bg-white p-4 shadow-md rounded font-kanit'>
            <div className='flex flex-col justify-center items-center w-2/4 text-left pr-1 pl-1 mr-1 border-r border-slate-200 overflow-hidden'>

            <div className='grid grid-cols-2' ref={divElt}>
                <motion.div
                    key="modal" 
                    initial={{x: -1000}} 
                    variants={variants}
                    animate={nextPart ? "hide" : "show"} 
                    transition={{ease:"easeOut",duration:"0.3"}}
                    className='w-[200%] mt-auto mb-auto'
                    >
                    <h1 className='text-2xl font-serrat font-semibold mb-10'>Entrez le titre de votre magnifique cours</h1>
                    <label className='text-xl w-full text-left' htmlFor="title">Titre du cours</label>
                    <Input ref={titleField} value={title} onChange={(e) => {setTitle(e.target.value)}} className='text-[1.1em] mb-auto' type="text" name='title' placeholder='La trigonométrie en 1ère spé' required/>
                </motion.div>
                <motion.div
                    key="t" 
                    initial={{x: 1000}} 
                    variants={variants}
                    animate={!nextPart ? "return" : "reshow"} 
                    transition={{ease:"easeOut",duration:"0.3"}}
                    className='w-[200%]'
                    >
                    <h1 className='text-2xl font-serrat font-semibold'>Décrivez votre cours pour qu&apos;il soit parfait</h1>
                    <label className='text-xl w-full text-left'  htmlFor="desc">Description du cours</label>
                    <Textarea ref={descField} value={description} onChange={(e) => {setDescription(e.target.value)}} className='text-[1.1em]' cols={50} rows={5} name='desc' placeholder='Ce cours vous explique comment appliquer les formules de trigo...' required/>
                </motion.div>
            </div>

                <div className='inline mt-auto'>
                    <Button variant={"destructive"} className='text-[1.1em] m-2' onClick={() => {
                        if(title !== "" || description !== "") {
                            setPart(false)
                        }
                    }}>Retour</Button>
                    <Button variant={"login"} className='text-[1.1em]' onClick={() => {
                        if(title !== "") {
                            setPart(true)
                            titleField.current.style.border = "1px rgb(226, 232, 240) solid"
                            titleField.current.classList.remove("animate-alert")
                        } else if (title === "") {
                            titleField.current.style.border = "1px red solid"
                            titleField.current.classList.add("animate-alert")
                        }
                        if (title !== "" && nextPart && description !== "") {
                            setDisplayEditor(true)
                            descField.current.style.border = "1px rgb(226, 232, 240) solid"
                            descField.current.classList.remove("animate-alert")
                        } else if (title !== "" && nextPart && description === "") {
                            descField.current.style.border = "1px red solid"
                            descField.current.classList.add("animate-alert")
                        }
                    }}>Suivant</Button>
                </div>
            </div>
            
            <div className='ml-auto mr-auto p-2 bg-gradient-to-b from-[#4192DD] to-[#0C5D8A] w-3/4 sm:w-2/3 md:w-3/5 lg:w-2/4 h-80 rounded-xl relative border border-teal-400 m-2 '>
                <div className='flex justify-between border-b border-slate-200 pt-2 pb-2 pr-2'>
                    <h1 className="text-white text-xl font-normal">{title}</h1>
                    <div className='flex flex-row justify-between items-center text-white'>
                        <Heart className='cursor-pointer transition ml-1 mr-1'/>
                        <p className='ml-1 mr-1'>0</p>
                    </div>
                </div>
                <div className='bg-white rounded-xl mt-3 p-3 h-3/4'>
                    <p>{description}</p>
                </div>
                <p className='text-slate-300 mt-1'>Par {auth} Le {time}</p>
            </div>
        </motion.div>
        )}
        </AnimatePresence>

        <AnimatePresence>
            {!isFinished && displayEditor && (
                <motion.div
                initial={{y:2000}}
                animate={{y:0}}
                exit={{x:1000}}
                className='w-3/4 ml-auto mr-auto'
                >
                    <Editor
                    apiKey='8r2pn49k7wony66g7k2v12idy0ndll9pibgvlpbaqp9zw35q'
                    init={{
                        height: 700,
                        menubar: false,
                        plugins: [
                          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                          'bold italic forecolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | code' +
                          'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                      }}
                    initialValue="Le cour de l'admin : comment faire un magnifique cour ?"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}

export default NewCour