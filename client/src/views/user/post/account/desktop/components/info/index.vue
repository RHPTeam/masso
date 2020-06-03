<template>
  <div class="r my_4 account"  :data-theme="currentTheme">
    <!-- Start: Left Content -->
    <div class="c_sm_12 c_md_12 c_lg_4 or_1">
      <div class="right--content p_3">
        <!-- Start: User Avatar -->
        <user-avatar :user="user"></user-avatar>
        <!-- End: User Avatar -->
      </div>
    </div>
    <!-- End: Left Content -->
    <!-- Start: Right Content -->
    <div class="c_sm_12 c_md_12 c_lg_8 or_2">
      <div class="left--content p_3">
        <!-- Start: User Personal Info -->
        <user-personal-info :user="user"></user-personal-info>
        <!-- End: User Personal Info -->
      </div>
    </div>
    <!-- End: Right Content -->
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
.account {
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

//  ================= RESPONSIVE
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

//  ================ CHANGE THEME

// dark
.account[data-theme="dark"] {
  .left--content, .right--content {
    background-color: #282a2d;
  }
}
</style>
