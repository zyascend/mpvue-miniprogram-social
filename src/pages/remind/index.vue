<template>
  <div class="container">
    <div class="feed">
      <TodayItem
        v-for="item in todayList"
        :key="item.dateName"
        :today="item"
        @onClick="onItemClick(item)"
      />
    </div>
  </div>
</template>

<script>
  import TodayItem from '../../components/today-item'
  import { getTodayList } from '../../api'
  import { showLoading, hideLoading } from '../../api/wechat'
  import { showToast } from '../../utils'
  export default {
    components: {
      TodayItem
    },
    data() {
      return {
        todayList: []
      }
    },
    methods: {
      onItemClick(item) {
        mpvue.setClipboardData({
          data: item.content,
          success: () => {
            showToast('链接已复制，请在浏览器打开')
          }
        })
      },
      async init() {
        const res = await getTodayList()
        this.todayList = res.data.today.list
        hideLoading()
      }
    },
    mounted() {
      showLoading({ title: '正在加载' })
      this.init()
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
