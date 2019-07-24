<template>
  <div class="navigation d_flex align_items_center justify_content_between mb_3">
    <div class="left">
      <input type="text" class="form_control" placeholder="Tìm kiếm" />
    </div>
    <div class="right">
      <button class="btn btn_success mr_3" @click="openUpdateAgencyInfo">Thiết lập thông tin</button>
      <button class="btn btn_primary" @click="openCreateMember">Tạo mới</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: ""
    }
  },
  methods: {
    openCreateMember() {
      this.$emit("openPopup", true);
    },
    openUpdateAgencyInfo() {
      this.$emit("openUpdateAgencyInfo", true);
    }
  },
}
</script>

<style scoped>

</style>
