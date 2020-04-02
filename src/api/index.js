import { get } from '../utils/request'

const API_PREFIX = 'https://weapp.shyshyshy.icu'

export function getAllPosts() {
  return get(`${API_PREFIX}/mini/post/getAllPosts`)
}

export function newPost(filePath, post) {
  return new Promise((resolve, reject) => {
    console.log('function newPost')
    console.log(filePath, post)
    mpvue.uploadFile({
      url: `${API_PREFIX}/mini/post/newPosts`,
      filePath,
      name: 'file',
      formData: {
        'post': encodeURIComponent(JSON.stringify(post))
      },
      success: res => {
        if (res.statusCode === 200) {
          console.log('function newPost [success]')
          resolve()
        } else {
          console.log('function newPost [failed]')
          reject(res)
        }
      }
    })
  })
}
