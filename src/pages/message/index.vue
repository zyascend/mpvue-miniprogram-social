<template>
  <div class="container">
    <div class="feed">
      <MessageListItem
        v-for="item in messages"
        :key="item.user.nickName"
        @onClick="jumpToChat(item)"
        :item="item" />
    </div>
  </div>
</template>

<script>
  import MessageListItem from '../../components/message-list-item'
  import { getStorageSync } from '../../api/wechat'

  export default {
    components: {
      MessageListItem
    },
    data() {
      return {
        messages: []
      }
    },
    mounted() {
      this.messages.push(
        {
          user: getStorageSync('userInfo'),
          time: new Date().getTime(),
          unreadCount: 1,
          lastMessage: '跟自己聊聊天...'
        }
      )
      this.setMessageCount()
    },
    methods: {
      jumpToChat(message) {
        this.$router.push({
          path: '/pages/chat/main',
          query: {
            nickName: message.user.nickName
          }
        })
      },
      setMessageCount() {
        let count = 0
        this.messages.forEach(i => {
          count += i.unreadCount
        })
        if (count > 99) count = '99+'
        mpvue.setTabBarBadge({
          index: 2,
          text: count
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";
.container{
  @include flex_center;
  @include wh(100%, 100%);
  flex-direction: column;
  overflow: hidden;
  .feed{
    width: 100%;
    flex: 1;
    @include flex_center;
    flex-direction: column;
    justify-content: flex-start;
    overflow-x: hidden;
  }
}
</style>
