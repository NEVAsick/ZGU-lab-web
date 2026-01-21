import { CatCardComponent } from "../../components/cat-card/index.js";
import { CatPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="container my-5">
                <h1 class="text-center mb-5 display-4 text-primary">Мир кошек</h1>
                <p class="text-center lead mb-5">Выберите кошку, чтобы узнать о ней больше</p>
                <div class="row justify-content-center"></div>
            </div>
        `;
    }

   getData() {
    return [
        {
            id: 1,
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWKOldw9i-v-iW8b6nbQoCd3yTtgTMDm5fGw&s",
            title: "Сиамская кошка",
            shortText: "Грациозная и разговорчивая порода",
            badge: "Разговорчивая",
            badgeClass: "bg-info text-white"
        },
        {
            id: 2,
            src: "https://moderncat.com/wp-content/uploads/2013/09/MaineCoon_ss_1784842319_Sergey-Ginak-1024x819.jpg",
            title: "Мейн-кун",
            shortText: "Огромная и дружелюбная порода",
            badge: "Гигант",
            badgeClass: "bg-success"
        },
        {
            id: 3,
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeC3MrXT_BXs3l6ekCE0ghfaO2THHXqKOLYA&s",
            title: "Персидская кошка",
            shortText: "Роскошная длинношёрстная красавица",
            badge: "Длинношёрстная",
            badgeClass: "bg-warning text-dark"
        },
        {
            id: 4,
            src: "https://cat.mau.ru/bri/main.jpg",
            title: "Британская короткошёрстная",
            shortText: "Спокойная и плюшевая кошка",
            badge: "Плюшевая",
            badgeClass: "bg-secondary text-white"
        }
    ];
}

    clickCard(e) {
        const cardId = e.target.dataset.id;
        if (cardId) {
            const catPage = new CatPage(this.parent, cardId);
            catPage.render();
        }
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const container = this.pageRoot.querySelector('.row');
        const data = this.getData();

        data.forEach(item => {
            const card = new CatCardComponent(container);
            card.render(item, this.clickCard.bind(this));
        });
    }
}