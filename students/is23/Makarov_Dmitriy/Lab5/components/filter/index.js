export default class FilterComponent {
  constructor(parent) {
    this.parent = parent;
  }

  render(onChange) {
    this.parent.insertAdjacentHTML(
      "beforeend",
      `
      <div class="mb-3">
        <label class="form-label">Фильтр участников (VK filter)</label>
        <select id="vkFilter" class="form-select">
            <option value="friends">friends (друзья)</option>
            <option value="managers">managers (руководители)</option>
            <option value="unsure">unsure (не уверен)</option>
            <option value="unsure_friends">unsure_friends</option>
            <option value="donut">donut</option>
            <option value="invites">invites</option>
        </select>

      </div>
      `
    );

    const select = this.parent.querySelector("#vkFilter");
    select.addEventListener("change", () => onChange(select.value));
  }
}
