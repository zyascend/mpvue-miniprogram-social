<template>
  <div class="container" @click="onclick">
    <div class="line"></div>
    <div class="icon-wrapper">
      <van-icon v-if="showPic" name="photo-o" class="icon" color="#fe2042"></van-icon>
      <van-icon v-else name="like" class="icon" color="#fe2042"></van-icon>
    </div>
    <div :class="showPic ? 'info-wrapper' : 'info-wrapper flex-start'">
      <div class="left">
        <p class="date">{{ today.dateName }}</p>
        <p :class="showPic ? 'title' : 'title-nopic'">{{ today.title }}</p>
      </div>
      <img :src="today.picUrl" v-if="showPic" alt="" class="img">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'today-item',
    props: {
      today: {
        dateName: Number,
        title: Number,
        picUrl: String,
        content: String
      }
    },
    computed: {
      showPic() {
        return !!this.today.picUrl
      }
    },
    methods: {
      onclick() {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/mixin";
  .container {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    .line {
      @include positionTL(absolute, 0, 33px);
      width: 1px;
      height: 100%;
      background-color: #979797;
      z-index: 20;
    }
    .icon-wrapper {
      @include positionTL(absolute, 20px, 20px);
      @include wh(26px, 26px);
      @include flex_center;
      border: #979797 1px solid;
      border-radius: 13px;
      z-index: 21;
      background-color: white;
      .icon {
        @include wh(12px, 12px);
      }
    }
    .info-wrapper {
      width: 100%;
      padding: 10px 16px 10px 72px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .date {
          @include wh(230px, 20px);
          color: #768196;
          font-size: 12px;
          font-weight: 500;
          line-height: 20px;
          margin-bottom: 5px;
        }
        .title {
          @include wh(230px, 40px);
        }
        .title-nopic {
          @include wh(280px, 40px);
        }
        .title, .title-nopic {
          color: #0d0e15;
          font-size: 15px;
          line-height: 20px;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          text-overflow: ellipsis;
          overflow: hidden;
        }

      }
      .img {
        @include wh(60px, 60px);
        background: center no-repeat;
        background-size: cover;
      }
    }
    .flex-start {
      justify-content: flex-start;
    }
  }
</style>
