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
    urlfle = 'http://api2.weikaiqi.com/' + window.__sichem.Mid + '/' + url
  } else {
    urlfle = url
  }
  return urlfle
}

obj.list = function ($param = {}) {
  return Lib.M.ajax({ url: assemblage('card.Card/get'), data: $param })
}
// 收藏
obj.collect_add = function ($param = {}) {
  return Lib.M.ajax({ url: assemblage('card.Collect/add'), data: $param })
}
obj.collect_del = function ($param = {}) {
  return Lib.M.ajax({ url: assemblage('card.Collect/del'), data: $param })
}
obj.collect_list = function ($param = {}) {
  return Lib.M.ajax({ url: assemblage('card.Collect/get'), data: $param })
}
// 点赞
obj.praise_add = function ($param = {}) {
  return Lib.M.ajax({ url: assemblage('card.Praise/add'), data: $param })
}
obj.praise_del = function ($param = {}) {
  return Lib.M.ajax({ url: assemblage('card.Praise/del'), data: $param })
}
obj.qrcode = function ($param = {}) {
  return Lib.M.ajax({ url: assemblage('card.Card/qrcode'), data: $param })
}
export default obj
