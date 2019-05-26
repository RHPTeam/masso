<template>
  <div class="search">
    <div class="input--wrap position_relative">
      <div class="search--icon position_absolute">
        <icon-base
          icon-name="input-search"
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
        @click="changeStatus"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeStatus() {
      this.$emit("changeStatus", false);
    }
  },
}
</script>

<style lang="scss" scoped>
  .search {
    padding: 8px 20px 8px 20px;
    font-size: 14px;
    input {
      background-color: #cccccc;
      border-radius: 1rem;
      padding: 8px 15px;
      padding-left: 50px;
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
    input {
      background-color: #2f3136;
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
