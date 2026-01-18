import {ajax} from "../modules/ajax.js";
import {urls} from "../modules/urls.js";
import {ProductComponent} from "../components/ProductComponent.js";
import {BackButtonComponent} from "../components/BackButtonComponent.js";

export class UserPage {
    constructor(parent, id, goBack) {
        this.parent = parent
        this.id = id
        this.goBack = goBack
    }

    getHTML() {
        return `
            <h2>Страница пользователя</h2>
            <div id="back"></div>
            <div id="user"></div>
        `
    }

    getData() {
        ajax.post(urls.getUser(this.id), (data) => {
            const user = data.response[0]
            new ProductComponent(document.getElementById('user')).render(user)
        })
    }

    render() {
        this.parent.innerHTML = this.getHTML()

        new BackButtonComponent(document.getElementById('back')).render(() => {
            this.goBack()
        })

        this.getData()
    }
}
