export const ajax = {
  get(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => callback(JSON.parse(xhr.responseText));
    xhr.onerror = () => callback({ error: { error_msg: "Network error" } });
    xhr.send();
  }
};
