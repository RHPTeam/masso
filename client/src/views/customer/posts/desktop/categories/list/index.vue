<template>
  <div class="category--data my_3" :data-theme="currentTheme">
    <div class="wrapper">
      <div class="item--header d_flex align_items_center px_3 py_2">
        <!--<div class="col col--checkbox px_2">
          <label class="custom--checkbox mb_0">
            <input type="checkbox"/>
          </label>
        </div>-->
        <div class="col col--category px_2">Tên danh mục</div>
        <div class="col col--posts text_center px_2">Số bài viết</div>
        <div class="col col--description px_2">Mô tả</div>
        <div class="col col--action px_4">Hành động</div>
      </div>

      <div class="loading--block mt_3"
           v-if="this.$store.getters.statusCategories === 'loading'"
      >
        <loading-component></loading-component>
      </div>

      <div class="item--wrap" v-else>
        <div v-if="filterCategories.length === 0"
             class="item--body data--empty d_flex align_items_center justify_content_center px_3 py_2">
          Không có dữ liệu
        </div>
        <div v-else>
          <item-categories
            v-for="(item, index) in filterCategories"
            :key="index"
            :item="item"
            @updateCategory="updateCategory($event)"
            @showDeletePopup="showDeletePopup($event)"
          ></item-categories>
        </div>
      </div>
      <!-- Start: Paginate Categories -->
      <div class="mt_3">
        <category-paginate
          :currentPage="currentPage"
          :filterShowSelected="filterShowSelected"
          @updateCurrentPage="updateCurrentPage($event)"
        ></category-paginate>
      </div>
      <!-- End: Paginate Categories -->
    </div>
    <!--*********** POPUP *************-->
    <transition name="popup">
      <delete-popup
        v-if="isShowDeletePopup === true"
        :data-theme="currentTheme"
        title="Xoá danh mục"
        storeActionName="deleteCategory"
        description="Các bài viết thuộc danh mục này sẽ được chuyển sang danh mục Chưa phân loại."
        :targetData="targetDataDelete"
        :targetName="categoryDelete.title"
        typeName="danh mục"
        @closePopup="isShowDeletePopup = $event"
      ></delete-popup>
    </transition>
  </div>
</template>

<script src="./index.script.js"></script>
 
<style lang="scss" scoped>
@import "./index.style";
</style>
