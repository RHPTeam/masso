<template>
  <div class="item--body d_flex align_items_center px_3 py_2">
    <!--<div class="col col--checkbox px_2">
      <label class="detail--checkbox mb_0">
        <input type="checkbox" />
      </label>
    </div>-->
    <div class="col col--category px_2">{{ item.title }}</div>
    <div class="col col--posts text_center px_2">{{ item.ammout }}</div>
    <div class="col col--description px_2">
      <div class="col--description-text">
        {{ item.description }}
      </div>
    </div>
    <div class="col col--action px_4 text_center"
         :class="[ item.title === 'Chưa phân loại' ? 'action--disabled' : null ]"
    >
      <span v-if="item.title === 'Chưa phân loại'">
        <span class="mx_1">
          <icon-base icon-name="Chỉnh sửa" viewBox="0 0 20 20">
            <icon-edit />
          </icon-base>
        </span>
        <span class="mx_1">
          <icon-base
            icon-name="Xóa"
            width="20"
            height="20"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </span>
      </span>
      <span v-else>
        <span class="mx_1" @click="updateCategory">
          <icon-base icon-name="Chỉnh sửa" viewBox="0 0 20 20">
            <icon-edit />
          </icon-base>
        </span>
        <span class="mx_1" @click="showDeletePopup">
          <icon-base
            icon-name="Xóa"
            width="20"
            height="20"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "item" ],
  methods: {
    updateCategory() {
      this.$emit( "updateCategory", this.item );
    },
    showDeletePopup() {
      this.$emit( "showDeletePopup", this.item );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";
.action--disabled {
  span {
    svg {
      color: #999 !important;
      cursor: not-allowed !important;
      opacity: .5 !important;
      &:hover {
        color: #999 !important;
      }
    }
  }
}
</style>
