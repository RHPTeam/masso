<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3">
        <!-- Start: Modal Body -->
        <div class="body">
          <!-- Start: Form Header -->
          <div class="form--header d_flex align_items_center justify_content_center">
            <div class="header--logo">
              <span>Thiết lập thông tin</span>
            </div>
          </div>
          <!-- End: Form Header -->
          <!-- Start: Form Body -->
          <div class="form--body">
            <label>Sub Domain:</label>
            <input type="text" class="form_control" placeholder="example.zinbee.vn" v-model="agency.subDomain">
          </div>
          <!-- Start: Form Body -->
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center mt_3">
          <div class="ml_auto d_flex">
            <button class="btn--cancel mr_2" @click="close">
              Hủy bỏ
            </button>
            <button
              class="btn--create"
              @click="updateAgencyInfo"
            >
              Cập nhật
            </button>
          </div>
        </div>
        <!-- End: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    agency(){
      return this.$store.getters.agency;
    }
  },
  methods: {
    close() {
      this.$emit( "close", false );
    },
    updateAgencyInfo() {
      this.$store.dispatch( "updateAgencyInfo", { "domain": this.agency.subDomain } );
      this.close();
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../index.style";
</style>
