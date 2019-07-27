<template>
  <div class="post--data my_3" :data-theme="currentTheme">
    <div class="item--header d_flex align_items_center px_3 py_2">
      <div class="col col--name px_2">
        <span
          class="sort"
          @click="sortPostsByProperty(isSort[0], 0)"
          :class="[
            isSort[0].asc === true || isSort[0].desc === true ? 'active' : ''
          ]"
        >Tên bài viết
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[0].asc === false && isSort[0].desc === false"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[0].asc"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down descending ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[0].desc"
          >
            <icon-arrow-down />
          </icon-base>
        </span>
      </div>
      <div class="col col--category px_2">Danh mục</div>
      <div class="col col--action px_4">Hành động</div>
    </div>
    <!-- Start: List Data -->
    <div>
      <div v-if="this.$store.getters.statusPost === 'loading'" class="mt_3">
        <loading-component></loading-component>
      </div>
      <div v-if="this.$store.getters.statusPost === 'success' && allPost.length === 0"
           class="item--body data--empty d_flex align_items_center justify_content_center px_3 py_2">
        Không có dữ liệu
      </div>
      <div v-else>
        <item-post
          v-for="(item, index) in allPost"
          :key="index"
          :item="item"
          @showDeletePopup="showDeletePopup($event)"
          @showPostNowPopup="showPostNowPopup($event)"
        ></item-post>
      </div>
    </div>
    <!-- End: List Data -->
    <!--*********** POPUP *************-->
    <transition name="popup">
      <delete-popup
        v-if="isShowDeletePopup === true"
        :data-theme="currentTheme"
        title="Xoá bài viết"
        @closePopup="isShowDeletePopup = $event"
        storeActionName="deletePost"
        :targetData="targetDataDelete"
        :targetName="postSelected.title"
        typeName="bài viết"
      ></delete-popup>
    </transition>
    <transition name="popup">
      <post-now-popup
        v-if="isShowPostNowPopup === true"
        @closePopup="isShowPostNowPopup = $event"
        :post="postSelected"
      ></post-now-popup>
    </transition>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "index.style";
</style>
