<template>
  <div class="container">
    <div class="top">
      <div class="user">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" class="ava">
        <p class="name">@zyascend</p>
      </div>
      <van-button type="info" class="custom-class">发布</van-button>
    </div>
    <div class="input-wrapper">
      <label>
        <textarea
          class="input"
          maxlength="100"
          v-model="textContent"
          placeholder="说点什么..." >
        </textarea>
      </label>
      <span class="count">{{ currentTextLength }}/100</span>
    </div>
    <div class="pics-uploader">
      <div
        class="pic-wrapper"
        v-for="file in fileList"
        :key="file.url"
      >
        <img :src="file.url" alt="" class="pic" @click="operateImg(file.url)">
        <van-icon name="clear" class="delete" @click="deletePic(file.url)"></van-icon>
      </div>
      <div class="uploader" @click="chooseImg" v-if="showUpload">
        <van-icon name="photo-o" class="icon"></van-icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        textContent: '',
        fileList: []
      }
    },
    computed: {
      currentTextLength() {
        return this.textContent.length
      },
      showUpload() {
        return !this.fileList.length
      },
      fileUrls() {
        const urls = []
        this.fileList.forEach(i => {
          urls.push(i.url)
        })
        return urls
      }
    },
    methods: {
      chooseImg() {
        mpvue.chooseImage({
          count: 1,
          success: res => {
            const tempFilePaths = res.tempFilePaths
            tempFilePaths.forEach(url => {
              this.fileList.push({
                url
              })
            })
          },
          fail: () => {
            console.log('mpvue.chooseImage: failed')
          },
          complete: () => {
            console.log('mpvue.chooseImage: completed')
          }
        })
      },
      deletePic(url) {
        this.fileList = this.fileList.filter(i => i.url !== url)
      },
      operateImg(url) {
        console.log(url)
        mpvue.showActionSheet({
          itemList: ['预览', '删除'],
          success: (res) => {
            if (res.tapIndex === 0) {
              console.log(url)
              console.log(this.fileUrls)
              wx.previewImage({
                current: url, // 当前显示图片的http链接
                urls: this.fileUrls // 需要预览的图片http链接列表
              })
            } else {
              this.deletePic(url)
            }
          }
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
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px 15px 10px 15px;
    box-sizing: border-box;
    .top{
      width: 100%;
      @include flex_center;
      flex-direction: row;
      justify-content: space-between;
      .user {
        @include flex_center;
        flex-direction: row;
        justify-content: flex-start;
        .ava {
          @include wh(40px, 40px);
          border-radius: 20px;
          background: no-repeat center;
          background-size: cover;
        }
        .name {
          color: #0d0e15;;
          font-size: 16px;
          margin-left: 15px;
        }
      }
      /deep/ .van-button {
        @include wh(60px, 30px);
      }
    }
    .input-wrapper {
      width: 100%;
      /*min-height: 30px;*/
      margin-top: 20px;
      position: relative;
      .input {
        width: 100%;
        font-size: 18px;
        margin-bottom: 10px;
        overflow: hidden;
        resize: none;
      }
      .count {
        @include positionBR(absolute,0px,0px);
        font-size: 13px;
      }
    }
    .pics-uploader {
      width: 100%;
      margin-top: 15px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-flow: row wrap;
      .pic-wrapper {
        @include wh(70px, 70px);
        position: relative;
        margin-right: 15px;
        margin-bottom: 15px;
        .pic {
          @include wh(100%, 100%);
          @include bg_center;
        }
        .delete {
          position: absolute;
          top: -8px;
          right: -8px;
          @include wh(16px, 16px)
        }
      }
      .uploader {
        @include wh(70px, 70px);
        @include flex_center;
        box-sizing: border-box;
        border: 1px #768196 dotted;
        .icon {
          @include wh(20px, 20px);
        }
      }
    }
  }
</style>
