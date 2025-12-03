const STORAGE_KEY = 'projects';

document.addEventListener('DOMContentLoaded', () => {
    loadProjectsList();

    // Form submission
    document.getElementById('project-form').addEventListener('submit', handleSubmit);
    
    // Cancel button
    document.getElementById('cancel-btn').addEventListener('click', resetForm);
});

function handleSubmit(e) {
    e.preventDefault();

    const index = document.getElementById('project-index').value;
    const projectData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        imageSrc: document.getElementById('imageSrc').value,
        imageAlt: document.getElementById('imageAlt').value,
        link: document.getElementById('link').value,
        linkText: document.getElementById('linkText').value,
        imageSizes: [] // Empty for now since we're using simple URLs
    };

    let projects = getProjects();

    if (index === '') {
        // CREATE: Add new project
        projects.push(projectData);
    } else {
        // UPDATE: Replace existing project
        projects[parseInt(index)] = projectData;
    }

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));

    // Reset form and reload list
    resetForm();
    loadProjectsList();
}

function loadProjectsList() {
    const projects = getProjects();
    const listContainer = document.getElementById('projects-list');

    if (projects.length === 0) {
        listContainer.innerHTML = '<li style="color: var(--color-text); opacity: 0.6;">No projects yet. Create one!</li>';
        return;
    }

    listContainer.innerHTML = '';

    projects.forEach((project, index) => {
        const item = document.createElement('li');
        item.className = 'project-item';

        item.innerHTML = `
            <section class="project-item-info">
                <h4 class="project-item-title">${project.title}</h4>
                <p class="project-item-desc">${project.description.substring(0, 60)}${project.description.length > 60 ? '...' : ''}</p>
            </section>
            <footer class="project-item-actions">
                <button class="btn btn-small btn-edit" onclick="editProject(${index})">Edit</button>
                <button class="btn btn-small btn-delete" onclick="deleteProject(${index})">Delete</button>
            </footer>
        `;

        listContainer.appendChild(item);
    });
}

function editProject(index) {
    const projects = getProjects();
    const project = projects[index];

    // Populate form
    document.getElementById('project-index').value = index;
    document.getElementById('title').value = project.title;
    document.getElementById('description').value = project.description;
    document.getElementById('imageSrc').value = project.imageSrc || '';
    document.getElementById('imageAlt').value = project.imageAlt || '';
    document.getElementById('link').value = project.link || '';
    document.getElementById('linkText').value = project.linkText || 'View more on GitHub';

    // Update form title and show cancel button
    document.getElementById('form-title').textContent = 'Update Project';
    document.getElementById('cancel-btn').style.display = 'inline-block';

    // Scroll to form
    document.querySelector('.crud-form').scrollIntoView({ behavior: 'smooth' });
}

function deleteProject(index) {
    if (!confirm('Are you sure you want to delete this project?')) {
        return;
    }

    let projects = getProjects();
    projects.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    
    loadProjectsList();
}

function resetForm() {
    document.getElementById('project-form').reset();
    document.getElementById('project-index').value = '';
    document.getElementById('form-title').textContent = 'Create New Project';
    document.getElementById('cancel-btn').style.display = 'none';
}

function getProjects() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}