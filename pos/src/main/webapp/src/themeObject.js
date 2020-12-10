import {useState} from "react";

const themeObject = {
    palette: {
        primary: {
            main: '#26c6da',
            mainGradient: 'linear-gradient(90deg, rgba(184,138,241,1) 0%, rgba(59,100,176,1) 40%, rgba(59,105,178,1) 60%, rgba(65,216,219,1) 100%)'
        },
        secondary: {
            main: '#d274a1',
        },
        type: 'dark'
    },
};

export const useDarkMode = () => {
    const [theme, setTheme] = useState(themeObject);

    const {palette: {type}} = theme;
    const toggleDarkMode = () => {
        const updateTheme = {
            ...theme,
            palette: {
                ...theme.palette,
                type: type === 'light' ? 'dark' : 'light'
            }
        }
        setTheme(updateTheme)
    }
    return [theme, toggleDarkMode]
}

export default themeObject;
