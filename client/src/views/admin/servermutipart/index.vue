<template>
  <div class="server position_relative" :data-theme="currentTheme">
    <div class="desc py_3 px_2"><span>Quản lý hệ thống server :</span> Thông tin về domain cho 3 miền.</div>
    <div class="action py_2 px_2">
      <button class="btn btn_info" @click="isShowAddDomain = true">Tạo mới</button>
    </div>
    <div class="body mt_2">
      <div class="content--body">
        <div class="table-container" role="table" aria-label="Destinations">
          <div class="flex-table header" role="rowgroup">
            <div class="flex-row first" role="columnheader">Tên</div>
            <div class="flex-row" role="columnheader">Cụm</div>
            <div class="flex-row" role="columnheader">Số lượng hiện tại</div>
            <div class="flex-row" role="columnheader">Số lượng max</div>
            <div class="flex-row" role="columnheader">Hành động</div>
          </div>
          <div class="flex-table row" role="rowgroup">
            <div class="flex-row first" role="cell">
              <div>https://inbox.zinbe.vn</div>
            </div>
            <div class="flex-row first" role="cell">
              <div>1</div>
            </div>
            <div class="flex-row" role="cell">
              200
            </div>
            <div class="flex-row" role="cell">200</div>
            <div class="flex-row" role="cell">
              <div class="d_flex justify_content_center">
                <button class="btn btn_warning">Sửa</button>
                <button class="btn btn_danger ml_3">Xóa</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Start : add new domain -->
    <add-domain
      v-if="isShowAddDomain === true"
      :currentTheme="currentTheme"
      @closePopUpAddNewDomain="isShowAddDomain = $event"
    />
    <!-- End : add new domain -->
  </div>
</template>

<script>
import AddDomain from "./adddomain";
export default {
  components: {
    AddDomain
  },
  data() {
    return {
      isShowAddDomain: false
    }
  },
  computed: {
    currentTheme(){
      return this.$store.getters.themeName;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
