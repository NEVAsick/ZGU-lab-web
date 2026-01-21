export const ajax = {
  async get(url) {
    const resp = await fetch(url, { method: "GET" });

    
    if (!resp.ok) {
      throw new Error(`HTTP error: ${resp.status} ${resp.statusText}`);
    }

    return await resp.json();
  }
};
