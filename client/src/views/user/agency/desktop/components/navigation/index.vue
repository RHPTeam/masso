<template>
  <div class="navigation d_flex align_items_center justify_content_between mb_3">
<<<<<<< HEAD:client/src/views/user/agency/desktop/components/navigation/index.vue
    <div class="left">
      <input type="text" class="form_control" placeholder="Tìm kiếm" v-model="keyword" @keydown.enter="searchMemberOfAgency" />
=======
    <div class="left mr_auto">
      <input
        type="text"
        class="form_control"
        placeholder="Tìm kiếm"
        v-model="keyword"
        @keydown.enter="searchMemberOfAgency"
      />
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5:client/src/views/user/agency/components/navigation/index.vue
    </div>
    <div class="right ml_auto">
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
<<<<<<< HEAD:client/src/views/user/agency/desktop/components/navigation/index.vue
    }
=======
    };
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5:client/src/views/user/agency/components/navigation/index.vue
  },
  methods: {
    openCreateMember() {
      this.$emit("openPopup", true);
    },
    openUpdateAgencyInfo() {
      this.$emit("openUpdateAgencyInfo", true);
    },
<<<<<<< HEAD:client/src/views/user/agency/desktop/components/navigation/index.vue
    searchMemberOfAgency(){
      if(this.keyword.length === 0) {
=======
    searchMemberOfAgency() {
      if (this.keyword.length === 0) {
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5:client/src/views/user/agency/components/navigation/index.vue
        this.$store.dispatch("getInfoAgency");
        this.$emit("showResultSearch", false);
      } else {
        this.$store.dispatch("searchMemberByAgency", this.keyword);
        this.$emit("showResultSearch", true);
      }
    }
  }
};
</script>

<style scoped lang="scss">
<<<<<<< HEAD:client/src/views/user/agency/desktop/components/navigation/index.vue
  .navigation {
    input[type=text] {
      background-color: #27292d;
      border-color: #27292d;
      color: #fff1dc;
=======
.navigation {
  input[type="text"] {
    background-color: #27292d;
    border-color: #27292d;
    color: #fff1dc;
    outline: none;
    &:focus {
      border-color: #ffb94a;
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5:client/src/views/user/agency/components/navigation/index.vue
      outline: none;
      &:focus {
        border-color: #ffb94a;
        outline: none;
      }
    }
  }
<<<<<<< HEAD:client/src/views/user/agency/desktop/components/navigation/index.vue
</style>
=======
}
@media only screen and (max-width: 840px) {
  .navigation {
    flex-direction: column;
    .left {
      margin-bottom: 1rem;
    }
  }
}
</style>
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5:client/src/views/user/agency/components/navigation/index.vue
