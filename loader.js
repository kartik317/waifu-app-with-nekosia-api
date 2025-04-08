import dataFetcher from './dataFetcher.js';
import addImageToPage from './script.js';   

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
        const data = await dataFetcher.fetchData();
        if (data) {
            addImageToPage(data);
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

export { loadMoreContent };