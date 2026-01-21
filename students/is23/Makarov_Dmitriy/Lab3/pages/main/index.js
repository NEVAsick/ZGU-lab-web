import ProductCardComponent from "../../components/product-card/index.js";
import ProductPage from "../product/index.js";

export default class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  getData() {
    return [
      { id: 1, src: "https://moizver.com/upload/medialibrary/f5a/f5a1cbcd9bfdf5634edfa557c8662a1a.jpg", title: "Британская кошка", text: "Спокойная и уютная." },
      { id: 2, src: "https://yac-wh-sb-prod-s3-media-07001.storage.yandexcloud.net/media/images/sphinx.max-2880x1820.format-jpeg_SPtfFVj.jpg", title: "Сфинкс", text: "Любит тепло и внимание." },
      { id: 3, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Q8nougKzX25czjW0bDk3MwN6soF2aR5LZLWbjFdfTuj6hDR0Xq6lRmeq71YwxwhpN2w&usqp=CAU", title: "Мейн-кун", text: "Большой и добрый." },
    ];
  }

  render() {
    this.parent.innerHTML = `
      <div class="container mt-4">
        <div class="alert alert-info" role="alert">
          Добро пожаловать в каталог кошек 😺 Нажми “Подробнее”.
        </div>
        <div id="main-page" class="row g-3"></div>
      </div>
    `;

    const container = document.getElementById("main-page");
    this.getData().forEach(cat => {
      const card = new ProductCardComponent(container);
      card.render(cat, (id) => {
        new ProductPage(this.parent, id).render();
      });
    });
  }
}
