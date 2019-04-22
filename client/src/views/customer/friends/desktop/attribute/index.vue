<template>
   <div class="attribute mt_3 py_3" :data-theme="currentTheme">
    <div class="attribute--item d_flex align_items_center">
      <div class="attribute--form mr_2 pl_3">
        <app-filter />
      </div>

      <div class="attribute--action mr_3">
        <div class="btn--add">
          <icon-base
            class="icon--add mr_1"
            icon-name="plus"
            width="14"
            height="14"
            viewBox="0 0 60 60"
          >
            <icon-plus />
          </icon-base>
        </div>
      </div>

      <div class="btn--remove">
        <icon-base
          class="icon--add mr_1"
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </div>
    </div>
  </div>
</template>

<script src="./index.script"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
