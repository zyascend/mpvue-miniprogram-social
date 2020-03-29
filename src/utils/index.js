function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function beautifyTime(timestamp) {
  let mistiming = Math.round(new Date() / 1000) - timestamp / 1000
  let postfix = mistiming > 0 ? '前' : '后'
  mistiming = Math.abs(mistiming)
  let arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
  let arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
  for (let i = 0; i < 7; i++) {
    let inm = Math.floor(mistiming / arrn[i])
    if (inm !== 0) {
      return inm + arrr[i] + postfix
    }
  }
}

export default {
  formatNumber,
  formatTime,
  beautifyTime
}
