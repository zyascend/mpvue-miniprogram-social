<template>
  <div class="index-preload">
    <van-skeleton title avatar row="3" class="item"></van-skeleton>
    <van-skeleton title avatar row="3" class="item"></van-skeleton>
    <van-skeleton title avatar row="3" class="item"></van-skeleton>
    <van-skeleton title avatar row="3" class="item"></van-skeleton>
    <van-skeleton title avatar row="3" class="item"></van-skeleton>
  </div>
</template>

<script>
  export default {
    name: 'index-preload'
  }
</script>

<style lang="scss" scoped>
  @import "../assets/mixin";
  .index-preload {
    @include fixedFull;
    @include flex_center;
    flex-direction: column;
    @include wh(100%, 100%);
    z-index: 99;
    background: #ffffff;
    .item {
      @include wh(100%, 20%);
    }
  }
</style>
