import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.common = `access_token=${accessToken}&v=${version}`
    }

    getMembers(groupId, sort = '') {
    return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_max_orig,photo_max&sort=${sort}&${this.common}`
}



    getUser(userId) {
    return `${this.url}/users.get?user_ids=${userId}&fields=photo_max_orig,photo_max,bdate,city,sex,domain,home_town,about&${this.common}`
}


}

export const urls = new Urls()
