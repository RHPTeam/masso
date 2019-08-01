<template>
  <div class="navigation d_flex align_items_center justify_content_between mb_3">
    <div class="left mr_auto">
      <input
        type="text"
        class=""
        placeholder="Tìm kiếm"
        v-model="keyword"
        @keydown.enter="searchMemberOfAgency"
      />
    </div>
    <div class="right ml_auto d_flex align_items_center">
      <div class="info mr_3" @click="openUpdateAgencyInfo">Thiết lập thông tin</div>
      <div class="create" @click="openCreateMember">Tạo mới</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    openCreateMember() {
      this.$emit("openPopup", true);
    },
    openUpdateAgencyInfo() {
      this.$emit("openUpdateAgencyInfo", true);
    },
    searchMemberOfAgency() {
      if (this.keyword.length === 0) {
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
.navigation {
  input[type="text"] {
    background-color: #27292d;
    border-color: #27292d;
    border: 1px solid #444;
    border-radius: 0.625rem;
    padding: 0.4rem 0.625rem;
    color: #fff1dc;
    outline: none;
    &:focus {
      border-color: #ffb94a;
      outline: none;
    }
  }
  .create {
    background-color: #ffb94a;
    border-radius: 0.5rem;
    color: #fff;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    padding: 0 0.75rem;
    transition: all 0.4s ease;
    &:hover {
      background-color: #ff9e4a;
    }
  }
  .info {
    color: #fff;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
      color: #ffb94a;
    }
  }
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
