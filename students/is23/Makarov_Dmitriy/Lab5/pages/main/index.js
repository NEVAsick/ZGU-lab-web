import { ajax } from "../../modules/ajax.js";
import { getGroupMembers } from "../../modules/urls.js";
import UserCard from "../../components/user-card/index.js";
import FilterComponent from "../../components/filter/index.js";

export default class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    this.parent.innerHTML = `
      <div class="container mt-4">
        <div class="alert alert-info" role="alert">
          ЛР-5: fetch + async/await (вместо XHR), вариант 2 (filter)
        </div>

        <div id="filter"></div>
        <div id="users" class="row g-3"></div>
      </div>
    `;

    const filterHost = document.getElementById("filter");
    new FilterComponent(filterHost).render((value) => this.loadUsers(value));

    
    this.loadUsers("friends");
  }

  async loadUsers(filterValue) {
    const container = document.getElementById("users");
    container.innerHTML = `<div class="alert alert-secondary">Загрузка...</div>`;

    try {
      const data = await ajax.get(getGroupMembers(filterValue));

      if (data.error) {
        container.innerHTML =
          `<div class="alert alert-danger">Ошибка VK: ${data.error.error_msg}</div>`;
        return;
      }

      container.innerHTML = "";
      data.response.items.forEach((user) => {
        new UserCard(container).render(user, user.id);
      });

    } catch (e) {
      container.innerHTML =
        `<div class="alert alert-danger">Ошибка сети: ${String(e.message || e)}</div>`;
    }
  }
}
