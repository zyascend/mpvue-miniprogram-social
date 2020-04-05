<template>
  <div>
    <div class="container">
      <div class="story">
        <NewStory @onClick="onNewStoryClick"/>
        <NormalStory
          v-for="story in storys"
          :key="story.postId"
          :story="story"
          @onClick="onNormalStoryClick(story)"
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
    <PageStatus :status="pageStatus" tips="点击左上角发布日记"/>
  </div>
</template>

<script>
  import NewStory from '../../components/new-story'
  import Auth from '../../components/auth'
  import IndexPreload from '../../components/index-preload'
  import NormalStory from '../../components/normal-story'
  import Post from '../../components/post'
  import PageStatus from '../../components/page-status'
  import Dialog from '@vant/weapp/dist/dialog/dialog'
  import {
    getSetting,
    getUserInfo,
    setStorageSync,
    getStorageSync,
    getOpenId
  } from '../../api/wechat'
  import { showToast } from '../../utils'
  import { getAllPosts } from '../../api'
  export default {
    components: {
      NewStory,
      NormalStory,
      Post,
      Auth,
      IndexPreload,
      PageStatus
    },
    data() {
      return {
        storys: [],
        posts: [],
        loading: true,
        authorized: true,
        userInfo: null,
        openId: '',
        pageStatus: null
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
        }
        console.log('getUserInfo...')
        getUserInfo(
          (userInfo) => {
            vue.userInfo = userInfo
            setStorageSync('userInfo', userInfo)
            const openId = getStorageSync('openid')
            if (!openId || openId.length === 0) {
              getOpenId((openId) => {
                onOpenIdComplete(vue, openId, userInfo)
              })
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
        if (!this.openId || !this.authorized) { return }
        const res = await getAllPosts(this.openId)
        this.posts = res.data.posts.filter(p => p.sourceType === 'image')
        if (!this.posts.length) {
          this.pageStatus = 'NODATA'
        } else {
          this.pageStatus = null // null表示正常状态
        }
        this.storys = res.data.posts.filter(p => p.sourceType === 'video')
        mpvue.stopPullDownRefresh()
        let that = this
        that.$nextTick(() => {
          that.loading = false
        })
      },

      onNewStoryClick() {
        this.$router.push('/pages/newpost/main')
      },

      onNormalStoryClick(story) {
        this.$router.push({
          path: '/pages/video/main',
          query: {
            videoUrl: story.sourceUrl,
            title: story.postTextContent,
            avatarUrl: story.user.avaUrl
          }
        })
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
