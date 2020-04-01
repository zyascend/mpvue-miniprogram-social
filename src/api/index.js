import { get } from '../utils/request'

const API_PREFIX = 'https://weapp.shyshyshy.icu'

export function getAllPosts() {
  return get(`${API_PREFIX}/mini/post/getAllPosts`)
}

// export function newPost() {
//   return get(`${API_PREFIX}/book/home/v2`, { openId })
// }
