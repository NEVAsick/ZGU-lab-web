import MainPage from "../main/index.js";

export default class ProductPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
  }

  async loadCat(id) {
  const res = await fetch(`/cats/${id}`);
  return await res.json();
}


  async render() {
  const cat = await this.loadCat(this.id);

  this.parent.innerHTML = `
    <div class="container mt-4">
      <div class="alert alert-warning" role="alert">
        Статус: <b>${cat.status}</b>
      </div>

      <button id="back-btn" class="btn btn-secondary mb-3">Назад</button>

      <div class="card">
        <img src="${cat.src}" class="card-img-top" alt="${cat.title}">
        <div class="card-body">
          <h5 class="card-title">${cat.title}</h5>
          <p class="card-text">${cat.text ?? cat.desc ?? ""}</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById("back-btn").addEventListener("click", () => {
    new MainPage(this.parent).render();
  });
}
}
