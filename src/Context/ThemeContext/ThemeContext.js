import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../../hooks/LocalStorage";

const ThemeContext = createContext()

const useTheme = () => useContext(ThemeContext)

const ThemeProvider = ({ children }) => {

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