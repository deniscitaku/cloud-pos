import {useState} from "react";

const themeObject = {
    palette: {
        primary: {
            main: '#42a5f5',
        },
        secondary: {
            main: '#ff80ab',
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
