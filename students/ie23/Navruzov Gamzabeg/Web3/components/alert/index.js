export class AlertComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(text) {
        const html = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                ${text}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        this.parent.insertAdjacentHTML("afterbegin", html);
    }
}
