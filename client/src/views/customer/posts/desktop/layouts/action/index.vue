<template>
  <div
    class="post--action d_flex justify_content_between align_items_center"
    :data-theme="currentTheme"
  >
    <div class="action--left">
      <div class="post--search d_flex justify_content_between align_items_center">
      <span class="ml_3 mt_1">
        <icon-base
          icon-name="input-search"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <icon-input-search />
        </icon-base>
      </span>
        <input type="text" placeholder="Tìm kiếm" />
      </div>
    </div>
    <div class="action--right">
      <app-filter
        class="mr_2"
        :filterList="filterShowList"
        :filterSelected="filterShowSelected"
      />
      <app-filter
        :filterList="categories"
        :filterSelected="filterCategorySelected"
      />
    </div>
  </div>
</template>

<script>
import AppFilter from "../filter";

export default {
  components: {
    AppFilter
  },
  data() {
    return {
      filterShowSelected: { id: 25, name: "Hiển thị 25" },
      filterShowList: [
        { id: 25, name: "Hiển thị 25" },
        { id: 50, name: "Hiển thị 50" },
        { id: 100, name: "Hiển thị 100" }
      ],
      filterCategorySelected: { id: 'all', name: "Tất cả" }
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    categories() {
      if(Object.entries(this.$store.getters.categories).length === 0 && this.$store.getters.categories.constructor === Object) return;
      // console.log(this.$store.getters.categories);
      return this.$store.getters.categories;
    }
  }
};
</script>

<style lang="scss" scoped>
.post--action {
  font-size: .875rem;
  .action--left {
    .post--search {
      border-radius: 10px;
      font-size: 0.875rem;
      height: 40px;
      width: 240px;
      input[type="text"] {
        background-color: transparent;
        border: 0;
        font-size: 0.875rem;
        height: 100%;
        outline: none;
        width: calc(100% - 48px);
      }
      ::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #ccc;
      }
      ::-moz-placeholder {
        /* Firefox 19+ */
        color: #ccc;
      }
      :-ms-input-placeholder {
        /* IE 10+ */
        color: #ccc;
      }
      :-moz-placeholder {
        /* Firefox 18- */
        color: #999;
      }
      svg {
        color: #999;
      }
    }
  }
}

//CHANGE COLOR THEME

//LIGHT

.post--action[data-theme="light"] {
  .action--left {
    .post--search {
      background-color: #fff;
      input {
        color: #000;
      }
    }
  }
}

// DARK

.post--action[data-theme="dark"] {
  .action--left {
    .post--search {
      background-color: #27292d;
      color: #999;
      input {
        color: #999;
      }
    }
  }
}
</style>
