import {ajax} from "../modules/ajax.js";
import {urls} from "../modules/urls.js";
import {ProductCardComponent} from "../components/ProductCardComponent.js";
import {SortComponent} from "../components/SortComponent.js";

export class MainPage {
    constructor(parent, changePage) {
        this.parent = parent
        this.changePage = changePage
        this.sort = ''
    }

    getHTML() {
        return `
            <h2>Участники группы</h2>
            <div id="filters"></div>
            <div id="list" style="display:flex; flex-wrap:wrap;"></div>
        `
    }

    getData() {
        ajax.get(urls.getMembers(this.sort), (data) => {
           
            this.renderList(data.items || [])
        })
    }

    renderList(items) {
        const list = document.getElementById('list')
        list.innerHTML = ''

        items.forEach(item => {
            const card = new ProductCardComponent(list)
            card.render(
                item,
                (id) => this.changePage('user', id), // открыть
                (id) => { // удалить и обновить список
                    ajax.delete(urls.deleteUser(id), () => this.getData())
                }
            )
        })
    }

    render() {
        this.parent.innerHTML = this.getHTML()

        new SortComponent(document.getElementById('filters'))
            .render((sort) => {
                this.sort = sort
                this.getData()
            })

        // Добавить простую форму добавления в filters
        document.getElementById('filters').insertAdjacentHTML('beforeend', `
            <form id="add-form" class="mb-3" style="max-width:420px;">
                <div class="row g-2">
                    <div class="col"><input id="first_name" class="form-control" placeholder="Имя" required></div>
                    <div class="col"><input id="last_name" class="form-control" placeholder="Фамилия" required></div>
                </div>
                <div class="row g-2 mt-2">
                    <div class="col"><input id="city" class="form-control" placeholder="Город"></div>
                    <div class="col"><input id="bdate" class="form-control" placeholder="Дата рождения"></div>
                </div>
                <div class="mt-2">
                    <input id="about" class="form-control" placeholder="О себе">
                </div>
                <div class="mt-2">
                    <input id="domain" class="form-control" placeholder="Ссылка или имя профиля (например vk.com/username или username)">
                </div>
                <div class="mt-2">
                    <button class="btn btn-success" type="submit">Добавить пользователя</button>
                </div>
            </form>
        `)

        document.getElementById('add-form').addEventListener('submit', (e) => {
            e.preventDefault()
            const user = {
                first_name: document.getElementById('first_name').value.trim(),
                last_name: document.getElementById('last_name').value.trim(),
                city: { title: document.getElementById('city').value.trim() || undefined },
                bdate: document.getElementById('bdate').value.trim() || undefined,
                about: document.getElementById('about').value.trim() || undefined,
                domain: document.getElementById('domain').value.trim() || '',
                sex: 0
            }
            ajax.post(urls.createUser(), user, () => {
                this.getData()
                document.getElementById('add-form').reset()
            })
        })

        this.getData()
    }
}
