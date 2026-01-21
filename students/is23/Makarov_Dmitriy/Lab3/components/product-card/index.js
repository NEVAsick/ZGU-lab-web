export default class ProductCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <img src="${data.src}" class="card-img-top" alt="${data.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">${data.text}</p>
            <button class="btn btn-primary mt-auto" data-id="${data.id}">Подробнее</button>
          </div>
        </div>
      </div>
    `;
  }

  render(data, onClick) {
    this.parent.insertAdjacentHTML("beforeend", this.getHTML(data));
    const btn = this.parent.querySelector(`button[data-id="${data.id}"]`);
    btn.addEventListener("click", () => onClick(data.id));
  }
}
