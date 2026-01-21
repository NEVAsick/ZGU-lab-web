class Ajax {
    get(url, callback) {
        fetch(url)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(err => console.error("Ошибка запроса:", err));
    }

    post(url, body = {}, callback) {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => callback && callback(data))
            .catch(err => console.error("Ошибка запроса:", err));
    }

    delete(url, callback) {
        fetch(url, { method: "DELETE" })
            .then(response => response.json())
            .then(data => callback && callback(data))
            .catch(err => console.error("Ошибка запроса:", err));
    }
}

export const ajax = new Ajax();
