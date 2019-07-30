<template>
  <div class="main--mobile px_2 position_relative">
    <!-- Start: Content -->
    <div class="main--content">
      <!-- Start: Search -->
      <div
        class="posts-search mb_2 d_flex align_items_center position_relative"
        :data-theme="currentTheme"
      >
        <div class="mr_auto search" @click="showPopupSearch">
          <span class="ml_2">
            <icon-base
              class="ic--search"
              icon-name="Tìm kiếm"
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
      <!-- End: Search -->

      <!-- Start: Tabs - Posts and Category -->
      <div class="tabs--post-category text_center d_flex align_items_center">
        <div
          class="posts items"
          @click="showPosts"
          :class="gestureUser === 11 || isShowPosts === true ? 'active' : '' "
        >Bài viết</div>
        <div
          class="category items"
          @click="showCategory"
          :class="gestureUser === 12 || isShowCategory === true ? 'active' : '' "
        >Danh mục</div>
        <div
          class="category--form items"
          @click="showCategoryForm"
          :class="gestureUser === 13 || isShowCategoryDefault === true ? 'active' : '' "
        >Danh mục mẫu</div>
      </div>
      <!-- End: Tabs - Posts and Category -->

      <!-- Start: List Posts -->
      <div class="list--post pt_2" v-if="isShowPosts === true">
        <list-post />
      </div>
      <!-- End: List Posts -->

      <!-- Start: List Category -->
      <div class="category" v-if="isShowCategory === true">
        <VuePerfectScrollbar class="scroll-category" ref="scroll">
          <category />
        </VuePerfectScrollbar>
      </div>
      <!-- End: List Category -->

      <!-- Start: List Category Form -->
      <div class="category--form" v-if="isShowCategoryDefault === true">
        <VuePerfectScrollbar class="scroll--category-form" ref="scroll">
          <category-form @showCategory="showCategory($event)"/>
        </VuePerfectScrollbar>
      </div>
      <!-- End: List Category Form -->
      
    </div>
    <!-- End: Content -->
    <!-- Start: Transition Popup -->
    <transition name="popup--mobile">
      <popup-search
        v-if="isShowPopupSearch === true"
        @closePopupSearch="isShowPopupSearch = $event"
      />
    </transition>
    <!-- End: Transition Popup -->
  </div>
</template>

<script src="./index.script.js">
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
