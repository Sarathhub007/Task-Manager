// "use client"

// import { useState,useEffect } from "react"

// type Theme="light"|"dark";

// function getInitialTheme(): Theme {
//     if (typeof window === 'undefined') return "light";
//     const saved = localStorage.getItem("theme") as Theme | null;
//     return saved || "light";
// }

// export function useTheme(){
//     const [theme, setTheme]=useState<Theme>(getInitialTheme);

//     useEffect(()=>{
//         document.documentElement.classList.toggle("dark", theme === "dark");
//     },[theme]);

//     const toggleTheme=()=>{
//         const next=theme==="light" ? "dark":"light";
//         setTheme(next);
//         localStorage.setItem("theme",next);
//     };
//     return {theme,toggleTheme};
// }