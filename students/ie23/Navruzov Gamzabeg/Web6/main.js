import {MainPage} from "./pages/MainPage.js";
import {UserPage} from "./pages/UserPage.js";

const app = document.getElementById('app')

function renderMain() {
    const page = new MainPage(app, changePage)
    page.render()
}

function changePage(page, id = null) {
    if (page === 'user') {
        new UserPage(app, id, renderMain).render()
    }
}

renderMain()


