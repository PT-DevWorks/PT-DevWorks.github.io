/* =====================================
   Index Page: Portfolio Filter Function
   ===================================== */
const filterItems = document.querySelectorAll('.portfolioFilterBar li');

filterItems.forEach(item => {
    item.addEventListener('click', () => {
        filterItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const filter = item.dataset.category.toLowerCase();

        filterProjects(filter);
    });
});
function filterProjects(filter) {
    const projectCards = document.querySelectorAll('.projectCard');

    projectCards.forEach(card => {
        const tags = card.dataset.tags;

        if (filter === "all" || tags.includes(filter)) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}



/* =============================================
   Index Page: Portfolio Content Auto Population
   ============================================= */
let projectCards = [];
const projectsContainer = document.querySelector('.portfolioShowcase');

fetch('/src/data/portfolioProjects.json')
.then(res => res.json())
.then(projects => {

    projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('projectCard');

        // Generate slug from title
        const projectSlug = project.projectTitle.toLowerCase().replace(/\s+/g, '-');

        // Add tags
        card.dataset.tags = project.projectTags.join(',').toLowerCase();

        card.innerHTML = `
            <div class="mediaBox">
                <img src="${project.previewImage}" alt="Project thumbnail" class="previewImage">
                <video class="previewVideo" muted loop playsinline>
                    <source src="${project.previewVideo}" type="video/mp4">
                </video>
            </div>
            <div class="textBox">
                <div class="defaultText">
                    <span class="projectTitle">${project.projectTitle}</span>
                    <span class="projectRole">${project.developmentRole}</span>
                </div>
                <div class="hoverText">Click to learn more</div>
            </div>
        `;

        // Make card clickable
        card.addEventListener('click', () => {
            const rect = card.getBoundingClientRect();
            const screenCenter = window.innerWidth / 2;

            let direction = "right"; // default
            if (rect.left + rect.width / 2 < screenCenter - 50) {
                direction = "left"; // card is on left side
            } else if (rect.left + rect.width / 2 > screenCenter + 50) {
                direction = "right"; // card is on right side
            } else {
                direction = Math.random() > 0.5 ? "left" : "right";
            }

            animatePageOut(direction);

            // Delay navigation until the animation finishes
            setTimeout(() => {
                const projectSlug = project.projectTitle.toLowerCase().replace(/\s+/g, '-');
                window.location.href = `/src/pages/portfolio.html#${projectSlug}`;
            }, 600); // matches slide timing
        });

        projectsContainer.appendChild(card);
    });

    projectCards = document.querySelectorAll('.projectCard');

    setupHoverVideo();
    filterProjects("all");
    enableMobileAutoplay();
});
