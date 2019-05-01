<template>
  <div class="r main--header mb_3">
    <!-- Start: Header Left-->
    <div class="c_md_6 main--header-left d_flex">
      <button class="btn btn--add-campaign mr_2">Thêm chiến dịch</button>
      <div class="campaing--search">
        <span class="ml_2">
          <icon-base
            class="ic--search"
            icon-name="ic--search"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <icon-input-search />
          </icon-base>
        </span>
        <input class="search--input" placeholder="Tìm kiếm" type="text" />
      </div>
    </div>
    <!-- End: Header Left-->
    <!-- Start: Header Right-->
    <div class="c_md_6 main--header-right text_right">
      <app-filter
        class="mr_2"
        :filterList="filterShowList"
        :filterSelected="filterShowSelected"
        @updateFilterSelected="filterShowSelected = $event"
      />
      <app-filter
        :filterList="filterStatusList"
        :filterSelected="filterStatusSelected"
        @updateFilterSelected="filterStatusSelected = $event"
      />
    </div>
    <!-- End: Header Right-->
  </div>
</template>

<script>
import AppFilter from "./filter/index";
export default {
  components: {
    AppFilter
  },
  data() {
    return {
      filterShowList: [
        { id: 0, name: "Hiển thị 25" },
        { id: 1, name: "Hiển thị 50" },
        { id: 2, name: "Hiển thị 100" }
      ],
      filterShowSelected: { id: 0, name: "Hiển thị 25" },
      filterStatusList: [
        { id: 0, name: "Tất cả trạng thái" },
        { id: 1, name: "Đang hoạt động" },
        { id: 2, name: "Ngừng hoạt động" }
      ],
      filterStatusSelected: { id: 0, name: "Tất cả trạng thái" }
    };
  }
};
</script>

<style lang="scss" scoped>
.main--header {
  .main--header-left {
    .btn--add-campaign {
      background-color: #ffb94a;
      border-radius: 0.5rem;
      color: #fff;
      font-size: 0.875rem;
      font-weight: 600;
      &:hover {
        background-color: #ff9e4a;
      }
      &:active,
      &:focus,
      &:visited {
        outline: 0 !important;
        box-shadow: none;
      }
    }
    .campaing--search {
      background-color: #fff;
      background-clip: padding-box;
      border: 0;
      border-radius: 0.5rem;
      width: 240px;
      svg.ic--search {
        color: #999999;
        vertical-align: middle;
      }
      .search--input {
        background-color: #fff;
        background-clip: padding-box;
        border: 0;
        border-radius: 0.5rem;
        color: #444;
        font-size: 0.875rem;
        height: calc(2.25rem);
        line-height: 1.5;
        padding: 0.375rem 0.75rem 0.375rem 0.25rem;
        width: calc(100%-24px);
        &::placeholder {
          color: #ccc;
        }
        &:active,
        &:focus,
        &:visited {
          outline: 0 !important;
          box-shadow: none;
        }
      }
    }
  }
  .main--header-right {
    font-size: 0.875rem;
  }
}
</style>
