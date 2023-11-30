import { useState, useEffect } from "react";

export default function ThemeChanger() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark");
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector('html').setAttribute('data-theme', localTheme)
    }, [ colorTheme]);

    return [colorTheme, setTheme]
}