<template>
  <div class="page-status" @click="onclick" v-if="status">
    <div class="info">
      <img :src="src" alt="" class="img">
      <p class="tips">{{ tips }}</p>
    </div>
  </div>
</template>

<script>
  import PIC_NODATA from '../assets/nodata.png'
  const STATUS = {
    NODATA: 'NODATA'
  }
  export default {
    name: 'page-status',
    props: {
      status: {
        type: String,
        default: null
      },
      tips: String
    },
    computed: {
      src() {
        if (this.status === STATUS.LOADING) return PIC_NODATA
        else return PIC_NODATA
        // if (this.status === STATUS.LOADING) return 'https://qiniu.shyshyshy.icu/image/icon/nodata.png'
        // else return 'https://qiniu.shyshyshy.icu/image/icon/nodata.png'
      }
    },
    mounted() {
      console.log(this.status)
      console.log(this.tips)
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
  .page-status {
    @include fixedFull;
    top: 120px;
    .info {
      @include positionTL(absolute, 35%, 50%);
      transform: translate(-50%, -50%);
      @include flex_center;
      flex-direction: column;
      .img {
        @include wh(160px, 160px);
        @include bg_center;
        margin-bottom: 16px;
      }
      .tips {
        font-size: 18px;
        color: #0d0e15;
      }
    }
  }
</style>
