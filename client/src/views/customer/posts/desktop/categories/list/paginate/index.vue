<template>
  <div class="post--info d_flex justify_content_between align_items_center">
    <div class="post--info-show">Hiển thị {{ perPage }} trong số  {{ totalCate }}</div>
    <paginate
      :pageCount="sizePageCategories"
      :clickHandler="goToPage"
      :prev-text="'&#8249;'"
      :next-text="'&#x203A;'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    ></paginate>
  </div>
</template>

<script>

import CategoriesServices from "@/services/modules/categories.services";

export default {
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      totalCount: null,
      totalCate: ""
    }
  },
  computed: {
    sizePageCategories() {
      return this.$store.getters.sizePageCategories;
    }
  },
  async created() {
    await this.$store.dispatch("getCategoriesBySize", this.perPage);
    let result = await CategoriesServices.index();
    this.totalCate = result.data.data.length;
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page;
    },
    goToPage(page) {
      const dataSender = {
        size: this.perPage,
        page: page
      };
      this.$store.dispatch("getCategoriesByPage", dataSender);
    }
  },
};
</script>

<style lang="scss" scoped>
.post--info {
  font-size: 0.875rem;
  &-show {
    color: #999;
    letter-spacing: -0.2px;
  }
}
</style>
<style lang="scss">
.pagination {
  margin-bottom: 0;
  li {
    border-radius: 14px;
    height: 30px;
    font-size: 1.5rem;
    margin: 0 0.25rem;
    line-height: 24px;
    a {
      color: #666;
      outline: none;
      text-decoration: none;
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    &.page-item {
      font-size: 0.875rem;
      line-height: 30px;
      text-align: center;
      transition: all 0.4s ease;
      width: 30px;

      &.disabled {
        opacity: 1;
      }
      &:hover,
      &.active {
        background-color: #ffb94a;
        a {
          color: #fff;
        }
      }
    }
    &:first-child {
      text-align: left;
      width: 20px;
    }
    &:last-child {
      margin-right: 0;
      text-align: right;
      width: 20px;
    }
  }
}
</style>
