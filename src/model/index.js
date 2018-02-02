/**
 * Created by Sing <78276478@qq.com> on 2017/11/1 0001.
 * updata by Sing <252476834@qq.com> on 2017/12/1 0002.
 */
import Lib from 'assets/js/Lib'
import env from '../assets/config/env'

let obj = {}

let assemblage = function (url) {
  let urlfle = ''
  if (env === 'development') {
    window.__sichem = {
      AppID: 'wxb743423e10b78207',
      Mid: 'KMGNRBOSVC'
    }
    // http://10.255.255.180/
    // urlfle = 'http://api2.weikaiqi.com/' + window.__sichem.Mid + '/' + url
    urlfle = url
  } else {
    urlfle = url
  }
  return urlfle
}

obj.prizeList = function ($param = {}) {
  return Lib.M.ajax({ url: assemblage('prize.json'), data: $param })
}

export default obj
