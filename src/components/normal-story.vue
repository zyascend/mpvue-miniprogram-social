<template>
  <div class="container">
    <img class="pic" alt="" src="http://qiniu.shyshyshy.icu/image/sana/1585392633511_0"/>
    <img class="ava" alt="" src="http://qiniu.shyshyshy.icu/image/sana/20170602220359_s5Lde.png"/>
    <div class="live">Live</div>
  </div>
</template>

<script>
  export default {
    name: 'normal-story'
  }
</script>

<style lang="scss" scoped>
  @import "../assets/mixin";
  .container{
    @include wh(66px, 71px);
    min-width: 66px;
    box-sizing: border-box;
    position: relative;
    margin-right: 10px;
    .pic {
      box-sizing: border-box;
      position: absolute;
      top: 5px;
      left: 0;
      @include wh(60px, 60px);
      border: 2px solid orangered;
      border-radius: 15px;
      background: center no-repeat;
      background-size: cover;
    }
    .ava {
      position: absolute;
      top: 0;
      right: 0;
      @include wh(30px, 30px);
      border: 2px solid #fff;
      border-radius: 20px;
    }
    .live {
      position: absolute;
      bottom: 0;
      left: 5px;
      @include wh(46px, 16px);
      border: 2px solid #fff;
      border-radius: 8px;
      color: #ffffff;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      text-align: center;
      background-color: #fe2042;
    }
  }
</style>
