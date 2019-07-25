<template>
  <div class="category--data mt_2" :data-theme="currentTheme">
    <div class="wrapper">
      <VuePerfectScrollbar class="list--category">
      <div v-if="categories.length === 0" class="text_center py_2 no--post">Không có danh mục nào</div>
        <item-categories :item="item" v-for="item in categories" :key="item._id"/>
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "index.style";
  .no--post {
    font-size: 0.9315rem;
  }
</style>
