import MainPage from "../main/index.js";

export default class ProductPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
  }

  getData() {
    const cats = [
      { id: 1, title: "Британская кошка", desc: "Спокойная порода, любит уют.", src: "https://moizver.com/upload/medialibrary/f5a/f5a1cbcd9bfdf5634edfa557c8662a1a.jpg", status: "Ищет дом" },
      { id: 2, title: "Сфинкс", desc: "Очень ласковый кот, любит тепло.", src: "https://yac-wh-sb-prod-s3-media-07001.storage.yandexcloud.net/media/images/sphinx.max-2880x1820.format-jpeg_SPtfFVj.jpg", status: "На передержке" },
      { id: 3, title: "Мейн-кун", desc: "Большой, пушистый, дружелюбный.", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Q8nougKzX25czjW0bDk3MwN6soF2aR5LZLWbjFdfTuj6hDR0Xq6lRmeq71YwxwhpN2w&usqp=CAU", status: "Доступен" },
    ];
    return cats.find(c => c.id === this.id);
  }

  render() {
    const cat = this.getData();

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
            <p class="card-text">${cat.desc}</p>
          </div>
        </div>
      </div>
    `;

    document.getElementById("back-btn").addEventListener("click", () => {
      new MainPage(this.parent).render();
    });
  }
}
