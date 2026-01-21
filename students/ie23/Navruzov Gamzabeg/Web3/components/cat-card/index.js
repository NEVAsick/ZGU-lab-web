export class CatCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm position-relative">
                    ${data.badge ? `<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill ${data.badgeClass}">${data.badge}</span>` : ''}
                    <img src="${data.src}" class="card-img-top" alt="${data.title}" style="height: 220px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-center">${data.title}</h5>
                        <p class="card-text text-center flex-grow-1">${data.shortText}</p>
                        <button class="btn btn-outline-primary mt-auto mx-auto" data-id="${data.id}">Подробнее</button>
                    </div>
                </div>
            </div>
        `;
    }

    render(data, listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        const button = this.parent.lastElementChild.querySelector('button');
        button.addEventListener('click', listener);
    }
}