export class SortComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return `
            <div class="mb-3">
                <label class="form-label">Сортировка:</label>
                <select id="sort" class="form-select" style="width:200px;">
                    <option value="">По умолчанию</option>
                    <option value="id_asc">id ↑</option>
                    <option value="id_desc">id ↓</option>
                    <option value="time_asc">по времени ↑</option>
                    <option value="time_desc">по времени ↓</option>
                </select>
            </div>
        `
    }

    render(onChange) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())
        document.getElementById('sort').addEventListener('change', (e) => {
            onChange(e.target.value)
        })
    }
}
