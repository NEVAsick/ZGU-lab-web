import { CatComponent } from "../../components/cat/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class CatPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    get pageRoot() {
        return document.getElementById('cat-page');
    }

    getHTML() {
        return `<div id="cat-page" class="container my-5"></div>`;
    }

   getData() {
    const cats = {
        1: {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWKOldw9i-v-iW8b6nbQoCd3yTtgTMDm5fGw&s",
            title: "Сиамская кошка",
            description: "Сиамские кошки — одни из самых древних пород. Они очень умны, любопытны и любят общаться с хозяином голосом.",
            fact: "Сиамские кошки меняют цвет шерсти в зависимости от температуры тела!",
            alertType: "alert-info"
        },
        2: {
            src: "https://moderncat.com/wp-content/uploads/2013/09/MaineCoon_ss_1784842319_Sergey-Ginak-1024x819.jpg",
            title: "Мейн-кун",
            description: "Самая крупная порода домашних кошек. Мейн-куны дружелюбны, игривы и отлично ладят с детьми и собаками.",
            fact: "Рекордсмен по длине — мейн-кун Стьюи, 123 см от носа до кончика хвоста!",
            alertType: "alert-success"
        },
        3: {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeC3MrXT_BXs3l6ekCE0ghfaO2THHXqKOLYA&s",
            title: "Персидская кошка",
            description: "Известна своей длинной роскошной шерстью и спокойным характером. Любит комфорт и внимание.",
            fact: "Персы требуют ежедневного расчёсывания, иначе шерсть сваляется.",
            alertType: "alert-warning"
        },
        4: {
            src: "https://cat.mau.ru/bri/main.jpg",
            title: "Британская короткошёрстная",
            description: "Плюшевая, спокойная, независимая кошка. Идеальный компаньон для тех, кто ценит тишину.",
            fact: "Британцы часто становятся героями мемов благодаря своему серьёзному выражению мордочки.",
            alertType: "alert-secondary"
        }
    };
    return cats[this.id] || { title: "Кошка не найдена", description: "Такой кошки у нас нет :(" };
}

    clickBack() {
        new MainPage(this.parent).render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const catComponent = new CatComponent(this.pageRoot);
        catComponent.render(data);
    }
}