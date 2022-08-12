import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../../hooks/LocalStorage";
import { ThemeType } from "../../types/Theme.type";

const InitialTheme = { 
    Theme: "dark",
    setDarkMode: () => null, 
    setLightMode: () => null
   }

const ThemeContext = createContext<ThemeType>(InitialTheme)

const useTheme = () => useContext(ThemeContext)

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

    const [Theme, setTheme] = useLocalStorage('theme', 'dark');

    useEffect(()=>{
        document.body.setAttribute("data-theme", Theme)
    }, [Theme])

    const setDarkMode = () => setTheme('dark')

    const setLightMode = () => setTheme('light')


    return <ThemeContext.Provider value={{ Theme, setDarkMode, setLightMode}}>
        {children}
    </ThemeContext.Provider>
}

export { useTheme, ThemeProvider }