<template>
  <div class="container">
    <div class="story">
      <NewStory />
      <NormalStory />
      <NormalStory />
      <NormalStory />
      <NormalStory />
      <NormalStory />
      <NormalStory />
      <NormalStory />
      <NormalStory />
    </div>
    <div class="feed">
      <Post />
      <Post />
      <Post />
    </div>
  </div>
</template>

<script>
  import NewStory from '@/components/new-story'
  import NormalStory from '@/components/normal-story'
  import Post from '@/components/post'

  export default {
    components: {
      NewStory,
      NormalStory,
      Post
    }
  }
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";
.container{
  @include flex_center;
  @include removeScrollbar;
  @include wh(100%, 100%);
  flex-direction: column;
  overflow: hidden;
  .story{
    @include removeScrollbar;
    @include wh(100%, 71px);
    @include flex_center;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
  .feed{
    width: 100%;
    flex: 1;
    @include flex_center;
    @include removeScrollbar;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    overflow-x: hidden;
  }
}
</style>
