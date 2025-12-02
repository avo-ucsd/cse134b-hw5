window.addEventListener('DOMContentLoaded', async () => { 
    // Create the element
    const card = document.createElement('project-card');

    card.data = {
        imageSrc: './images/project/project_letMeCook-600.png',
        imageAlt: 'Let Me Cook app icon',
        imageSizes: [
            { url: './images/project/project_letMeCook-350.png', width: 350 },
            { url: './images/project/project_letMeCook-600.png', width: 600 },
            { url: './images/project/project_letMeCook-900.png', width: 900 }
        ],
        title: 'Let Me Cook',
        description: 'A recipe web app to create, store, and view personal recipes. I helped lead our quarter long project for CSE 110: Software Engineering at the University of California, San Diego.',
        link: 'https://github.com/cse110-sp25-group8/final-project',
        linkText: 'View more on GitHub'
    };

    document.querySelector('.project-list').appendChild(card);
});