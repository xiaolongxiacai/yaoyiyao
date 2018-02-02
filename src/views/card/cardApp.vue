<style lang="less">
  @import './card.less';
  @import './fonts/iconfont.css';
</style>
<template>
  <div id="">
    <div class="card_tab">
      <blur :blur-amount=40 :url="info.headphoto?info.headphoto:defaultImg" :height="cardtops">
        <div class="card_photo">
          <img v-if="info.headphoto" :src="info.headphoto?info.headphoto:defaultImg">
        </div>
        <div style=" padding: 16px;" id="cardtops">
          <div class="card_name">
            <h2>{{info.ch_name}}<span v-if="info.en_name!=''">{{info.en_name}}</span></h2>
            <p v-if="info.job !=''"><span v-if="info.departmental != ''">{{info.departmental}} - </span>{{info.job}}</p>
          </div>
          <div class="company_name" v-if="info.company != ''">
            <a :href="info.weburl?info.weburl:'#'"><span>{{info.company}}</span><i
              class="cardfont card-wangzhi"></i></a>
          </div>
          <div class="company_type" v-if="info.mobile">
            <a :href="'tel:'+ info.mobile ">
              <i class="cardfont card-shouji-copy"></i>{{info.mobile}} <i class="cardfont card-dianji-copy gos"></i></a>

          </div>
          <br>
          <div class="company_type" v-if="info.weixin !=''">
            <i class="cardfont card-weixin"></i>{{info.weixin}}
          </div>
          <br>
          <div class="company_type" v-if="info.qq">
            <i class="cardfont card-qq01"></i>{{info.qq}}
          </div>
          <br>
          <div class="company_type" v-if="info.mail !=''">
            <i class="cardfont card-youxiang"></i>{{info.mail}}
          </div>
          <br>
          <div class="company_type h20s" v-if="info.address !=''">
            <i class="cardfont card-diliweizhi1"></i>{{info.address}}{{info.address}}
          </div>
          <div class="mores" v-if="info.my_url != '' ">
            <a :href="info.my_url?info.my_url:'#'"><i class="cardfont card-chakangengduo"></i></a>
          </div>
        </div>
      </blur>
    </div>
    <ul class="card_three">
      <li class="card_three_tab">
        <i class="cardfont card-huo1 yellows"></i><span><countup v-if="info.viewcount >= 0" :start-val="0"
                                                                 :end-val="info.viewcount"
                                                                 :duration="2"></countup></span>点人气
      </li>
      <li class="card_three_tab" @click="praise">
        <i class="cardfont card-zan reds"
           v-bind:class="{ active: info.pradisplay == 1 }"></i><span><countup v-if="info.praise >=0" :start-val="0"
                                                                              :end-val="info.praise"
                                                                              :duration="2"></countup></span>人点赞
      </li>
      <!--<li class="card_three_tab" @click="collect">-->
      <!--<i class="cardfont card-xing blues"-->
      <!--v-bind:class="{ active: info.coldisplay == 1 }"></i><span>{{info.collect ? info.collect : 0}}</span>人收藏-->
      <!--</li>-->
    </ul>
    <div class="motto" v-if="info.description !=''" v-html="info.description">
    </div>
    <div class="cardimglist">
      <div class="box1" id="cardimglist" :style="{width: widthchange + 'px'}">
        <div class="box1-item" v-for="(item, index) in album">
          <img class="previewer-demo-img" v-if="item.src !=''" :src="item.src" width="100" @click="showprive(index)">
        </div>
      </div>

      <div v-transfer-dom>
        <previewer :list="info.album" ref="previewer" :options="options"></previewer>
      </div>
    </div>
    <div class="companyProject">
      <div class="clogo" v-if="info.logo != ''">
        <img :src="info.logo"/>
      </div>
      <h2 v-if="info.subject != ''">主营项目</h2>
      <div class="cardfanwei" v-html="info.subject">
      </div>
      <!--<scroller lock-x height="100px" @on-scroll="onScroll" ref="scrollerEvent">-->
      <!---->
      <!--</scroller>-->
    </div>
    <div class="qrcode">
      <card>
        <div slot="content"><img :src="qrcodeUrl" style="max-width: 90%"/></div>
      </card>
    </div>
    <divider>我是有底线的</divider>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="msgtext"
           :position="position"></toast>
  </div>
</template>

<script>
  /* eslint-disable no-unused-vars,space-before-function-paren,eqeqeq */

  import {
    Blur,
    Qrcode,
    Toast,
    querystring,
    Scroller,
    Previewer,
    TransferDom,
    Divider,
    Card,
    Countup,
    XButton
  } from 'vux'
  import card from '../../model/card'
  import weixin from '../../model/weixin'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer,
      Scroller,
      Blur,
      Toast,
      Qrcode,
      Divider,
      Card,
      Countup,
      XButton
    },
    data() {
      return {
        position: 'top',
        showPositionValue: false,
        prams: {},
        msgtext: '',
        widthchange: 1000,
        cardtops: 300,
        info: {
          praise: 0,
          viewcount: 0,
          album: [],
          description: '',
          headphoto: '',
          company: '',
          departmental: '',
          job: '',
          weburl: '',
          subject: '',
          gsweixin: '',
          logo: '',
          ch_name: '',
          en_name: '',
          mobile: '',
          qq: '',
          mail: '',
          weixin: '',
          address: '',
          loading: false
        },
        album: [],
        options: {
          getThumbBoundsFn(index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        },
        qrcodeUrl: '',
        defaultImg: window.__sichem.headerPic || ''
      }
    },
    methods: {
      showprive(index) {
        // this.$refs.previewer.show(index)
        const _this = this
        let imgs = []
        for (var i in _this.album) {
          imgs.push(_this.album[i].src)
        }
        _this.$wechat.previewImage({
          current: _this.album[index].src, // 当前显示图片的http链接
          urls: imgs
        })
      },
      onScroll(pos) {
        this.scrollTop = pos.top
      },
      show() {
        let _this = this
        card.list({id: _this.prams.id}).then(function (res) {
          if (res.errCode == 0) {
            document.title = res.data.ch_name + '的名片'
            _this.info = res.data
            _this.info.praise = parseInt(res.data.praise)
            _this.info.viewcount = parseInt(res.data.viewcount)
            weixin.set(_this, {
              title: res.data.share.share_title || '',
              link: location.href,
              imgUrl: res.data.share.share_thumb || '',
              desc: res.data.share.share_content || ''
            })
            _this.info.subject = _this.info.subject.replace(/\n/g, '<br/>')
          }
          _this.$vux.loading.hide()
        })
      },
      collect() {
        let _this = this
        if (_this.loading) return false
        _this.loading = true
        if (_this.info.coldisplay == 1) {
          card.collect_del({id: _this.prams.id}).then(function (res) {
            if (res.errCode == 0) {
              _this.info.coldisplay = 0
              _this.info.collect = parseInt(_this.info.collect) - 1
              _this.showPositionValue = true
              _this.msgtext = '已取消收藏'
              _this.loading = false
            }
          })
        } else {
          card.collect_add({id: _this.prams.id}).then(function (res) {
            if (res.errCode == 0) {
              _this.info.coldisplay = 1
              _this.info.collect = parseInt(_this.info.collect) + 1
              _this.showPositionValue = true
              _this.msgtext = '收藏成功！'
              _this.loading = false
            }
          })
        }
      },
      praise() {
        let _this = this
        if (_this.loading) return false
        _this.loading = true
        _this.$vux.toast.show({
          type: 'text',
          text: 'loading',
          position: 'top',
          time: 10000
        })
        if (_this.info.pradisplay == 1) {
          card.praise_del({id: _this.prams.id}).then(function (res) {
            if (res.errCode == 0) {
              _this.info.praise = parseInt(_this.info.praise) - 1
              _this.showPositionValue = true
              _this.msgtext = '已取消点赞'
              _this.loading = false
            }
            _this.$vux.toast.hide()
          }).catch(function () {
            _this.$vux.toast.hide()
          })
        } else {
          card.praise_add({id: _this.prams.id}).then(function (res) {
            if (res.errCode == 0) {
              _this.info.praise = parseInt(_this.info.praise) + 1
              _this.showPositionValue = true
              _this.msgtext = '点赞成功！'
              _this.loading = false
            }
            _this.$vux.toast.hide()
          }).catch(function () {
            _this.$vux.toast.hide()
          })
        }
        _this.info.pradisplay = _this.info.pradisplay ? 0 : 1
      },
      qrcode() {
        const _this = this
        card.qrcode({id: _this.prams.id}).then(function (res) {
          if (res.errCode == 0) {
            _this.qrcodeUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + res.data.ticket
          }
        })
      },
      config: function (url) {
        let _this = this
        weixin.get(url).then(function (res) {
          if (res.errCode === 0) {
            _this.$wechat.config(res.data.config)
          }
        })
      }
    },
    // 加载数据
    mounted() {
      this.$vux.loading.show({
        text: 'Loading'
      })
    },
    created() {
      this.prams = querystring.parse()
      this.show()
      this.qrcode()
      this.config(location.href)
    },
    watch: {
      info(val) {
        const _this = this
        let imgs = []
        let k = 0
        for (var i in val.album) {
          imgs[i] = new Image()
          imgs[i].onload = function () {
            k = k + 1
            if (val.album.length == k) {
              _this.album = val.album
              setTimeout(function () {
                _this.cardtops = document.getElementById('cardtops').clientHeight
                let oDiv = document.getElementById('cardimglist')
                let aDiv = oDiv.getElementsByTagName('div')
                let gaowidth = 0
                let widths = 0
                if (aDiv.length > 0) {
                  for (var i in aDiv) {
                    if (!isNaN(i)) {
                      gaowidth = gaowidth > parseInt(aDiv[i]['clientWidth']) ? gaowidth : parseInt(aDiv[i]['clientWidth'])
                      let mk = parseInt(aDiv[i]['clientWidth']) > 0 ? parseInt(aDiv[i]['clientWidth']) : gaowidth
                      widths = parseInt(widths) + parseInt(mk)
                      console.log(widths)
                    }
                  }
                  _this.widthchange = parseInt(widths) + gaowidth * 2
                }
              }, 300)
            }
          }
          imgs[i].src = val.album[i].src
        }
      }
    }
  }
</script>
