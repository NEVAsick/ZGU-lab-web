export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <button id="back-button" class="btn btn-outline-primary mb-4">
                ← Назад к списку
            </button>
        `;
    }

    addListener(listener) {
        document.getElementById('back-button').addEventListener('click', listener);
    }

    render(listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.addListener(listener);
    }
}