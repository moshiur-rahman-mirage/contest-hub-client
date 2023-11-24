import { useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import ThemeChanger from "./ThemeChanger";

 
export default function Switch() {
    const [colorTheme, setTheme] = ThemeChanger();
    const [isActive, setIsActive] = useState(false);
    const [darkSide, setDarkSide] = useState(
        colorTheme === "cupcake" ? true : false
    );
 
    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
        setIsActive(current => !current);
    };
 
    return (
        <>
            <DarkModeToggle
            className="hover:font-bold hover:text-neutral-content rounded-full"
                style={{
                color: isActive ? 'black' : 'white', }}
                checked={darkSide}
                onChange={toggleDarkMode}
                size={30}
            />
        </>
    );
}