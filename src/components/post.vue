<template>
  <div class="container">
    <div class="top">
      <img src="http://qiniu.shyshyshy.icu/image/sana/1585392633511_0" alt="" class="ava">
      <div class="name">ZYASCEND</div>
      <div class="post-info">
        <p class="date">30分钟前</p>
        <van-icon name="location-o" class="icon" color="#9da4b3"></van-icon>
        <p class="location">当前位置</p>
      </div>
      <van-icon name="ellipsis" class="more" color="#0d0e15"></van-icon>
    </div>
    <p class="content">这是Post的Content这是Post的Content,这是Post的Content这是Post的Content,这是Post的Content这是Post的Content</p>
    <img src="http://qiniu.shyshyshy.icu/image/other/1585392688603_3XVmQA.jpg" alt="" class="img">
    <div class="bottom">
      <div class="left">
        <van-icon class="icon" name="like-o"></van-icon>
        <p>500</p>
        <van-icon class="icon" name="comment-o"></van-icon>
        <p>20</p>
        <van-icon class="icon" name="replay"></van-icon>
      </div>
      <van-icon class="star" name="star-o"></van-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'post'
  }
</script>

<style lang="scss" scoped>
  @import "../assets/mixin";
  .container {
    width: 375px;
    height: auto;
    @include flex_center;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 15px;
    padding-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(53,73,93,0.2);
    .top {
      position: relative;
      @include wh(100%, 60px);
      .ava {
        @include positionTL(absolute, 16px, 16px);
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background: no-repeat center;
        background-size: cover;
      }
      .name {
        @include positionTL(absolute, 16px, 68px);
        height: 20px;
        color: #0d0e15;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      }
      .post-info {
        @include positionTL(absolute, 39px, 68px);
        height: 20px;
        @include flex_center;
        flex-direction: row;
        justify-content: flex-start;
        font-size: 12px;
        font-weight: 400;
        line-height: 19px;
        .date {
          color: #768196;
          height: 19px;
        }
        .icon {
          @include wh(12px, 12px);
          margin-left: 5px;
        }
        .location {
          color: #0d0e15;
          height: 19px;
        }
      }
      .more {
        @include positionTL(absolute, 18px, 343px);
        @include wh(16px, 16px);
      }
    }
    .content {
      @include wh(345px, auto);
      max-height: 140px;
      margin: 15px 16px 0 16px;
      color: #0d0e15;
      word-wrap: break-word;
      word-break: break-all;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 7;
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .img {
      @include wh(100%, 246px);
      background: no-repeat center;
      background-size: cover;
      margin-top: 15px;
    }
    .bottom {
      margin: 15px 16px 15px 16px;
      width: 100%;
      position: relative;
      .left {
        @include positionTL(absolute, 0, 0);
        @include flex_center;
        flex-direction: row;
        justify-content: flex-start;
        .icon {
          @include flex_center;
          @include wh(22px, 22px);
          margin-right: 5px;
        }
        &>p {
          height: 20px;
          color: #0d0e15;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin-right: 5px;
        }
      }
      .star {
        @include flex_center;
        position: absolute;
        @include positionTL(absolute, 0, 321px);
        @include wh(22px, 22px);
      }
    }
  }
</style>
