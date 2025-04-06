const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
};

const toggleTheme = () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

const createLoadingElements = () => {
    const initialLoading = document.createElement('div');
    initialLoading.className = 'initial-loading';
    document.body.appendChild(initialLoading);

    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    document.body.appendChild(loadingSpinner);
    return { initialLoading, loadingSpinner };
};

const fetchData = async () => {
    try {
        const res = await fetch('https://api.nekosia.cat/api/v1/images/nothing?count=10&additionalTags=white-hair,blue-hair,long-hair,blonde,blue-eyes,purple-eyes&blacklistedTags=short-hair,sad,maid');
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err.stack);
        return null;
    }
};

const createImageElement = (data) => {
    if (!data || !data.images) return;
    
    data.images.forEach(imageData => {
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('container');

        const image = document.createElement('img');
        image.src = imageData.image.compressed.url;
        image.alt = 'this is a test image';
        image.loading = 'lazy';
        image.addEventListener('click', () => {
            window.location.href = imageData.image.compressed.url;
        });


        const p = document.createElement('p');
        p.textContent = `Artist: ${imageData.attribution.artist.username}\nProfile: ${imageData.attribution.artist.profile}\n${imageData.attribution.copyright} `;

        imageDiv.appendChild(image);
        imageDiv.appendChild(p);
        document.body.appendChild(imageDiv);
    });
};

let isLoading = false;
let hasMoreContent = true;
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
        const data = await fetchData();
        if (data) {
            createImageElement(data);
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

initializeTheme();

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
window.addEventListener('scroll', () => {
    if (isNearBottom()) {
        loadMoreContent(false);
    }
});

loadMoreContent(true);