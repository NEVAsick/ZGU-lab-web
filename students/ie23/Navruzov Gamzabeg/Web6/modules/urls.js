const API_BASE = 'http://localhost:3000' 

class Urls {
    constructor() {
        this.base = API_BASE
    }

    
    getMembers(sort = '') {
        return `${this.base}/api/users${sort ? `?sort=${encodeURIComponent(sort)}` : ''}`
    }

   
    getUser(userId) {
        return `${this.base}/api/users/${userId}`
    }

    
    createUser() {
        return `${this.base}/api/users`
    }

    
    deleteUser(userId) {
        return `${this.base}/api/users/${userId}`
    }
}

export const urls = new Urls()
