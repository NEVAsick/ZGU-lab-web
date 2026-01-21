import ProductCardComponent from "../../components/product-card/index.js";
import ProductPage from "../product/index.js";

export default class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  async loadCats() {
  const res = await fetch("/cats");
  return await res.json();
} 

  async render() {
  this.parent.innerHTML = `
    <div class="container mt-4">
      <div class="alert alert-info" role="alert">
        Добро пожаловать в каталог кошек 😺 Нажми “Подробнее”.
      </div>
      <div id="main-page" class="row g-3"></div>
    </div>
  `;

  const container = document.getElementById("main-page");

  const data = await this.loadCats();
  data.forEach(cat => {
    const card = new ProductCardComponent(container);
    card.render(cat, (id) => {
      new ProductPage(this.parent, id).render();
    });
  });
}
}