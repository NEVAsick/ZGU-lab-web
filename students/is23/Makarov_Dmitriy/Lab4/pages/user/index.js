import { ajax } from "../../modules/ajax.js";
import { getUser } from "../../modules/urls.js";
import MainPage from "../main/index.js";

export default class UserPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
  }

  render() {
    ajax.get(getUser(this.id), (data) => {
      const user = data.response[0];

      this.parent.innerHTML = `
        <div class="container mt-4">
          <button id="back" class="btn btn-secondary mb-3">Назад</button>
          <div class="card">
            <img src="${user.photo_400_orig}" class="card-img-top">
            <div class="card-body">
              <h5>${user.first_name} ${user.last_name}</h5>
            </div>
          </div>
        </div>
      `;

      document.getElementById("back").onclick = () =>
        new MainPage(this.parent).render();
    });
  }
}
