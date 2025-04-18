//import dataFetcher from '../dataFetcher';

document.getElementById("zerotwoButton").addEventListener("click", () => {
    window.location.href = "../index.html"
});

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

const fetchZerotwoImage =  async () => {
    try {
        const res = await fetch('https://zerotwoapi.onrender.com/api/images/random/10');
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("bhdss");
        console.error(err.stack);
        return null;
    }
}


async function createZerotwoImage() {
    const data = await fetchZerotwoImage();
    const urls = data.map(item => item.url);
    urls.forEach(url => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('container');

        const image = document.createElement('img');
        image.addEventListener("click", () => {
            window.location.href = url;
        });
        image.src = url;
        image.alt = 'this is a test image';
        image.loading = 'lazy';

        imageDiv.appendChild(image);
        document.body.appendChild(imageDiv);
    });
}

let isLoading = false;
let hasMoreContent = true;

const createLoadingElements = () => {
    const initialLoading = document.createElement('div');
    initialLoading.className = 'initial-loading';
    document.body.appendChild(initialLoading);

    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    document.body.appendChild(loadingSpinner);
    return { initialLoading, loadingSpinner };
};

const { initialLoading, loadingSpinner } = createLoadingElements();

const isNearBottom = () => {
    return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500;
};

const loadMoreContent = async (isInitialLoad = false) => {
    if (isLoading || !hasMoreContent) return;
    
    isLoading = true;
    if (!isInitialLoad) {
        loadingSpinner.classList.add('visible');
    }
    
    try {
        const data = await fetchZerotwoImage();
        if (data) {
            createZerotwoImage();
        } else {
            hasMoreContent = false;
        }
    } catch (error) {
        console.error('Error loading more content:', error);
        hasMoreContent = false;
    } finally {
        isLoading = false;
        if (!isInitialLoad) {
            loadingSpinner.classList.remove('visible');
        } else {
            initialLoading.remove();
        }
    }
};

window.addEventListener('scroll', () => {
    if (isNearBottom()) {
        loadMoreContent(false);
    }
});

loadMoreContent(true);
