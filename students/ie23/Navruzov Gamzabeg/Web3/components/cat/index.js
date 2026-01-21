export class CatComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="text-center">
                <img src="${data.src}" class="img-fluid rounded mb-4" alt="${data.title}" style="max-height: 400px;">
                <h2 class="mb-4">${data.title}</h2>
                <p class="lead mb-5">${data.description}</p>

                <!-- Обязательный компонент: Bootstrap Alert -->
                <div class="alert ${data.alertType} alert-dismissible fade show w-75 mx-auto" role="alert">
                    <strong>Интересный факт!</strong> ${data.fact}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Закрыть"></button>
                </div>
            </div>
        `;
    }

    render(data) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    }
}