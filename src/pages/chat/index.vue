<!--:style="{'height': '90%'}"-->
<template>
  <div class="container">
    <scroll-view
      class="scroll-view"
      scroll-y
      :scroll-top="scrolledTop"
      @scrolltoupper="scrolltoupper"
    >
      <div
        v-for="(m, index) in messageList"
        :key="index + m.data"
        :class="m.isSelf ? 'message-isSelf' : 'message-notSelf'">
        <img :src="m.user.avatarUrl" v-if="!m.isSelf" class="ava" alt="">
        <span :class="m.isSelf ? 'text-self' : 'text-notSelf'">
          {{ m.data }}
        </span>
        <img :src="m.user.avatarUrl" v-if="m.isSelf" class="ava" alt="">
      </div>
    </scroll-view>
    <div class="input-wrapper">
      <van-icon name="volume-o" class="icon"></van-icon>
      <input
        confirm-type="send"
        @confirm="sendMessage"
        class="input"
        v-model="textContent"
      />
      <van-icon name="smile-o" class="icon"></van-icon>
      <van-icon name="add-o" class="icon" @click="onShowBottom"></van-icon>
    </div>
    <div v-if="showBottom" class="bottom">
      bottom
    </div>
  </div>
</template>

<script>
  // import RemindItem from '../../components/remind-item'
  // import { REMIND } from '../../utils/mockDataFactory.js'

  export default {
    components: {
      // RemindItem
    },
    data() {
      return {
        nickName: 'HHHHHHHH',
        showBottom: false,
        textContent: '',
        scrolledTop: 0,
        messageList: []
      }
    },
    methods: {
      scrolltoupper() {
        console.log('scrolltoupper')
      },
      onShowBottom() {
        this.showBottom = !this.showBottom
      },
      sendMessage(v) {
        const msg = v.mp.detail.value
        if (msg) {
          this.messageList.push({
            type: 'text',
            data: v.mp.detail.value,
            isSelf: (Math.floor((Math.random() * 10) + 1)) % 2 === 0,
            user: {
              nickName: 'SANA',
              avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg'
            }
          })
        }
        this.textContent = ''
        mpvue.hideKeyboard()
        this.$nextTick(() => {
          // 数字要足够大，保证滚动到最底部
          // 必须保证每次设置的scrolledTop不同 mpvue才会更新它
          this.scrolledTop = 5000 + this.messageList.length
        })
      }
    },
    mounted() {
      console.log('this.$router.query')
      console.log(this.$route.query)
      // this.nickName = this.$route.query.nickName
    }
  }
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";
.container{
  @include flex_center;
  @include wh(100%, 100%);
  @include fixedFull;
  flex-direction: column;
  overflow: hidden;
  .scroll-view{
    width: 100%;
    flex: 1;
    @include flex_center;
    flex-direction: column;
    justify-content: flex-start;
    overflow-x: hidden;
    background-color: #eee;
    .message-isSelf, .message-notSelf {
      width: 100%;
      @include flex_center;
      align-items: flex-start;
      flex-direction: row;
      .text-self, .text-notSelf {
        max-width: 200px;
        padding: 5px 8px;
        display: inline-block;
        border-radius: 4px;
        margin: 10px 0;
        position: relative;
        word-wrap: break-word;
        word-break: break-all;
        margin-top: 15px;
      }
      .text-self {
        color: #000;
        background-color: #fff;
        margin-right: 10px;
        &:after {
          content: '';
          border: 8px solid #ffffff00;
          border-left: 8px solid #ffffff;
          position: absolute;
          top: 6px;
          right: -14px;
        }
      }
      .text-notSelf {
        color: #fff;
        background-color: #FE2042;
        margin-left: 10px;
        &:after {
          content: '';
          border: 8px solid #FE204200;
          border-right: 8px solid #FE2042;
          position: absolute;
          top: 6px;
          left: -14px;
        }
      }
      .ava {
        margin: 10px 10px 0 10px;
        @include bg_center;
        @include wh(40px, 40px)
      }
    }
    .message-isSelf {
      justify-content: flex-end;
    }
    .message-notSelf {
      justify-content: flex-start
    }
  }
  .input-wrapper {
    @include wh(100%, auto);
    @include flex_center;
    flex-direction: row;
    padding: 5px;
    box-sizing: border-box;
    .icon {
      @include wh(22px, 22px);
      margin-right: 5px;
      &:last-child {
        margin-right: 0;
      }
    }
    textarea {
      height: 0;
    }
    .input {
      flex: 1;
      min-height: 25px;
      line-height: 25px;
      font-size: 15px;
      overflow-y: visible;
      overflow-x: hidden;
      padding: 5px;
      background: #f3f4f6;
    }
  }
}
</style>
