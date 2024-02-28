"use client"
import { ArrowRightSquare, CheckSquare2, ChevronDown, Heart, Undo2, XSquare } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { motion, AnimatePresence } from "framer-motion"
import "./newcour.css"
import { Editor } from '@tinymce/tinymce-react';
import { useSearchParams } from 'next/navigation'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react'

const NewCour = () => {

    const [title, setTitle] = useState("La trigonométrie en 1er spé")
    const [description, setDescription] = useState("Ce cours vous explique comment appliquer les formules de trigo...")
    const [category, setCategory] = useState("Catégorie")
    const time = new Date().toLocaleDateString()
    const auth = localStorage.getItem("userName")
    const [nextPart, setPart] = useState(0)
    const [displayEditor, setDisplayEditor] = useState(false)
    const [isFinished, setIsFinished] = useState(false)
    const divElt = useRef(null)
    const titleField = useRef(null)
    const descField = useRef(null)
    const menuField = useRef(null)
    const [content, setContent] = useState("")
    const searchParams = useSearchParams()
    const add = searchParams.get("add")

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
            x: -(divElt.current?.offsetWidth)/3 || 0,
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
        },
    }

    const handleChange = (e) => {
        console.log(e.target.getContent());
        setContent(e.target.getContent())
    }
    const cancelOperation = () => {
        setTitle("")
        setDescription("")
        setPart(0)
        setDisplayEditor(false)
        setIsFinished(false)
        setContent("")
        setCategory("Catégorie")
    }

    const addNewCour = async() => {
        
    }

    return (
    <AnimatePresence>
        <motion.div
        initial={{y:-1000}}
        animate={{y:0}}
        key={"add/cour"}
        exit={{x:1000}}
        >
            {add === "true" && (
                <div>
                <AnimatePresence>
                { !displayEditor && (
                    <motion.div
                    variants={variants}
                    initial={{y:0}}
                    exit="hideFirstPart"
                    
                    className='flex flex-row ml-auto mr-auto w-3/4 bg-white p-4 shadow-md rounded font-kanit'>
                    <div className='flex flex-col justify-center items-center w-2/4 text-left pr-1 pl-1 mr-1 border-r border-slate-200 overflow-hidden'>
        
                    <div className='grid grid-cols-3' ref={divElt}>
                        <motion.div
                            key="firstPart" 
                            initial={{x: -1000}} 
                            variants={variants}
                            animate={nextPart === 1 ? "hide" : nextPart === 0 && "show"} 
                            transition={{ease:"easeOut",duration:"0.3"}}
                            className='w-[300%] mt-auto mb-auto'
                            >
                            <h1 className='text-2xl font-serrat font-semibold mb-10'>Entrez le titre de votre magnifique cours</h1>
                            <label className='text-xl w-full text-left' htmlFor="title">Titre du cours</label>
                            <Input ref={titleField} value={title} onChange={(e) => {setTitle(e.target.value)}} className='text-[1.1em] mb-auto' type="text" name='title' placeholder='La trigonométrie en 1ère spé' required/>
                        </motion.div>
                        <motion.div
                            key="secondPart" 
                            initial={{x: 1000}} 
                            variants={variants}
                            animate={nextPart === 0 ? "return" : nextPart === 1 ? "reshow" : nextPart === 2 && "hide"} 
                            transition={{ease:"easeOut",duration:"0.3"}}
                            className='w-[300%]'
                            >
                            <h1 className='text-2xl font-serrat font-semibold'>Décrivez votre cours pour qu&apos;il soit parfait</h1>
                            <label className='text-xl w-full text-left'  htmlFor="desc">Description du cours</label>
                            <Textarea ref={descField} value={description} onChange={(e) => {setDescription(e.target.value)}} className='text-[1.1em]' cols={50} rows={5} name='desc' placeholder='Ce cours vous explique comment appliquer les formules de trigo...' required/>
                        </motion.div>
                        <motion.div
                            key="thirdPart" 
                            initial={{x: 1000}} 
                            variants={variants}
                            animate={nextPart === 2 ? {
                                x: -(divElt.current?.offsetWidth)/1.5 || 0,
                                transition : {
                                    ease: "easeOut",
                                    duration: 0.15
                                }
                            } : nextPart === 1 && "return"} 
                            transition={{ease:"easeOut",duration:"0.3"}}
                            className='w-[300%]'
                            >
                            <h1 className='text-2xl font-serrat font-semibold'>Quelle catégorie pour ton cours ?</h1>
                            <Menu>
                                <MenuButton ref={menuField}
                                    px={4}
                                    py={2}
                                    mt={5}
                                    transition='all 0.2s'
                                    borderRadius='md'
                                    borderWidth='1px'
                                    width="100%"
                                    _hover={{ bg: 'gray.400' }}
                                    _expanded={{ bg: 'gray.100' }}
                                    _focus={{ boxShadow: 'outline' }}
                                    textAlign={"left"}
                                    position={"relative"}
                                >
                                    {category} <ChevronDown className='absolute right-2 top-2' />
                                </MenuButton>
                                <MenuList className='h-[150px] overflow-auto w-[100%]'>
                                    <MenuItem onClick={() => {setCategory("Mathématique")}} className='w-full'>Mathématique</MenuItem>
                                    <MenuItem onClick={() => {setCategory("Physique-chimie")}} className='w-full'>Physique-chimie</MenuItem>
                                    <MenuItem onClick={() => {setCategory("Histoire")}} className='w-full'>Histoire</MenuItem>
                                    <MenuItem onClick={() => {setCategory("Géographie")}} className='w-full'>Géographie</MenuItem>
                                    <MenuItem onClick={() => {setCategory("Education morale et civique")}} className='w-full'>Education morale et civique</MenuItem>
                                    <MenuItem onClick={() => {setCategory("Français")}} className='w-full'>Français</MenuItem>
                                    <MenuItem onClick={() => {setCategory("Anglais")}} className='w-full'>Anglais</MenuItem>
                                    <MenuItem onClick={() => {setCategory("Allemand")}} className='w-full'>Allemand</MenuItem>
                                    <MenuItem onClick={() => {setCategory("Espagnole")}} className='w-full'>Espagnole</MenuItem>
                                    <MenuItem onClick={() => {setCategory("Informatique")}} className='w-full'>Informatique</MenuItem>
                                    <MenuItem onClick={() => {setCategory("Design")}} className='w-full'>Design</MenuItem>
                                    <MenuItem onClick={() => {setCategory("Svt")}} className='w-full'>Svt</MenuItem>
                                    <MenuItem onClick={() => {setCategory("Autres")}} className='w-full'>Autres</MenuItem>
                                </MenuList>
                            </Menu>
                        </motion.div>
                    </div>
        
                        <div className='flex flex-row justify-end items-center mt-auto w-full'>
                            <AnimatePresence>
                                {nextPart > 0 && (
                                    <motion.div
                                    initial={{x:500}}
                                    animate={{x:0}}
                                    exit={{x:-500}}
                                    >
                                        <Button variant={"destructive"} className='text-[1.1em] m-2 pl-1' onClick={() => {
                                            if(title !== "" || description !== "") {
                                                setPart(nextPart - 1)
                                            }
                                        }}><Undo2 className='mr-2 ml-2' /> Retour</Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <Button variant={"login"} className='text-[1.1em] m-2 pr-1' onClick={() => {
                                if (title !== "" && nextPart === 0) {
                                    setPart(1)
                                    titleField.current.style.border = "1px rgb(226,232,240) solid"
                                    titleField.current.classList.remove("animate-alert")
                                } else if (title === "" && nextPart === 0) {
                                    titleField.current.style.border = "1px red solid"
                                    titleField.current.classList.add("animate-alert")
                                } if (description !== "" && nextPart === 1) {
                                    setPart(2)
                                    descField.current.style.border = "1px rgb(226,232,240) solid"
                                    descField.current.classList.remove("animate-alert")
                                } else if (description === "" && nextPart === 1) {
                                    descField.current.style.border = "1px red solid"
                                    descField.current.classList.add("animate-alert")
                                } if (category !== "Catégorie" && nextPart === 2) {
                                    setDisplayEditor(true)
                                    menuField.current.style.border = "1px rgb(226,232,240) solid"
                                    menuField.current.classList.remove("animate-alert")
                                } else if (category === "Catégorie" && nextPart === 2) {
                                    menuField.current.style.border = "1px red solid"
                                    menuField.current.classList.add("animate-alert")
                                }
                            }}>Suivant <ArrowRightSquare className='mr-2 ml-2' /></Button>
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
                        <p className='text-slate-300 mt-[1px]'>Par {auth} Le {time}</p>
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
                            <h1 className='text-center text-[1.9em] m-5 text-white font-bold'>Rédaction</h1>
                            <Editor
                            apiKey='8r2pn49k7wony66g7k2v12idy0ndll9pibgvlpbaqp9zw35q'
                            onChange={handleChange}
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
                            <div className='flex flex-row justify-end'>
                                <Button onClick={cancelOperation} variant={"destructive"} className='text-[1.1em] m-2 pl-1' >
                                    <XSquare className='mr-2 ml-2' />
                                    Annulez
                                </Button>
                                <Button variant={"success"} className='text-[1.1em] m-2 pl-1' onClick={addNewCour}>
                                    <CheckSquare2 className='mr-2 ml-2' />
                                    Terminé
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div dangerouslySetInnerHTML={{__html:content}}></div>
            </div>
            )}
        </motion.div>
    </AnimatePresence>
  )
}

export default NewCour