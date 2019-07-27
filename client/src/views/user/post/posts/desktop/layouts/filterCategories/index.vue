<template>
  <div
    class="btn btn--filter"
    @click="showOptionCategories"
    :data-theme="currentTheme"
    v-click-outside="closeFilterDropdown"
  >
    {{ filterSelected.title }}
    <icon-base
      class="ml_1"
      icon-name="Lựa chọn"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <icon-sort-down />
    </icon-base>
    <!-- Start: Filter dropdown -->
    <div class="dropdown text_left" v-show="showFilterDropdown">
      <VuePerfectScrollbar class="scroll--control">
        <div class="dropdown--item" v-if="statusCategories === 'loading'">
          <loading-component/>
        </div>
        <div>
          <div
            class="dropdown--item"
            @click="getAllPost"
          >
            Tất cả
          </div>
          <div
            class="dropdown--item"
            v-for="(item, index) in allCategories"
            :key="`a-${index}`"
            @click="updateFilterSelected(item)"
          >
            {{ item.title }}
          </div>
        </div>
      </VuePerfectScrollbar>
    </div>
    <!-- End: Filter dropdown -->
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    VuePerfectScrollbar
  },
  props: [ "filterList", "filterSelected", "filterShowSelected" ],
  data() {
    return {
      showFilterDropdown: false,
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allCategories() {
      return this.$store.getters.allCategories;
    },
    statusCategories() {
      return this.$store.getters.statusCategories;
    }
  },
  methods: {
    getAllPost(){
      const dataSender = {
        size: this.filterShowSelected.id,
        page: 1
      };
      this.$store.dispatch("getPostsByPage", dataSender);

      this.$emit( "updateFilterSelected", {
        id: 0,
        title: "Tất cả"
      } );

      this.$router.replace( {
        name: "post_posts",
        query: {
          size: this.filterShowSelected.id,
          page: 1
        }
      } );

      this.$emit( "updateCurrentPage", 1 );
    },
    async updateFilterSelected( data ) {
      this.$emit( "updateFilterSelected", {
        id: data._id,
        title: data.title
      } );
      this.$emit( "updateCurrentPage", 1 );

      await this.$store.dispatch("getPostByCategories", {
        categoryId: data._id,
        size: this.filterShowSelected.id,
        page: 1
      } );

      this.$router.replace( {
        name: "post_posts",
        query: {
          categoryId: data._id,
          size: this.filterShowSelected.id,
          page: 1
        }
      } );
    },
    closeFilterDropdown(){
      this.showFilterDropdown = false;
    },
    async showOptionCategories(){
      if ( this.showFilterDropdown === false ) {
        await this.$store.dispatch("getAllCategories");
      }
      this.showFilterDropdown = !this.showFilterDropdown;
    }
  }
};
</script>

<style lang="scss" scoped>
  .btn--filter {
    border-radius: 0.5rem;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    padding: 0 .75rem;
    position: relative;
    &:active,
    &:focus {
      box-shadow: none;
      outline: 0;
    }
    .dropdown {
      border: 0;
      border-radius: 0.5rem;
      padding: 0.375rem 0;
      position: absolute;
      top: calc(100% + 3px);
      right: 0;
      min-width: 13rem;
      width: auto;
      z-index: 999;
      &--item {
        padding: 0 .75rem;
      }
      .scroll--control {
        max-height: 200px;
      }
    }
    svg {
      stroke-width: 5;
      vertical-align: middle;
      vertical-align: -webkit-baseline-middle;
    }
  }
  /*  Theme color */
  .btn--filter[data-theme="light"] {
    background-color: #fff;
    .dropdown {
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      color: #444;
      &--item {
        &:hover {
          background-color: #ffb94a;
          color: #fff;
        }
      }
    }
    svg {
      color: #ccc;
    }
  }
  .btn--filter[data-theme="dark"] {
    background-color: #27292d;
    color: #f7f7f7;
    .dropdown {
      background-color: #27292d;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
      color: #f7f7f7;
      &--item {
        &:hover {
          background-color: #ffb94a;
          color: #fff;
        }
      }
    }
    svg {
      color: #999;
    }
  }
</style>
