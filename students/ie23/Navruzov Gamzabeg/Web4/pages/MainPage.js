import {ajax} from "../modules/ajax.js";
import {urls} from "../modules/urls.js";
import {groupId} from "../modules/consts.js";
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
    ajax.post(urls.getMembers(groupId, this.sort), (data) => {

        console.log(data.response.items[0])  

        this.renderList(data.response.items)
    })
}



    renderList(items) {
        const list = document.getElementById('list')
        list.innerHTML = ''

        items.forEach(item => {
            const card = new ProductCardComponent(list)
            card.render(item, (id) => this.changePage('user', id))
        })
    }

    render() {
        this.parent.innerHTML = this.getHTML()

        new SortComponent(document.getElementById('filters'))
            .render((sort) => {
                this.sort = sort
                this.getData()
            })

        this.getData()
    }
}
