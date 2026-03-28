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
