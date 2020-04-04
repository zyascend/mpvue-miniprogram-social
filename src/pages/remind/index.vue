<template>
  <div>
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
    <IndexPreload v-if="loading" />
  </div>
</template>

<script>
  import TodayItem from '../../components/today-item'
  import IndexPreload from '../../components/index-preload'
  import { getTodayList } from '../../api'
  import { showToast } from '../../utils'
  export default {
    components: {
      TodayItem,
      IndexPreload
    },
    data() {
      return {
        loading: true,
        todayList: []
      }
    },
    methods: {
      onItemClick(item) {
        mpvue.showActionSheet({
          itemList: ['查看详情'],
          success: res => {
            if (res.tapIndex === 0) {
              mpvue.setClipboardData({
                data: item.content,
                success: () => {
                  showToast('链接已复制，请在浏览器打开')
                }
              })
            }
          }
        })
      },
      async init() {
        this.loading = true
        const res = await getTodayList()
        this.todayList = res.data.today.list
        this.$nextTick(() => {
          this.loading = false
        })
      }
    },
    mounted() {
      mpvue.showShareMenu()
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
