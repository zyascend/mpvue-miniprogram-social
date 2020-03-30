<template>
  <div class="container">
    <div class="feed">
      <RemindItem
        v-for="item in reminds"
        :key="item.id"
        :remind="item"
      />
    </div>
  </div>
</template>

<script>
  import RemindItem from '../../components/remind-item'
  import { REMIND } from '../../utils/mockDataFactory.js'

  export default {
    components: {
      RemindItem
    },
    data() {
      return {
        reminds: REMIND
      }
    },
    methods: {},
    mounted() {
      mpvue.setTabBarBadge({
        index: 3,
        text: String(this.reminds.length)
      })
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
