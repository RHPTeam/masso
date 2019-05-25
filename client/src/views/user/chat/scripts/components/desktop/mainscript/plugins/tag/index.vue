<template>
  <div class="script--body-tag mt_3">
    <div class="script--body-tag-title">
      <span class="script--body-tag-icon">
        <icon-base class="icon-tag" width="15" height="16" viewBox="0 0 337.7 487.85">
          <icon-tag/>
        </icon-base>
      </span>
      <span>Thuộc tính người dùng</span>
      <div class="ml_auto">
        <icon-base icon-name="remove" width="18" height="18" viewBox="0 0 18 18">
          <icon-remove/>
        </icon-base>
      </div>
    </div>
    <div class="script--body-tag-description">
      Đặt giá trị cho thuộc tính người dùng hiện có hoặc thêm thuộc tính mới. Sử
      dụng nhóm chiến dịch để gửi, kịch bản để xác định phân tích hoạt động của
      người dùng. Lưu ý rằng bạn có thể sử dụng các biểu thức và thuộc tính số
      học trong trường Giá trị.
    </div>
    <div class="script--body-tag-list">
      <div class="script--body-tag-edit-title d_flex">
        <span>Tên thẻ</span>
        <span>Giá trị</span>
      </div>
      <div class="script--body-tag-item d_flex align_items_center position_relative mb_2">
        <div class="tag--created position_relative">
          <contenteditable
            class="tag--created-item"
            tag="div"
            placeholder="Nhập tên..."
            :contenteditable="true"
          />
        </div>
        <div class="tag--created position_relative">
          <contenteditable
            class="tag--created-item"
            tag="div"
            placeholder="GIÁ TRỊ..."
            :contenteditable="true"
          />
        </div>
        <div class="tag--icon-delete d_flex align_items_center position_absolute">
          <icon-base
              icon-name="delete"
              width="20"
              height="20"
              viewBox="0 0 18 18"
            >
              <icon-remove />
            </icon-base>
        </div>
      </div>
      <div class="script--body-tag-footer">
        <div class="script--body-tag-add">
          <span>
            <icon-base
              class="icon--add"
              icon-name="plus"
              width="16"
              height="16"
              viewBox="0 0 60 60"
            >
              <icon-plus/>
            </icon-base>
          </span>
          <span>Thêm thẻ</span>
        </div>
      </div>
    </div>
    <!--Delete Item Popup-->
    <!-- <delete-item
      v-if="isDeleteItemBlock === true"
      desc="Bạn có thực sự muốn xóa nội dung kịch bản này không?"
      :content="item._id"
      :block="content._id"
      target="itemblock"
      @close="isDeleteItemBlock = $event"
    />-->
  </div>
</template>
<script>
import ItemTag from "../item";
export default {
  props: {
    arrValue: Array,
    content: Object,
    item: Object
  },
  data() {
    return {
      isShowAddAttribute: false,
      isDeleteItemBlock: false
    };
  },
  async created() {},
  computed: {
    // block() {
    //   return this.$store.getters.block;
    // },
    // listAttr() {
    //   // get value text of item
    //   return this.item.valueText.split(",");
    // }
  },
  methods: {
    // addAttributeInItemBlock(id) {
    //   const dataSender = {
    //     block: this.$store.getters.block,
    //     itemId: id
    //   };
    //   this.$store.dispatch("updateItemAttrBlock", dataSender);
    // }
  },
  components: {
    ItemTag
  }
};
</script>
<style lang="scss" scoped>
@import "../../index.style";
</style>