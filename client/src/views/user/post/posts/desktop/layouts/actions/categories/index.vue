<template>
  <div
    class="post--action d_flex justify_content_between align_items_center"
    :data-theme="currentTheme"
  >
    <div class="action--left">
      <div class="post--search d_flex justify_content_between align_items_center">
      <span class="ml_3 mt_1">
        <icon-base
          icon-name="Tìm kiếm"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <icon-input-search />
        </icon-base>
      </span>
        <input
          type="text"
          placeholder="Tìm kiếm"
          v-model="keyword"
          @keydown.enter="searchCategories"
        />
      </div>
    </div>
    <div class="action--right">
      <app-filter
        :filterList="filterShowList"
        :filterSelected="filterShowSelected"
        @updateFilterSelected="updateFilterShowSelected($event)"
      />
    </div>
  </div>
</template>

<script>
import AppFilter from "../../filters/filterAmount";

export default {
  components: {
    AppFilter
  },
  props: [ "filterShowSelected" ],
  data() {
    return {
      filterShowList: [
        { id: 25, name: "Hiển thị 25" },
        { id: 50, name: "Hiển thị 50" },
        { id: 100, name: "Hiển thị 100" }
      ],
      keyword: "",
      sizeDefault: 25,
      pageDefault: 1
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    categories() {
      return this.$store.getters.categories;
    }
  },
  watch: {
    keyword(val) {
      if(val.length === 0) {
        const dataSender = {
          size: this.sizeDefault,
          page: this.pageDefault
        };

        this.$store.dispatch( "getCategoriesByPage", dataSender );
      }
    }
  },
  methods: {
    updateFilterShowSelected( val ) {
      this.$emit( "updateFilterShowSelected", val );
    },
    async searchCategories() {
      const dataSender = {
        keyword: this.keyword,
        size: this.sizeDefault,
        page: this.pageDefault
      };
      await this.$store.dispatch("getCategoriesByKey", dataSender);
      this.$emit( "updateSearch", this.keyword );
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "index.style";
</style>
