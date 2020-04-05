import { showToast } from '../utils'
import { get } from '../utils/request'

export function showLoading(params) {
  const { title } = params
  mpvue.showLoading({ title })
}

export function hideLoading() {
  mpvue.hideLoading()
}
export function authorize (scope, onSuccess, onFail) {
  mpvue.authorize({
    scope: `scope.${scope}`,
    success: () => {
      onSuccess && onSuccess()
    },
    fail: () => {
      onFail && onFail()
    }
  })
}
export function getSetting(authorize, onSuccess, onFail) {
  mpvue.getSetting({
    success: (res) => {
      if (res.authSetting[`scope.${authorize}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail: () => {
      mpvue.hideLoading()
      // TODO 全局异常捕获
      console.log('[mpvue.getSetting] [error] [wechat.js-32]')
    }
  })
}
export function getUserInfo(onSuccess, onFail) {
  mpvue.getUserInfo({
    success(res) {
      const { userInfo } = res
      console.log('getUserInfo', userInfo)
      onSuccess(userInfo)
    },
    fail() {
      onFail ? onFail() : console.log('获取用户信息失败')
    }
  })
}

export function getOpenId(cb) {
  mpvue.login({
    success: async (res) => {
      console.log('got login res: ', res)
      if (res.code) {
        const params = {
          appid: '',
          secret: '',
          js_code: res.code,
          grant_type: 'authorization_code'
        }
        const result = await get('https://api.weixin.qq.com/sns/jscode2session', params)
        if (result.status === 200) {
          setStorageSync('openid', result.data.openid)
          cb && cb(result.data.openid)
        }
      } else {
        showToast('获取openId失败')
      }
    },
    fail: () => {
      showToast('获取openId失败')
    }
  })
}

export function setStorageSync(key, data) {
  console.log('setStorageSync', key, data)
  mpvue.setStorageSync(key, data)
}

export function getStorageSync(key) {
  const result = mpvue.getStorageSync(key)
  console.log('getStorageSync', key, result)
  return result
}
