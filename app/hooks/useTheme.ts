"use client"

import { useState,useEffect } from "react"

type Theme="light"|"dark";

export function useTheme(){
    const [theme, setTheme]=useState<Theme>("light");

    useEffect(()=>{
        const saved=localStorage.getItem("theme") as Theme |null;
        if(saved){
            setTheme(saved);
            document.documentElement.classList.toggle("dark",saved==="dark");
        }
    },[]);

    const toggleTheme=()=>{
        const next=theme==="light" ? "dark":"light";
        setTheme(next);
        localStorage.setItem("theme",next);
        document.documentElement.classList.toggle("dark",next==="dark");
    };
    return {theme,toggleTheme};
}