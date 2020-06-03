<template>
  <div class="header d_flex align_items_center justify_content_between">
    <div class="search position_relative">
      <span class="ml_2 position_absolute">
        <icon-base
            class="ic--search"
            icon-name="Tìm kiếm"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
          <icon-input-search/>
        </icon-base>
      </span>
      <input
        class="search--input"
        placeholder="Tìm kiếm"
        type="text"
      />
    </div>
    <div class="bot">
      <div class="left" @click="openCreateNewLoop">Tạo mới</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openCreateNewLoop() {
      this.$emit("openPopup", true);
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  .search {
    background-clip: padding-box;
    border: 0;
    border-radius: 0.5rem;
    width: 30%;
    span {
      top: 12%;
      left: .25rem;
    }
    svg.ic--search {
      vertical-align: middle;
    }
    .search--input {
      background-color: #27292d ;
      background-clip: padding-box;
      border: 0;
      border-radius: 0.5rem;
      color: #fff;
      font-size: 0.875rem;
      height: 40px;
      line-height: 40px;
      padding: 0.375rem 0.75rem 0.375rem 2.2rem;
      width: 100%;
      &:active,
      &:focus,
      &:visited {
        outline: 0 !important;
        box-shadow: none;
      }
    }
  }
  .top {
    span.history {
      background-color: #272a2c;
      border-radius: .625rem;
      cursor: pointer;
      padding: .5rem 1rem;
    }
  }
  .bot {
    .left {
      background-color: #ffb94a;
      border-radius: .625rem;
      cursor: pointer;
      color: #fff;
      padding: .5rem 1rem;
    }
  }
}
</style>
