"use client"
import Header from "@/components/header";
import NewCour from "@/components/newCour";
import { Heart } from "lucide-react";

export default function Home() {


  const logout = () => {
    localStorage.clear()
  }

  return (
    <main >
      <Header></Header>
      <div 
      style={{
        backgroundImage: "url('/Gradient.png')",
        backgroundSize: "cover",
        width: "100%",
        height: "404px",
        zIndex: "-1",
        position:"absolute",
        top:0,
        left:0
    }}
      ></div>
      <div className="mt-[3em] w-full flex max-sm:flex-col lg:flex-row justify-between text-white font-serrat">
        <div className="max-sm:w-full w-2/4 p-5">
          <h1 className="leading-[1.1em] max-sm:text-[1.5em] text-[3.5vw] font-bold">Bibliothèque de savoir<br /><span className="text-[#E82424]">Révise</span> tes matières importantes</h1> 
          <p className="font-normal text-xl mt-2">Visite nos cours, quizz, flash cards et autre fonctionnalités sans aucun frais</p>
        </div>
        <div className="max-sm:w-full w-2/4">
          <div className='ml-auto mr-auto p-2 bg-gradient-to-b from-[#4192DD] to-[#0C5D8A] w-3/4 sm:w-2/3 md:w-3/5 lg:w-4/6 h-80 max-sm:h-[25rem] rounded-xl relative border border-teal-400 m-2'>
            <div className='flex justify-between border-b border-slate-200 pt-2 pb-2 pr-2'>
                <h1 className="text-white text-[1.5vw] font-semibold font-flow max-sm:text-[1.2em]">Lis la description pour le secret</h1>
                <div className='flex flex-row justify-between items-center text-white'>
                    <Heart className='cursor-pointer transition ml-1 mr-1'/>
                    <p className='ml-1 mr-1'>0</p>
                </div>
            </div>
            <div className='bg-white rounded-xl mt-3 p-3 h-3/4'>
                <p className="font-flow text-black">Si tu trouve ce secret, met a l&apos;inscription dans ton pseudo [#] avec le code hex d&apos;une couleur pour avoir un pseudo stylisé</p>
            </div>
            <p className='text-slate-200 font-flow'>Par Admin Le 02/03/24</p>
          </div>
        </div>
      </div>
      <div className="m-5 mt-[80px] lg:m-20">
        <NewCour></NewCour>
      </div>
    </main>
  );
}
