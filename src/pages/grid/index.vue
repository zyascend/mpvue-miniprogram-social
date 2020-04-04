<template>
  <div class="container">
    <canvas
      v-if="!isCutFinished"
      canvas-id="myCanvas"
      class="canvas"
      :style="{width: width + 'px', height: height+'px'}">
    </canvas>
    <div class="info">
      <div v-if="!urls.length" class="place-holder" @click="uploadPic">
        <van-icon name="photo-o" class="icon" color="#333333"></van-icon>
      </div>
      <div v-if="urls.length" class="pics">
        <img
          v-for="url in urls"
          :key="url"
          :src="url" alt=""
          :style="{width: showWH.w + 'px', height: showWH.h + 'px'}"
          class="item">
      </div>
      <div class="btn-wrapper">
        <div @click="uploadPic" class="btn"><span>上传</span></div>
        <div @click="downloadAll" class="btn"><span>全部下载</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSetting, authorize, showLoading, hideLoading } from '../../api/wechat'
  export default {
    components: {
    },
    data() {
      return {
        width: 0,
        height: 0,
        screenWidth: 0,
        screenHeight: 0,
        urls: [],
        originFilePath: '',
        isCutting: true,
        isCutFinished: false
      }
    },
    mounted() {
      mpvue.showShareMenu()
      const device = mpvue.getSystemInfoSync()
      this.width = device.windowWidth
      this.height = device.windowHeight
      this.screenWidth = device.windowWidth
      this.screenHeight = device.windowHeight
    },
    computed: {
      showWH() {
        const showW = this.screenWidth / 3 - 20
        const showH = showW / this.width * this.height
        return {
          w: showW,
          h: showH
        }
      }
    },
    methods: {
      uploadPic() {
        this.isCutFinished = false
        mpvue.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: res => {
            const imgSize = res.tempFiles[0].size
            console.log(res, imgSize, '-->图片大小')
            if (imgSize > 3000000) {
              mpvue.showModal({
                title: '提示:',
                content: '图片最大不能超过3M',
                showCancel: false
              })
              return
            }
            // 清除画布
            const ctx = mpvue.createCanvasContext('myCanvas')
            ctx.draw()
            // 获取图片信息
            mpvue.getImageInfo({
              src: res.tempFilePaths[0],
              success: imgInfo => {
                console.log(imgInfo, 'imgInfo')
                const imgW = imgInfo.width
                const imgH = imgInfo.height
                this.width = imgW
                this.height = imgH
                ctx.drawImage(res.tempFilePaths[0], 0, 0, imgW, imgH)
                ctx.draw()
                // 切割图片
                this.showCutImage()
              },
              fail: () => {
                mpvue.showModal({
                  title: '提示:',
                  content: '暂不支持此图片格式',
                  showCancel: false
                })
              }
            })
          },
          fail: err => {
            console.log(err, '图片选择失败')
          }
        })
      },
      showCutImage() {
        let count = 0
        let imgUrls = []
        const cutW = this.width / 3
        const cutH = this.height / 3
        const config = {
          x: 0,
          y: 0,
          width: cutW,
          height: cutH,
          destWidth: cutW,
          destHeight: cutH,
          canvasId: 'myCanvas'
        }
        let x = 0
        let y = 0
        const timer = setInterval(() => {
          if (this.isCutting) {
            this.isCutting = false
            x = count < 3 ? count : count % 3
            y = Math.floor(count / 3)
            console.log(x, y)
            config.x = cutW * x
            config.y = cutH * y
            let that = this
            mpvue.canvasToTempFilePath({
              ...config,
              success: (res) => {
                that.isCutting = true
                count++
                mpvue.showLoading({
                  title: `裁剪中: ${count}/9`,
                  mask: true
                })
                imgUrls.push(res.tempFilePath)
                if (count === 9) {
                  mpvue.hideLoading()
                  console.log('ALL DONE')
                  console.log(imgUrls)
                  that.isCutFinished = true
                  that.urls = imgUrls
                  clearInterval(timer)
                }
              },
              fail: (err) => {
                console.log(err, '剪切图片失败')
              }
            })
          }
        }, 100)
      },
      downloadAll() {
        let vue = this
        getSetting('writePhotosAlbum',
          () => {
            // 已经具有写入相册的权限
            this.doDownload()
          }, () => {
            // 没有写入相册的权限
            authorize('writePhotosAlbum', () => {
              // 授权权限成功
              this.doDownload()
            }, () => {
              // 授权权限失败
              mpvue.showModal({
                title: '提示',
                content: '需要获取相册权限',
                success: (resOpenSetting) => {
                  if (resOpenSetting.confirm) {
                    mpvue.openSetting({
                      success: (res) => {
                        if (res.authSetting['scope.writePhotosAlbum']) {
                          vue.doDownload()
                        } else {
                          wx.showModal({
                            title: '温馨提示',
                            content: '未获取到授权信息',
                            showCancel: false
                          })
                        }
                      }
                    })
                  }
                },
                fail: () => {
                  wx.showModal({
                    title: '温馨提示',
                    content: '未获取到授权信息',
                    showCancel: false
                  })
                }
              })
            })
          })
      },
      doDownload() {
        if (!this.urls.length) {
          mpvue.showModal({
            title: '提示:',
            content: '请先上传图片',
            showCancel: false
          })
          return
        }
        showLoading({title: '下载中'})
        for (let i = 0; i < this.urls.length; i++) {
          mpvue.saveImageToPhotosAlbum({
            filePath: this.urls[i],
            success: () => {
              if (i === this.urls.length - 1) {
                hideLoading()
                mpvue.showToast({
                  title: '保存成功'
                })
              }
            }
          })
        }
      }
    },
    onLoad() {
      console.log('[new post] [onLoad]')
      Object.assign(this.$data, this.$options.data())
    }
  }
</script>


<style lang="scss" scoped>
  @import "../../assets/mixin";
  .container{
    @include wh(100%, 100%);
    position: relative;
    .canvas {
      z-index: 0;
      /*注意这波骚操作：canvas是原生组件默认最高层级，z-index只会在原生组件之间有效*/
      @include positionTL(absolute, 300%, 300%);
    }
    .info {
      z-index: 999;
      background-color: #ffffff;
      @include fixedFull;
      @include wh(100%, 100%);
      .place-holder {
        @include positionTL(absolute, 30px, 50%);
        transform: translate(-50%);
        @include wh(90%, 200px);
        @include flex_center;
        border: #333333 dotted 1px;
        .icon {
          font-size: 40px;
        }
      }
      .pics {
        @include positionTL(absolute, 30px, 0);
        @include wh(100%, auto);
        @include flex_center;
        flex-flow: row wrap;
        .item {
          padding: 5px;
          box-sizing: border-box;
          background: no-repeat center;
          background-size: cover;
        }
      }
      .btn-wrapper {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%);
        @include flex_center;
        flex-direction: row;
        .btn {
          @include wh(100px, 50px);
          color: #fff;
          font-size: 18px;
          background: linear-gradient(-69deg, #FF9509, #FE2042);
          margin-right: 15px;
          border-radius: 8px;
          box-shadow: 0 5px 15px -5px rgba(0,0,0,.5);
          @include flex_center;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
