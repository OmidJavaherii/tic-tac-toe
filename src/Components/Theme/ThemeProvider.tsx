import React, { createContext, useEffect, useState, ReactNode } from "react";

export const ThemeContext = createContext<{
    theme: string;
    toggleTheme: () => void;
}>({
    theme: 'light',
    toggleTheme: () => {}
});

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");
    const [theme, setTheme] = useState(initialTheme);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const handleSystemChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem("theme")) {
                setTheme(e.matches ? "dark" : "light");
            }
        };

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", handleSystemChange);

        return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme === "dark" ? "dark-mode" : "light-mode"}>{children}</div>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
