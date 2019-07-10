<template>
  <div class="main--mobile px_2 position_relative">
    <!-- Start: Content -->
    <div class="main--content">
      <!-- Start: Search -->
      <div
        class="posts-search mb_3 d_flex align_items_center position_relative"
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
          :class="gestureUser === 11 ? 'active' : '' "
        >Tất cả</div>
        <div
          class="category items"
          @click="showCategory"
          :class="gestureUser === 12 ? 'active' : '' "
        >Danh mục</div>
        <div
          class="category--form items"
          @click="showCategoryForm"
          :class="gestureUser === 13 ? 'active' : '' "
        >Danh mục mẫu</div>
      </div>
      <!-- End: Tabs - Posts and Category -->

      <!-- Start: List Posts -->
      <div class="list--post pt_2" v-if="gestureUser === 11">
        <list-post />
      </div>
      <!-- End: List Posts -->

      <!-- Start: List Category -->
      <div class="category" v-if="gestureUser === 12">
        <VuePerfectScrollbar class="scroll-category" ref="scroll">
          <category />
        </VuePerfectScrollbar>
      </div>
      <!-- End: List Category -->
      <div class="category--form" v-if="gestureUser === 13">
        <VuePerfectScrollbar class="scroll--category-form" ref="scroll">
          <category-form />
        </VuePerfectScrollbar>
      </div>
      <!-- Start: List Category Form -->

      <!-- End: List Category Form -->

      <!-- Start: Create new post -->
      <!-- <div class="new--post position_fixed">
        <icon-base
          class="ic--new-post"
          icon-name="Them"
          width="25"
          height="25"
          viewBox="0 0 400 400"
        >
          <icon-create-new />
        </icon-base>
      </div>-->
      <!-- End: Create new post -->
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