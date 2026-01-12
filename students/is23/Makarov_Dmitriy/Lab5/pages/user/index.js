import { ajax } from "../../modules/ajax.js";
import { getUser } from "../../modules/urls.js";
import MainPage from "../main/index.js";

export default class UserPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
  }

  async render() {
    this.parent.innerHTML = `
      <div class="container mt-4">
        <div class="alert alert-secondary">Загрузка профиля...</div>
      </div>
    `;

    try {
      const data = await ajax.get(getUser(this.id));

      if (data.error) {
        this.parent.innerHTML = `
          <div class="container mt-4">
            <div class="alert alert-danger">Ошибка VK: ${data.error.error_msg}</div>
            <button id="back" class="btn btn-secondary mt-2">Назад</button>
          </div>
        `;
        document.getElementById("back").onclick = () =>
          new MainPage(this.parent).render();
        return;
      }

      const user = data.response[0];

      this.parent.innerHTML = `
        <div class="container mt-4">
          <button id="back" class="btn btn-secondary mb-3">Назад</button>

          <div class="card">
            <img src="${user.photo_400_orig}" class="card-img-top" alt="">
            <div class="card-body">
              <h5>${user.first_name} ${user.last_name}</h5>
              <p class="text-muted m-0">id: ${user.id}</p>
            </div>
          </div>
        </div>
      `;

      document.getElementById("back").onclick = () =>
        new MainPage(this.parent).render();

    } catch (e) {
      this.parent.innerHTML = `
        <div class="container mt-4">
          <div class="alert alert-danger">Ошибка сети: ${String(e.message || e)}</div>
          <button id="back" class="btn btn-secondary mt-2">Назад</button>
        </div>
      `;
      document.getElementById("back").onclick = () =>
        new MainPage(this.parent).render();
    }
  }
}
