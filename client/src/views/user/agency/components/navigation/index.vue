<template>
  <div class="navigation d_flex align_items_center justify_content_between mb_3">
    <div class="left">
      <input type="text" class="form_control" placeholder="Tìm kiếm" v-model="keyword" @keydown.enter="searchMemberOfAgency" />
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
      keyword: ""
    }
  },
  methods: {
    openCreateMember() {
      this.$emit("openPopup", true);
    },
    openUpdateAgencyInfo() {
      this.$emit("openUpdateAgencyInfo", true);
    },
    searchMemberOfAgency(){
      this.$store.dispatch("searchMemberByAgency", this.keyword);
    }
  },
}
</script>

<style scoped lang="scss">
.navigation {
  input[type=text] {
    background-color: #27292d;
    border-color: #27292d;
    color: #fff1dc;
    outline: none;
    &:focus {
      border-color: #ffb94a;
      outline: none;
    }
  }
}
</style>
