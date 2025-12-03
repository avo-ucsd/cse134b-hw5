const key = 'projects';

window.addEventListener('DOMContentLoaded', async () => { 
    fillStorage();

    const loadLocalBtn = document.querySelector('#hw5-data-loading > button');
    const loadRemoteBtn = document.querySelector('#hw5-data-loading > button:nth-child(2)');

    loadLocalBtn.addEventListener('click', loadLocal);
});

function fillStorage() {
    const projectData1 = {
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

    const projectData2 = {
        imageSrc: './images/project/project_discordBot-600.png',
        imageAlt: 'Discord bot icon',
        imageSizes: [
            { url: './images/project/project_discordBot-300.png', width: 300 },
            { url: './images/project/project_discordBot-600.png', width: 600 },
            { url: './images/project/project_discordBot-900.png', width: 900 }
        ],
        title: 'Community Discord Bot',
        description: 'A custom community bot to handle fun participation events and hidden mini-games for a Discord serever. My contributions primarily were grammatical and bug fixes.',
        link: '',
        linkText: 'Sorry, the bot owner has the repository private.'
    };

    const myProjects = [projectData1, projectData2];

    localStorage.setItem(key, JSON.stringify(myProjects));
}

function loadLocal() {
    const storageData = localStorage.getItem(key);
    const projects = JSON.parse(storageData);

    for (const projectData of projects) {
        const card = document.createElement('project-card');
        card.data = projectData;
        document.querySelector('.project-list').appendChild(card);
    }
}