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
      <div class="recommend">
        <p class="title">试试这些</p>
        <div class="explore">
          <div class="item" @click="onTodayClick"><span>历史上的今天</span></div>
          <div class="item" @click="onGridClick"><span>9宫切图</span></div>
        </div>
      </div>
    </div>
    <div v-show="searched" class="searched">
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
  import Post from '../../components/post'
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
        activeTab: 'all',
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
      },
      onGridClick() {
        this.$router.push('/pages/grid/main')
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
  }
</style>
