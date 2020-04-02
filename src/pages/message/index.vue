<template>
  <div class="container">
    <div class="feed">
      <MessageListItem
        v-for="item in messages"
        :key="item.user.openId"
        @onClick="jumpToChat(item)"
        :item="item" />
    </div>
  </div>
</template>

<script>
  import MessageListItem from '../../components/message-list-item'
  import { MESSAGE } from '../../utils/mockDataFactory.js'

  export default {
    components: {
      MessageListItem
    },
    data() {
      return {
        messages: MESSAGE
      }
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
    },
    mounted() {
      this.setMessageCount()
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
