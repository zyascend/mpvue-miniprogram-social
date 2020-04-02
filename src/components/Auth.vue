<template>
  <div class="authorized">
    <div class="auth-wrapper">
      <img class="auth-img" alt="" src="http://qiniu.shyshyshy.icu/image/zysocial/zsociallogo.png"/>
      <div class="auth-text">登录zSocial</div>
      <div class="auth-strong-text">解锁完整功能</div>
      <button
        class="auth-btn"
        @getuserinfo="getUserInfo"
        open-type="getUserInfo"
        plain="true"
      >
        授权登录
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      getUserInfo(res) {
        this.$emit('getUserInfo', res)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/mixin";
  .authorized {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    @include flex_center;
    @include wh(100%, 100%);
    background: #999999;

    .auth-wrapper {
      position: relative;
      background: #fff;
      @include flex_center;
      @include wh(300px, auto);
      flex-direction: column;
      border-radius: 8px;
      .auth-img {
        width: 130px;
        height: 130px;
        margin: 20px 0 20px 0;
        background: center no-repeat;
        background-size: cover;
      }
      .auth-text {
        margin-bottom: 15px;
        font-size: 13px;
        color: #999;
      }
      .auth-strong-text {
        font-size: 16px;
        color: #333;
        font-weight: 500;
        margin-bottom: 20px;
      }
      .auth-btn {
        @include wh(100%, 56px);
        line-height: 56px;
        font-size: 15px;
        font-weight: 500;
        background: linear-gradient(-69deg, #FF9509, #FE2042);
        color: #fff;
        border: none;
        border-radius: 0 0 8px 8px;
      }
    }
  }
</style>
