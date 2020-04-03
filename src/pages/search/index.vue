<template>
  <div class="container">
    <van-search
      class="custom-search"
      v-model="searchValue"
      @change="onSearchChange"
      @clear="onSearchClear"
      @search="onSearch"
      placeholder="请输入搜索关键词">
    </van-search>
    <div v-show="!searched" class="nosearch">
      <div class="recent-search">
        <p class="title">最近搜索</p>
        <div class="item" v-for="s in recentSearches" :key="s" @click="onRecentSearchClick(s)">
          <van-icon name="search" class="icon"></van-icon>
          <p class="text">{{ s }}</p>
        </div>
      </div>
      <div class="recommend">
        <p class="title">试试这些</p>
        <div class="explore">
          <div class="item" @click="onTodayClick"><span>历史上的今天</span></div>
        </div>
      </div>
    </div>
    <div v-show="searched" class="searched">
      <van-tabs
        animated
        :active="activeTab"
        class="tabs">
        <van-tab title="All" name="all">
          All
        </van-tab>
        <van-tab title="Posts" name="posts">
          Posts
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
  // import Dialog from '@vant/weapp/dist/dialog/dialog'
  import { POSTS } from '../../utils/mockDataFactory.js'

  export default {
    components: {
      Post
    },
    data() {
      return {
        searchValue: '',
        searched: false,
        recentSearches: ['SANA', '小程序'],
        activeTab: 'all ',
        searchedPosts: POSTS
      }
    },
    computed: {
    },
    methods: {
      onRecentSearchClick(text) {
        console.log(text)
      },
      onSearchChange(event) {
        this.searchValue = event.detail
      },
      onSearchClear() {
        this.searchValue = ''
        this.searched = false
      },
      onSearch(event) {
        this.searched = true
      },
      onTodayClick() {
        mpvue.switchTab({
          url: '/pages/remind/main'
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/mixin";
  .container{
    @include wh(100%, 100%);
    display: flex;
    position: relative;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 16px;
    box-sizing: border-box;
    /deep/ .van-search__content {
      border-radius: 8px;
    }
    /deep/ .van-search {
      padding: 0;
    }
    /deep/ .van-field__input {
      font-size: 16px;
    }
    .custom-search {
      width: 100%;
      margin-bottom: 10px;
    }
    .nosearch {
      .recent-search {
        .title {
          @include wh(100%, 20px);
          color: #768196;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin-bottom: 10px;
        }
        .item {
          @include wh(100%, auto);
          @include flex_center;
          flex-direction: row;
          justify-content: flex-start;
          margin-bottom: 8px;
          .icon {
            @include wh(13px, 13px);
            margin-right: 10px;
          }
          .text {
            font-size: 14px;
          }
        }
      }
      .recommend {
        @include wh(100%, auto);
        @include flex_center;
        flex-direction: column;
        align-items: flex-start;
        .title {
          @include wh(100%, 20px);
          color: #768196;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin-bottom: 15px;
          margin-top: 10px;
        }
        .explore {
          @include wh(100%, auto);
          @include flexStart;
          .item {
            @include wh(160px, 120px);
            @include flex_center;
            margin-right: 20px;
            text-align: center;
            font-size: 18px;
            color: #FFFFFF;
            border-radius: 10px;
            background: linear-gradient(-69deg, #FF9509, #FE2042);
            &:nth-child(even) {
              margin-right: 0;
            }
          }
        }
      }
    }
    .searched {
      @include wh(100%, auto);
      .tabs {
        @include wh(100%, auto);
      }
    }
  }
</style>
