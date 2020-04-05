<template>
  <div class="container" @click="onClick">
    <img class="pic" alt="" :src="story.user.avatarUrl"/>
    <img class="ava" alt="" :src="story.user.avatarUrl"/>
    <div class="live">视频</div>
  </div>
</template>

<script>
  export default {
    name: 'normal-story',
    props: {
      story: {
        type: Object,
        default: {
          user: {
            openId: String,
            avatarUrl: String,
            nickName: String
          },
          postId: String,
          sourceType: String,
          postDate: String,
          postLocation: String,
          postTextContent: String,
          sourceUrl: String,
          postLikeCount: Number,
          postCommentCount: Number
        }
      }
    },
    methods: {
      onClick() {
        this.$emit('onClick')
      }
    }
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
