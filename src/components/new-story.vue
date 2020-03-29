<template>
  <div class="container" @click="onClick">
    <div class="icon" ></div>
  </div>
</template>

<script>
  export default {
    name: 'new-story',
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
    width: 60px;
    min-width: 60px;
    height: 60px;
    @include flex_center;
    border-radius: 8px;
    margin-right: 10px;
    margin-left: 16px;
    box-shadow: 0 0 20px rgba(53,73,93,0.2);
    .icon{
      width: 22px;
      height: 22px;
      background: url("../assets/photo.png") center no-repeat;
      background-size: cover;
    }
  }
</style>
