<template>
  <div class="container" @click="onClick">
    <img :src="item.user.avaUrl" alt="" class="ava">
    <div class="info">
      <div class="top">
        <div class="name">{{ item.user.nickName }}</div>
        <div class="time">{{ formatedDate }}</div>
      </div>
      <div class="bottom">
        <div class="message">{{ item.lastMessage }}</div>
        <div v-if="item.unreadCount" class="count">{{ formateCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { beautifyTime } from '../utils'
  export default {
    name: 'message-list-item',
    props: {
      item: {
        type: Object,
        default: {
          user: {
            openId: String,
            avaUrl: String,
            nickName: String
          },
          time: Number,
          unreadCount: Number,
          lastMessage: String
        }
      }
    },
    computed: {
      formatedDate() {
        return beautifyTime(this.item.time)
      },
      formateCount() {
        const count = this.item.unreadCount
        if (count > 99) return '99+'
        else return count
      }
    },
    methods: {
      onClick() {
        this.$emit('onClick')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/mixin";
  .container {
    @include wh(100%, 84px);
    box-sizing: border-box;
    padding: 0 16px;
    @include flex_center;
    flex-direction: row;
    .ava {
      @include wh(60px, 60px);
      border-radius: 30px;
      background: center no-repeat;
      background-size: cover;
      margin-right: 15px;
    }
    .info {
      flex: 1;
      height: 100%;
      @include flex_center;
      flex-direction: column;
      .top, .bottom {
        @include wh(100%, auto);
        @include flex_center;
        flex-direction: row;
        justify-content: space-between;
      }
      .top {
        .name {
          color: #0d0e15;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
        }
        .time {
          color: #0d0e15;
          font-size: 12px;
          font-weight: 400;
        }
      }
      .bottom {
        margin-top: 10px;
        .message {
          color: #768196;
          font-size: 14px;
          width: 250px;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .count {
          width: 22px;
          height: 22px;
          background: #fe2042;
          border-radius: 11px;
          color: #ffffff;
          font-size: 10px;
          line-height: 22px;
          text-align: center;
        }
      }
    }
  }
</style>
