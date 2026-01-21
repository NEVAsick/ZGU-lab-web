export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        const photo = data.photo_max_orig || data.photo_max || "https://vk.com/images/camera_200.png";

        const sex = data.sex === 1 ? "Женский" : data.sex === 2 ? "Мужской" : "Не указан";
        const city = data.city ? data.city.title : "Не указан";
        const bdate = data.bdate ? data.bdate : "Не указана";
        const about = data.about ? data.about : "Нет информации";

        // Формируем корректный URL профиля
        let profileUrl = '#';
        if (data.domain) {
            const d = String(data.domain).trim();
            if (/^https?:\/\//i.test(d)) profileUrl = d;
            else if (d.includes('vk.com')) profileUrl = d.startsWith('http') ? d : 'https://' + d;
            else profileUrl = `https://vk.com/${d}`;
        }

        return `
        <div class="card mb-3" style="max-width: 600px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${photo}" class="img-fluid rounded-start" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title">${data.first_name} ${data.last_name}</h4>

                        <p class="card-text"><strong>Пол:</strong> ${sex}</p>
                        <p class="card-text"><strong>Дата рождения:</strong> ${bdate}</p>
                        <p class="card-text"><strong>Город:</strong> ${city}</p>
                        <p class="card-text"><strong>О себе:</strong> ${about}</p>

                        <a href="${profileUrl}" target="_blank" class="btn btn-primary">
                            Открыть профиль VK
                        </a>

                        <button class="btn btn-danger" id="delete-${data.id}" style="margin-left:8px;">
                            Удалить пользователя
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    render(data, onDelete) {
        this.parent.innerHTML = '' // показать только этого пользователя
        this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));
        document.getElementById(`delete-${data.id}`)
            .addEventListener('click', () => onDelete(data.id))
    }
}
