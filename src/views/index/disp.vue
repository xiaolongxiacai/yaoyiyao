<style lang="less">
  .disp{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    width: 100%;
    height: 100%;
    background-color: #bd140d;
    color: #ffffff;
    font-size: 14px;
    .dispContent{
      text-align: left;
      padding: 20px 15px;
      h4{
        text-align: center;
      }
      p{
        line-height: 1.8;
        padding: 0 30px;
      }
    }
  }
</style>
<template>
  <div class="disp">
    <view-box>
      <div class="dispContent">
        <h4>活动规则</h4>
        <p>摇一摇描述，具体说明摇一摇规则，摇一摇奖品列项！</p>
        <p>1：一等奖：iPhoneX</p>
        <p>2：二等奖：索尼电视一台</p>
        <p>3：三等奖：哇哈哈一车</p>
        <p>4：四等奖：爽歪歪一箱</p>
        <p>5：五等奖：小洋人一个</p>
      </div>
    </view-box>
  </div>
</template>

<script>
  import { Box, Flexbox, FlexboxItem, XButton, ViewBox } from 'vux'
  import index from '../../model/index'
  import '../../assets/js/Velocity'
  /* eslint-disable no-unused-vars,space-before-function-paren,eqeqeq */
  export default {
    components: {
      ViewBox,
      Flexbox,
      FlexboxItem,
      XButton,
      Box
    },
    data() {
      return {
        onFetching: false,
        show: false
      }
    },
    methods: {
    },
    props: {
    },
    // 加载数据
    mounted () {
    },
    created() {
    }
  }
</script>
