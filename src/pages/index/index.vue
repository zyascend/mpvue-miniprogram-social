<template>
  <div>
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
    <Auth v-if="!authorized" @getUserInfo="handleGetUserInfo"></Auth>
    <IndexPreload v-if="loading" />
  </div>
</template>

<script>
  import NewStory from '../../components/new-story'
  import Auth from '../../components/auth'
  import IndexPreload from '../../components/index-preload'
  import NormalStory from '../../components/normal-story'
  import Post from '../../components/post'
  import Dialog from '@vant/weapp/dist/dialog/dialog'
  import { STORYS } from '../../utils/mockDataFactory.js'
  import {
    getSetting,
    getUserInfo,
    setStorageSync,
    getStorageSync
  } from '../../api/wechat'
  import { showToast } from '../../utils'
  import { getAllPosts } from '../../api'
  export default {
    components: {
      NewStory,
      NormalStory,
      Post,
      Auth,
      IndexPreload
    },
    data() {
      return {
        storys: STORYS,
        posts: [],
        loading: true,
        authorized: true,
        userInfo: null
      }
    },
    mounted() {
      this.init()
    },
    onShow() {
      this.getHomeData()
    },
    onPullDownRefresh () {
      this.getHomeData()
    },
    onReachBottom() {
      console.log('onReachBottom')
    },
    methods: {
      init() {
        this.getSetting() // 判断是否已经具备获取用户信息权限
      },

      getSetting() {
        this.loading = true
        const vue = this
        // 判断当前小程序是否具备userInfo权限
        getSetting(
          'userInfo',
          (res) => {
            console.log('验证成功...', res)
            vue.authorized = true
            vue.getUserInfo()
          },
          (res) => {
            console.log('验证失败...', res)
            vue.authorized = false
          }
        )
      },
      getUserInfo() {
        const vue = this
        const onOpenIdComplete = (vue, openId, userInfo) => {
          vue.openId = openId
          // 获取首页数据
          vue.getHomeData()
          // TODO 上报用户信息，注册账号
        }
        console.log('getUserInfo...')
        getUserInfo(
          (userInfo) => {
            vue.userInfo = userInfo
            setStorageSync('userInfo', userInfo)
            const openId = getStorageSync('openId')
            console.log('openId', openId)
            if (!openId || openId.length === 0) {
              // getOpenId((openId) => {
              //   onOpenIdComplete(vue, openId, userInfo)
              // })
              onOpenIdComplete(vue, openId, userInfo)
            } else {
              onOpenIdComplete(vue, openId, userInfo)
            }
          },
          (err) => {
            console.log('getUserInfo failed', err)
          }
        )
      },

      handleGetUserInfo(res) {
        const { mp: { detail: { errMsg } } } = res
        if (errMsg === 'getUserInfo:ok') {
          this.init()
        } else {
          showToast('授权失败，请重试')
        }
      },

      async getHomeData() {
        const res = await getAllPosts()
        this.posts = res.data.posts
        mpvue.stopPullDownRefresh()
        let that = this
        that.$nextTick(() => {
          that.loading = false
        })
      },

      onNewStoryClick() {
        this.$router.push('/pages/newpost/main')
      },

      onNormalStoryClick(id) {
        this.dialogAlert(`跳转Story id = ${id}`)
      },

      onPostMoreClick(id) {
      },

      onPostUserClick(user) {
        mpvue.switchTab({
          url: '/pages/profile/main'
        })
      },

      onPostPicClick(id) {
      },

      onPostStarClick(id) {
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
