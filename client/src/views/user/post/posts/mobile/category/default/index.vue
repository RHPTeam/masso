<template>
  <div class="category--data mt_2" :data-theme="currentTheme">
    <div class="wrapper">
      <!-- <div class="item--header d_flex align_items_center py_2">
        <div class="col col--category pl_3 pr_2">Tên danh mục</div>
        <div class="col col--posts text_center pr_3">Số bài viết</div>
      </div> -->
      <!-- <div class="loading--block mt_3" v-if="this.$store.getters.statusCategories === 'loading'">
        <loading-component></loading-component>
      </div> -->
      <VuePerfectScrollbar class="list--category-default">
        <div v-if="categoriesDefault.length === 0" class="text_center py_2">Không có danh mục mẫu nào</div>
        <item-category-default 
          v-for="(category, index) in categoriesDefault"
          :key="`c-${index}`"
          :item="category"/>
      </VuePerfectScrollbar>
    </div>

    
    <!--*********** POPUP *************-->
    <transition name="popup">
    </transition>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "index.style";
</style>
