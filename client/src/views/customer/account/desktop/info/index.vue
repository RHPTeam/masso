<template>
  <div class="r my_4">
    <!-- Start: Left Content -->
    <div class="c_sm_12 c_md_12 c_lg_4 or_1">
      <div class="right--content p_3">
        <!-- Start: User Avatar -->
        <user-avatar :user="user" />
        <!-- End: User Avatar -->
      </div>
    </div>
    <!-- End: Left Content -->
    <!-- Start: Right Content -->
    <div class="c_sm_12 c_md_12 c_lg_8 or_2">
      <div class="left--content p_3">
        <!-- Start: User Personal Info -->
        <user-personal-info :user="user" />
        <!-- End: User Personal Info -->
      </div>
    </div>
    <!-- End: Right Content -->
    <!--Start: Dropzone Component-->
    <dropzone :status="isDropZone" @close="isDropZone = $event" />
    <!--End: Dropzone Component-->
  </div>
</template>

<script src="./main.js"></script>

<style lang="scss" scoped>
.main--content {
  .left--content {
    background-color: white;
    border-radius: 0.625rem;
    min-height: 100%;
  }
  .right--content {
    background-color: white;
    border-radius: 0.625rem;
    height: 100%;
  }
}
@media screen and (min-width: 768px) and (max-width: 1023.9px) {
  .left--content {
    border-top-right-radius: 0 !important;
    border-top-left-radius: 0 !important;
  }
  .right--content {
    border-bottom-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
}
</style>
