import { request } from "./request";

export function getGomeMultidata() {
    return request({
        // http://152.136.185.210:7878/api/m5/home/multidata
        url: '/home/multidata'
    })
}
export function getHomeGoods(type, page){
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}