"use client"
import Header from "@/components/header";
import NewCour from "@/components/newCour";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [isLoggedIn, setLogged] = useState(Boolean(localStorage.getItem("isLoggedIn")))
  const username = localStorage.getItem("userName")

  const logout = () => {
    localStorage.clear()
    setLogged(false)
  }

  return (
    <main >
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
      <div className="m-5 mt-[80px] lg:m-20">
        <NewCour></NewCour>
      </div>
    </main>
  );
}
