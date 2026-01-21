export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {

    const photo = data.photo_max_orig || data.photo_max || 'https://vk.com/images/camera_200.png'

    return `
        <div class="card" style="width: 250px; margin: 10px; position:relative;">
            <img src="${photo}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                <button class="btn btn-primary" id="card-${data.id}" data-id="${data.id}">
                    Подробнее
                </button>
                <button class="btn btn-sm btn-danger" id="del-${data.id}" style="margin-left:8px;">
                    Удалить
                </button>
            </div>
        </div>
    `
}


    render(data, onClick, onDelete) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data))
        document
            .getElementById(`card-${data.id}`)
            .addEventListener('click', () => onClick(data.id))

        document
            .getElementById(`del-${data.id}`)
            .addEventListener('click', () => onDelete && onDelete(data.id))
    }
}
