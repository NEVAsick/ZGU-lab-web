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
          ЛР-4: VK API — список участников + фильтр (вариант 2)
        </div>

        <div id="filter"></div>
        <div id="users" class="row g-3"></div>
      </div>
    `;

    const filterHost = document.getElementById("filter");
    new FilterComponent(filterHost).render((value) => this.loadUsers(value));

    this.loadUsers("friends");
  }

  loadUsers(filterValue) {
    const container = document.getElementById("users");
    container.innerHTML = "";

    ajax.get(getGroupMembers(filterValue), (data) => {
      if (data.error) {
        container.innerHTML = `<div class="alert alert-danger">Ошибка VK: ${data.error.error_msg}</div>`;
        return;
      }

      data.response.items.forEach((user) => {
        new UserCard(container).render(user, user.id);
      });
    });
  }
}
