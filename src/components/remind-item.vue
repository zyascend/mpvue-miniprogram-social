<template>
  <div class="container">
    <div class="line"></div>
    <div class="icon-wrapper">
      <van-icon v-if="remind.type === 1" name="friends-o" class="icon"></van-icon>
      <van-icon v-else-if="remind.type === 2" name="comment-o" class="icon"></van-icon>
      <van-icon v-else name="like" class="icon" color="#fe2042"></van-icon>
    </div>
    <div class="info-wrapper">
      <div class="action">{{ remind.action }}</div>
      <div class="text-content" v-if="remind.type === 2">{{ remind.textContent }}</div>
      <div class="pic-wrapper" v-if="remind.type === 3">
        <img
          class="pic"
          v-for="(pic, index) in remind.pics"
          :src="pic.url"
          :key="index"
          alt=""
        >
        <div class="place"></div>
      </div>
      <div class="time">{{ formatedDate }}</div>
    </div>
  </div>
</template>

<script>
  import { beautifyTime } from '../utils'
  export default {
    name: 'remind-item',
    props: {
      remind: {
        type: Object,
        default: {
          id: Number,
          type: Number,
          time: String,
          action: String,
          textContent: String,
          pics: Array
        }
      }
    },
    computed: {
      formatedDate() {
        return beautifyTime(this.remind.time)
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
      z-index: 99;
    }
    .icon-wrapper {
      @include positionTL(absolute, 10px, 20px);
      @include wh(26px, 26px);
      @include flex_center;
      border: #979797 1px solid;
      border-radius: 13px;
      z-index: 100;
      background-color: white;
      .icon {
        @include wh(12px, 12px);
      }
    }
    .info-wrapper {
      width: 100%;
      padding-left: 72px;
      @include flex_center;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .action, .text-content {
        @include wh(288px, 20px);
        color: #0d0e15;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 5px;
      }
      .pic-wrapper {
        width: 100%;
        height: 60px;
        @include flex_center;
        flex-flow: row nowrap;
        justify-content: flex-start;
        overflow-x: auto;
        overflow-y: hidden;
        margin-bottom: 5px;
        @include removeScrollbar;
        .pic {
          flex:none;
          @include wh(60px, 60px);
          min-width: 60px;
          background: center no-repeat;
          background-size: cover;
          border-radius: 8px;
          margin-right: 10px;
        }
        .place {
          flex:none;
          width: 70px;
          height: 60px;
        }
      }
      .time {
        @include wh(288px, 20px);
        color: #768196;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        margin-bottom: 10px;
      }
    }
  }
</style>
