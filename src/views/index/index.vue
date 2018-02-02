<style lang="less">
  @import 'index.less';
</style>
<template>
  <div class="yyyBg" id="yyyBg">
    <marquee>
      <marquee-item class="marquee" v-for="i in 5" :key="i" item-height="30px">获奖者{{i}}</marquee-item>
    </marquee>
    <view-box>
      <div>
        <div class="yyyBox animated shake">
          <img src="../../assets/images/money.png" alt="" id="shakeImg">
        </div>
        <box gap="10px 10px" style="position: absolute;top: 76%;left: 20%;right: 20%;">
          <x-button type="default" class="description" @click.native="dispShow = true">活动介绍</x-button>
        </box>
        <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
          <disp v-show="dispShow" @click.native="dispShow = false"></disp>
        </transition>
        <transition v-on:enter="imgenter" v-on:leave="imgleave">
          <div class="imgList" v-show="imgListShow">
            <img class="imgObj1" src="../../assets/images/money.png" alt="">
            <img class="imgObj2" src="../../assets/images/money.png" alt="">
            <img class="imgObj3" src="../../assets/images/money.png" alt="">
            <img class="imgObj4" src="../../assets/images/money.png" alt="">
            <img class="imgObj5" src="../../assets/images/money.png" alt="">
          </div>
        </transition>
      </div>
    </view-box>
  <!--top-->
    <audio id="c_audio" preload="auto">
      <source type="audio/mpeg" src="../../../static/MP3/5018.mp3">
    </audio>
    <audio id="c_audio2" preload="auto">
      <source type="audio/mpeg" src="../../../static/MP3/5371.wav">
    </audio>

  </div>
</template>

<script>
  import { Box, Flexbox, FlexboxItem, XButton, ViewBox, Marquee, MarqueeItem } from 'vux'
  import disp from './disp.vue'
  import index from '../../model/index'
  import '../../assets/js/Velocity'
  /* eslint-disable no-unused-vars,space-before-function-paren,eqeqeq */
  export default {
    components: {
      ViewBox,
      Flexbox,
      FlexboxItem,
      XButton,
      Box,
      disp,
      Marquee,
      MarqueeItem
    },
    data() {
      return {
        onFetching: false,
        show: false,
        dispShow: false,
        imgListShow: false,
        num:0,
        shakeShow: true
      }
    },
    methods: {
      beforeEnter: function (el) {
        this.dispShow  = true;
        Velocity(el, { translateY:['100%'],translateZ:0,translateX:0 }, { duration: 0})
      },
      // 此回调函数是可选项的设置
      // 与 CSS 结合时使用
      enter: function (el, done) {
        const _this = this;
        Velocity(
          el,
          { translateY:0, translateZ:0,translateX:0},
          {
            easing:'spring',duration: 1000 ,complete: function(){
            _this.dispShow  = true;
            done();
          }}
        )
      },
      // 此回调函数是可选项的设置
      // 与 CSS 结合时使用
      leave: function (el, done) {
        const _this = this;
        Velocity(el, { translateY:'100%',translateZ:0 ,translateX:0}, { easing:'easeOutSine',duration:500,complete:  function(){
          _this.dispShow  = false;
          done();
        } })
      },
      getPrize() {
        let _this = this
        if (_this.show) {
          index.prizeList().then(function (res) {
            console.log(res)
          })
        } else {
//          _this.$http('http://api2.weikaiqi.com/KMGNRBOSVC/card.Card/get', {}).then(function (res) {
//            console.log(res)
//          })
        }
      },
      yaoyiyao () {
        const _this = this
        let shake = document.getElementById('shakeImg')
        let caudio = document.getElementById('c_audio')
        let caudiot = document.getElementById('c_audio2')
//        运动事件监听
        if (window.DeviceMotionEvent) {
          window.addEventListener('devicemotion', deviceMotionHandler, false)
        } else {
          alert('您的浏览器不支持此功能')
        }
//         获取加速度信息
//         通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
//         而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
        let SHAKE_THRESHOLD = 4000
        let lastupdate = 0
        let x = 0
        let y = 0
        let z = 0
        let lastx = 0
        let lasty = 0
        let lastz = 0
        function deviceMotionHandler(eventData) {
          _this.show = false
          _this.shakeShow = true
          let acceleration = eventData.accelerationIncludingGravity
          let curTime = new Date().getTime()
          caudio.pause()
          if ((curTime - lastupdate) > 100) {
            _this.show = true
            let diffTime = curTime - lastupdate
            lastupdate = curTime
            x = acceleration.x
            y = acceleration.y
            z = acceleration.z
            let speed = Math.abs(x - lastx + y - lasty + z - lastz) / diffTime * 10000
            if (Math.abs(x - lastx) > 10 || Math.abs(y - lasty) > 4 || Math.abs(y - lasty) > 4) {
              caudio.play()
            }
            if (speed > SHAKE_THRESHOLD) {
              _this.drawImg()
              caudiot.play()
              _this.$vux.toast.show({
                type: 'text',
                text: '中奖了',
                position: 'top',
                time: 3000
              })
            }
            lastx = x
            lasty = y
            lastz = z
          }
        }
      },
      imgenter: function (el, done) {
        const _this = this;
        el.style.zIndex = 99;
        for (var i=0; i<el.children.length; i++) {
          Velocity(
            el.children[i],
            { translateY:['1400%']},
            {
              duration: 1000 , delay: 500*i, complete: function(){
              _this.imgListShow  = false;
              done();
            }}
          )
        }
      },
      // 此回调函数是可选项的设置
      // 与 CSS 结合时使用
      imgleave: function (el, done) {
        const _this = this;
        _this.imgListShow  = false;
        el.style.zIndex = -1;
        _this.num++
        if (_this.num<10) {
          for (var i=0; i<el.children.length; i++) {
            Velocity(
              el.children[i],
              { translateX:-1, translateY: ['-100%']},
              {
                duration: 100, complete: function () {
                _this.imgListShow = true;
                done();
              }
              }
            )
          }
        }
      },
      drawImg () {
        const _this = this
        this.imgListShow = true
      }
    },
    props: {
    },
    // 加载数据
    mounted () {
      this.yaoyiyao()
      this.getPrize()
    },
    created() {
//      this.drawImg()
    }
  }
</script>
