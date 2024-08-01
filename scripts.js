document.addEventListener("DOMContentLoaded", function() {
    const toggler = document.querySelector('.navbar-toggler');

    toggler.addEventListener('click', function() {
        this.classList.toggle('collapsed');
    });
});

// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('projectForm');
    const projectList = document.getElementById('projectList');
  
    projectForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const title = document.getElementById('projectTitle').value;
      const description = document.getElementById('projectDescription').value;
  
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add project');
        }
  
        const newProject = await response.json();
        projectList.innerHTML += `<div>${newProject.title}: ${newProject.description}</div>`;
  
        // Clear form inputs
        document.getElementById('projectTitle').value = '';
        document.getElementById('projectDescription').value = '';
      } catch (err) {
        console.error('Error:', err);
      }
    });
  
    // Function to fetch and display projects from API
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
  
        const projects = await response.json();
        projectList.innerHTML = projects.map(project => `<div>${project.title}: ${project.description}</div>`).join('');
      } catch (err) {
        console.error('Error:', err);
      }
    }
  
    fetchProjects();
  });
  
