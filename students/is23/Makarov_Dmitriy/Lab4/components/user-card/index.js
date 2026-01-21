import UserPage from "../../pages/user/index.js";

export default class UserCard {
  constructor(parent) {
    this.parent = parent;
  }

  render(user, id) {
    this.parent.insertAdjacentHTML("beforeend", `
      <div class="col-4">
        <div class="card">
          <img src="${user.photo_200}" class="card-img-top">
          <div class="card-body">
            <h5>${user.first_name} ${user.last_name}</h5>
            <button class="btn btn-primary">Подробнее</button>
          </div>
        </div>
      </div>
    `);

    const btn = this.parent.lastElementChild.querySelector("button");
    btn.addEventListener("click", () => {
      new UserPage(document.getElementById("root"), id).render();
    });
  }
}
