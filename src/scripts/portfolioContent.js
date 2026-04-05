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



/* ===========================================
   Application/Programming Language: Badge Map
   =========================================== */
const normalizeTechnology = (tech) => {
    const map = {
        "c#": "csharp",
        "c++": "cplusplus"
    };

    const lower = tech.toLowerCase();
    return map[lower] || lower.replace(/[^a-z0-9]/g, '');
};
const technologyBadgeMap  = {
    "csharp": "/src/assets/images/logos/csharp_Logo.png",
    "cplusplus": "/src/assets/images/logos/cplusplus_Logo.png",
    "html": "/src/assets/images/logos/html_Logo.png",
    "java": "/src/assets/images/logos/java_Logo.png",
    "python": "/src/assets/images/logos/python_Logo.png",
    "javaScript": "/src/assets/images/logos/javascript_Logo.png",

    "unity": "/src/assets/images/logos/unity_Logo.png",
    "unreal": "/src/assets/images/logos/unreal_Logo.png",
    "blender": "/src/assets/images/logos/blender_Logo.png"
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

        // Add badges
        const technologyBadges = project.developmentTechnologies.map(tech => {
            const icon = technologyBadgeMap[normalizeTechnology(tech)];

            return icon
                ? `<img class="techBadge" src="${icon}" alt="${tech}" title="${tech}">`
                : `<span class="techText">${tech}</span>`;
        }).join('');

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
                    <span class="projectBadges">${technologyBadges}</span>
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