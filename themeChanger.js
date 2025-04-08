import { loadMoreContent } from './loader.js';

const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
};

const toggleTheme = () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

initializeTheme();

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

export { initializeTheme, toggleTheme };