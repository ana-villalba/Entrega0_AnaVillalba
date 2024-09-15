document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function () {
        const searchText = searchInput.value.toLowerCase();

        // (Código index)
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.card-text').textContent.toLowerCase();

            if (title.includes(searchText) || description.includes(searchText)) {
                card.style.display = 'block'; // mostrar si coincide con la búsqueda
            } else {
                card.style.display = 'none'; // ocultar si no coincide
            }
        });

        // (Código products)
        const productItems = document.querySelectorAll('#products-container .row .col-md-4');
        productItems.forEach(product => {
            const title = product.querySelector('p .mb-1').textContent.toLowerCase(); // título 
            const description = product.querySelector('p').textContent.toLowerCase(); // descripción

            if (title.includes(searchText) || description.includes(searchText)) {
                product.style.display = 'block'; // mostrar si coincide con la búsqueda
            } else {
                product.style.display = 'none'; // ocultar si no coincide
            }
        });


        // (Código categories)
        const categories = document.querySelectorAll('#cat-list-container .list-group');
        categories.forEach(category => {
            const title = category.querySelector('h4').textContent.toLowerCase(); // título 
            const description = category.querySelector('p').textContent.toLowerCase(); // descripción 

            if (title.includes(searchText) || description.includes(searchText)) {
                category.style.display = 'block'; // mostrar si coincide con la búsqueda
            } else {
                category.style.display = 'none'; // ocultar si no coincide
            }
        });
    });
});