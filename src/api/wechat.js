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

export function getUserOpenId(cb) {
  // mpvue.login({
  //   success: function(res) {
  //     console.log(res)
  //     if (res.code) {
  //       const appid = 'wx0fad7b50f723dc46'
  //       getOpenId(appid, res.code).then(response => {
  //         if (handleError(response)) {
  //           const openId = response.data.data.openid
  //           const sessionKey = response.data.data.session_key
  //           setStorageSync('openId', openId)
  //           setStorageSync('session_key', sessionKey)
  //           cb && cb(openId)
  //         }
  //       })
  //     } else {
  //       console.log('获取用户登录态失败！' + res.errMsg)
  //       setError('获取用户登录态失败！')
  //     }
  //   },
  //   fail() {
  //     setError('获取openId失败！')
  //   }
  // })
}

export function setStorageSync(key, data) {
  mpvue.setStorageSync(key, data)
}

export function getStorageSync(key) {
  const result = mpvue.getStorageSync(key)
  console.log('getStorageSync', key, result)
  return result
}
