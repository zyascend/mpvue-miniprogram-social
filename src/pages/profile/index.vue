<template>
  <div class="container-wrapper"  :style="{backgroundImage: 'url(' + backImg + ')'}">
    <div class="container">
      <div class="surname">ZYASCEND</div>
      <div class="username">@zyascend</div>
      <div class="description">A frontend programmer</div>
      <div class="status">
        <div class="status-item">
          <p class="status-count">520</p>
          <p class="status-name">Posts</p>
        </div>
        <div class="status-item">
          <p class="status-count">60</p>
          <p class="status-name">Photos</p>
        </div>
        <div class="status-item">
          <p class="status-count">5200</p>
          <p class="status-name">Followers</p>
        </div>
        <div class="status-item">
          <p class="status-count">3</p>
          <p class="status-name">Following</p>
        </div>
      </div>
      <div v-if="isSelf" class="operate-self">
        <div class="value-self">Value</div>
        <div class="setting-self">
          <van-icon
            name="setting-o"
            class="setting-icon"
            color="#ffffff">
          </van-icon>
        </div>
      </div>
      <div v-else class="operate-other">
        <div class="following">Follow</div>
        <div class="value">Value</div>
      </div>
      <van-tabs
        animated
        :active="activeTab"
        class="tabs">
        <van-tab title-style="custom-class" title="Posts" name="posts">
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
        </van-tab>
        <van-tab title="Photos" name="photos">
          Photos
        </van-tab>
        <van-tab title="Videos" name="videos">
          Videos
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import Post from '../../components/post'
  import Dialog from '@vant/weapp/dist/dialog/dialog'
  import { STORYS, POSTS } from '../../utils/mockDataFactory.js'

  export default {
    components: {
      Post
    },
    data() {
      return {
        storys: STORYS,
        posts: POSTS,
        isSelf: false,
        backImg: 'https://s2.ax1x.com/2020/03/05/37cwLt.jpg',
        activeTab: 'posts'
      }
    },
    methods: {
      onPostMoreClick(id) {
        this.dialogAlert(`post more id = ${id}`)
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
  .container-wrapper {
    @include wh(100%, 100%);
    position: absolute;
    overflow: hidden;
    background: center no-repeat;
    background-size: cover;
    .container{
      @include wh(100%, 100%);
      display: flex;
      position: relative;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
      .surname, .username, .description {
        color: #ffffff;

        text-overflow: ellipsis;
        overflow: hidden;
      }
      .surname {
        margin: 180px 0 0 36px;
        @include wh(303px, 44px);
        font-size: 34px;
        line-height: 44px;
      }
      .username {
        margin: 15px 0 0 36px;
        max-width: 150px;
        height: 26px;
        font-size: 16px;
        line-height: 26px;
      }
      .description {
        margin: 15px 0 0 36px;
        @include wh(303px, 38px);
        font-size: 12px;
        line-height: 19px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        display: -webkit-box;
      }
      .status {
        margin: 15px 0 0 36px;

        @include wh(278px, 45px);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .status-item {
          @include flex_center;
          flex-direction: column;
          .status-count {
            color: #ffffff;
            font-size: 16px;
            margin-bottom: 5px;
          }
          .status-name {
            color: #ffffff;
            font-size: 12px;
          }
        }
      }
      .operate-self, .operate-other {
        @include wh(300px, 30px);
        margin: 15px 0 0 36px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .operate-self {
        .value-self {
          @include wh(257px, 30px);
          background: #ffffff;
          color: #0d0e15;
          font-size: 12px;
          line-height: 30px;
          text-align: center;
          border-radius: 5px;
        }
        .setting-self {
          @include wh(30px, 30px);
          @include flex_center;
          background-color: transparent;
          border: 1px solid #fff;
          border-radius: 5px;
          .setting-icon {
            @include wh(16px, 16px);
          }
        }
      }
      .operate-other {
        .following, .value {
          @include wh(144px, 30px);
          font-size: 12px;
          line-height: 30px;
          text-align: center;
          border-radius: 5px;
        }
        .following {
          background-color: #fe2042;
          color: #ffffff;
        }
        .value {
          background-color: #ffffff;
          color: #0d0e15;
        }
      }
      .tabs {
        @include positionTL(absolute, 435px, 0);
        width: 100%;
        /deep/ .van-hairline--top-bottom:after {
          border: none;
        }
        /deep/ .van-tabs__scroll {
          background-color: transparent !important;
        }
        /deep/ .van-tab--active {
          color: white;
          font-size: 14px;
        }
        /deep/ .van-tab {
          color: white;
          font-size: 14px;
        }
        .feed{
          width: 100%;
          @include flex_center;
          @include removeScrollbar;
          flex-direction: column;
          justify-content: flex-start;
          overflow-x: hidden;
          background-color: white;
        }
      }
    }
  }
</style>
