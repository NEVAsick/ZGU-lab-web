export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent
    }

    render(callback) {
        this.parent.insertAdjacentHTML('beforeend', `
            <button class="btn btn-secondary mb-3" id="back-btn">Назад</button>
        `)

        document.getElementById('back-btn')
            .addEventListener('click', () => callback())
    }
}
