"use client"
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      {isLoggedIn !== false ? (
        <div>
          <p>Salut {username} !</p>
          <button onClick={logout}>Déconnexion</button>
        </div>
      ) : (
        <div>
          <Link className="m-2" href={"/login"}>Connexion</Link>
          <Link className="m-2" href={"/signup"}>Inscription</Link>
        </div>
      )}
    </main>
  );
}
