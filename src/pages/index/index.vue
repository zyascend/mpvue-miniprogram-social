<template>
  <div class="container">
    <div class="story">
      <NewStory @onClick="onNewStoryClick"/>
      <NormalStory
        v-for="story in storys"
        :key="story.id"
        :story="story"
        @onClick="onNormalStoryClick(story.id)"
      />
    </div>
    <div class="feed">
      <Post
        v-for="post in posts"
        :key="post.postId"
        :post="post"
        @onMoreClick="onPostMoreClick(post.postId)"
        @onUserClick="onPostUserClick(post.user)"
        @onPicClick="onPostPicClick(post.postId)"
        @onStarClick="onPostStarClick(post.postId)"
      />
    </div>
    <van-dialog id="van-dialog"></van-dialog>
  </div>
</template>

<script>
  import NewStory from '../../components/new-story'
  import NormalStory from '../../components/normal-story'
  import Post from '../../components/post'
  import Dialog from '@vant/weapp/dist/dialog/dialog'
  import { STORYS, POSTS } from '../../utils/mockDataFactory.js'

  export default {
    components: {
      NewStory,
      NormalStory,
      Post
    },
    data() {
      return {
        storys: STORYS,
        posts: POSTS
      }
    },
    methods: {
      onNewStoryClick() {
        this.$router.push('/pages/newpost/main')
      },
      onNormalStoryClick(id) {
        this.dialogAlert(`跳转Story id = ${id}`)
      },
      onPostMoreClick(id) {
        this.dialogAlert(`post more id = ${id}`)
      },
      onPostUserClick(user) {
        this.dialogAlert(`跳转User name = ${user.userName}`)
      },
      onPostPicClick(id) {
        this.dialogAlert(`post pic id = ${id}`)
      },
      onPostStarClick(id) {
        this.dialogAlert(`post star id = ${id}`)
      },
      dialogAlert(text) {
        Dialog.alert({
          message: text
        }).then(() => {
          console.log('closed')
        })
      }
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
