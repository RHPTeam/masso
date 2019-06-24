<template>
  <div class="table--mobile">
    <div class="tab--page-group d_flex align_items_center text_center">
      <div
        class="page items"
        @click="showTabFanpage"
        :class="isShowTabFanpage === true ? 'active' : '' "
      >Fanpage</div>
      <div
        class="group items"
        @click="showTabGroup"
        :class="isShowTabGroup === true ? 'active' : '' "
      >Group</div>
    </div>
    <div class="content--table mt_3">
      <VuePerfectScrollbar class="scroll-page--group" ref="scroll">
        <div class="page" v-if="isShowTabFanpage === true">
          <div class="item--body d_flex align_items_center py_2">
            <div class="col col--checkbox pr_3">
              <label class="custom--checkbox mb_0">
                <input type="checkbox">
              </label>
            </div>
            <div class="col col--name d_flex align_items_center">
              <div class="avatar px_2">
                <!-- <img alt="avatar" width="30px" height="30px"> -->
              </div>
              <span class="col col--name-text">Nguyen Cong Khanh</span>
            </div>
          </div>
        </div>
        <div class="group" v-if="isShowTabGroup === true">
          <div class="item--body d_flex align_items_center py_2">
            <div class="col col--checkbox pr_3">
              <label class="custom--checkbox mb_0">
                <input type="checkbox">
              </label>
            </div>
            <div class="col col--name d_flex align_items_center">
              <div class="avatar px_2">
                <!-- <img alt="avatar" width="30px" height="30px"> -->
              </div>
              <div class="col--name-text">Bui Thi Thuc</div>
            </div>
          </div>
        </div>
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script src="./index.script">
</script>

<style lang="scss" scoped>
@import "./index.style";
.table--mobile {
  .scroll-page--group {
    max-height: 50vh;
  }
}
</style>