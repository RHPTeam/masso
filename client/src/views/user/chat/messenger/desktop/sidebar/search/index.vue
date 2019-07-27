<template>
  <div class="search" :data-theme="currentTheme">
    <div class="input--wrap position_relative">
      <div class="search--icon position_absolute">
        <icon-base
          icon-name="tìm kiếm"
          width="16.772"
          height="17.287"
          viewBox="0 0 16.772 17.287"
        >
          <icon-input-search />
        </icon-base>
      </div>
      <input
        type="text"
        placeholder="Tìm kiếm"
        v-model="keywords"
        @click="changeStatus"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTheme: {
      type: String,
      default: "dark"
    }
  },
  data() {
    return {
      keywords: ""
    }
  },
  methods: {
    async changeStatus() {
      await this.searchFriend();
      await this.$emit("changeStatus", false);
      this.$emit("watchKeyword", this.keywords);
    },
    searchFriend(){
      this.$store.dispatch("getAllFriendFB");
    }
  },
}
</script>

<style lang="scss" scoped>
  .search {
    padding: 8px 20px 8px 20px;
    font-size: 14px;
    input {
      background-color: #F7F7F7;
      border-radius: 1rem;
      padding: 10px 15px 8px 40px;
      width: 100%;
      border: 0;
      outline: 0;
    }
    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #999;
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      color: #999;
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      color: #999;
    }
    :-moz-placeholder {
      /* Firefox 18- */
      color: #999;
    }
    .search--icon {
      top: 50%;
      transform: translateY(-50%);
      left: 15px;
      color: #999;
    }
  }

  /* ChangeColor */
  // Light
  .search[data-theme="light"] {
    input {
      background-color: #f7f7f7;
      color: #444;
    }
  }

  //Dark
  .search[data-theme="dark"] {
    background-color: #2f3136;
    input {
      background-color: #27292c;
      color: #f7f7f7;
    }
  }

  @media (max-width: 1025px) {
    .search {
      padding-top: 33px;
      padding-bottom: 33px;
      input {
        display: none;
      }
    }
  }
</style>
