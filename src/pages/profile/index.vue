<template>
  <div class="container-wrapper"  :style="{backgroundImage: 'url(' + backImg + ')'}">
    <div class="container">
      <div class="top">
        <img :src="userInfo ? userInfo.avatarUrl : ''" alt="" class="ava">
        <div class="status">
          <div class="status-item">
            <p class="status-count">0</p>
            <p class="status-name">日记</p>
          </div>
          <div class="status-item">
            <p class="status-count">0</p>
            <p class="status-name">故事</p>
          </div>
          <div class="status-item">
            <p class="status-count">0</p>
            <p class="status-name">视频</p>
          </div>
          <div class="status-item">
            <p class="status-count">0</p>
            <p class="status-name">照片</p>
          </div>
        </div>
      </div>
      <div class="username">{{ userInfo ? userInfo.nickName : '' }}</div>
      <div class="description">写个个人简介吧...</div>
      <div v-if="!isSelf" class="operate-self">
        <div class="value-self">编辑</div>
        <div class="setting-self">
          <van-icon
            name="setting-o"
            class="setting-icon">
          </van-icon>
        </div>
      </div>
      <div v-else class="operate-other">
        <div class="following">关注</div>
        <div class="value">分享</div>
      </div>
      <van-tabs
        animated
        :active="activeTab"
        class="tabs">
        <van-tab title-style="custom-class" title="全部" name="all">
          <div class="empty">
            暂无内容
          </div>
        </van-tab>
        <van-tab title="日记" name="post">
          <div class="empty">
            <span>暂无内容</span>
          </div>
        </van-tab>
        <van-tab title="故事" name="story">
          <div class="empty">
            <span>暂无内容</span>
          </div>
        </van-tab>
        <van-tab title="其他" name="other">
          <div class="empty">
            <span>暂无内容</span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import { getStorageSync } from '../../api/wechat'
  export default {
    components: {
    },
    data() {
      return {
        userInfo: {},
        isSelf: false,
        activeTab: 'all'
      }
    },
    mounted() {
      this.userInfo = getStorageSync('userInfo')
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/mixin";
  .container{
    @include wh(100%, 100%);
    @include fixedFull;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    .top {
      @include wh(100%, auto);
      @include flex_center;
      flex-direction: row;
      justify-content: space-between;
      padding: 16px;
      box-sizing: border-box;
      .ava {
        @include circlePic(60px);
        @include bg_center;
        box-shadow: 0 0 20px rgba(53,73,93,0.38);
      }
      .status {
        @include wh(248px, 45px);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .status-item {
          @include flex_center;
          flex-direction: column;
          .status-count {
            font-size: 16px;
            margin-bottom: 5px;
          }
          .status-name {
            font-size: 12px;
          }
        }
      }
    }
    .username, .description {
      text-overflow: ellipsis;
      overflow: hidden;
      color: #0d0e15;
    }
    .username {
      margin: 10px 0 0 22px;
      max-width: 150px;
      height: 38px;
      font-size: 24px;
      font-weight: 500;
      line-height: 38px;
    }
    .description {
      margin: 10px 0 0 22px;
      @include wh(303px, 38px);
      font-size: 12px;
      line-height: 19px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      display: -webkit-box;
    }
    .operate-self, .operate-other {
      @include wh(337px, 30px);
      margin: 10px 0 0 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    .operate-self {
      .value-self {
        @include wh(297px, 30px);
        background-color: #fe2042;
        color: #ffffff;
        font-size: 12px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        box-shadow: 0 0 20px rgba(53,73,93,0.2);
      }
      .setting-self {
        @include wh(30px, 30px);
        @include flex_center;
        background-color: transparent;
        border: 1px solid #fff;
        border-radius: 5px;
        box-shadow: 0 0 20px rgba(53,73,93,0.2);
        .setting-icon {
          @include wh(16px, 16px);
        }
      }
    }
    .operate-other {
      .following, .value {
        @include wh(163.5px, 30px);
        font-size: 12px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        box-shadow: 0 0 20px rgba(53,73,93,0.2);
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
      margin-top: 20px;
      width: 100%;
      /deep/ .van-hairline--top-bottom:after {
        border: none;
      }
      /deep/ .van-tabs__scroll {
        background-color: transparent !important;
      }
      /deep/ .van-tab--active {
        font-size: 14px;
      }
      /deep/ .van-tab {
        font-size: 14px;
      }
      .empty {
        width: 100%;
        @include flex_center;
        margin-top: 30px;
        font-size: 18px;
      }
    }
  }
</style>
