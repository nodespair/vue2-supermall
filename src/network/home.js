import { request } from "./request";

export function getGomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}