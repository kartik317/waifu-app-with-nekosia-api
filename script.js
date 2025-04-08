import dataFetcher from './dataFetcher.js';
import { initializeTheme, toggleTheme } from './themeChanger.js';
import { loadMoreContent } from './loader.js';

const addImageToPage = (data) => {
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

document.getElementById("zerotwoButton").addEventListener("click", () => {
    window.location.href = "zerotwoTheme/zerotwo.html"
});

export default addImageToPage;