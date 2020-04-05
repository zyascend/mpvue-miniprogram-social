<template>
  <div class="container">
    <video
      class="video"
      :src="videoUrl"
      show-play-btn
      controls
      autoplay
      show-mute-btn
      show-center-play-btn
      show-fullscreen-btn="false"
      object-fit="contain"
      custom-cache="false">
    </video>
    <div class="info">
      <img :src="avatarUrl" alt="" class="img">
      <div class="title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
  // import { getSetting, authorize, showLoading, hideLoading } from '../../api/wechat'
  export default {
    components: {
    },
    data() {
      return {
        videoUrl: '',
        title: '',
        avatarUrl: '',
        screenWidth: 0,
        screenHeight: 0
      }
    },
    mounted() {
      this.videoUrl = this.$route.query.videoUrl
      this.title = this.$route.query.title
      this.avatarUrl = this.$route.query.avatarUrl

      mpvue.showShareMenu()
      const device = mpvue.getSystemInfoSync()
      this.screenWidth = device.windowWidth
      this.screenHeight = device.windowHeight
    },
    computed: {
    },
    methods: {
      onPlay(e) {
        console.log('onPlay')
        console.log(e)
      }
    },
    onLoad() {
      console.log('[new post] [onLoad]')
      Object.assign(this.$data, this.$options.data())
    }
  }
</script>


<style lang="scss" scoped>
  @import "../../assets/mixin";
  .container{
    @include wh(100%, 100%);
    @include fixedFull;
    background-color: #0d0e15;
    .video-swiper {
      @include wh(100%, 100%);
    }
    .video {
      width: 100%;
      height: 100%;
    }
    .info {
      width: 90%;
      position: absolute;
      bottom: 45px;
      left: 50%;
      transform: translate(-50%);
      @include flex_center;
      flex-direction: row;
      justify-content: flex-start;
      .img {
        @include circlePic(30px);
        @include bg_center;
        margin-right: 15px;
      }
      .title {
        font-size: 18px;
        color: #ffffff;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
