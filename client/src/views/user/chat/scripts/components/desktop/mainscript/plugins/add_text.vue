<template>
  <div class="script--body-text mt_3">
    <div class="script--body-delete">
      <icon-base icon-name="remove" width="20" height="20" viewBox="0 0 15 15">
        <icon-remove />
      </icon-base>
    </div>
    <div class="script--body-move d_none">
      <icon-base icon-name="remove" width="20" height="20" viewBox="0 0 64 64">
        <icon-move />
      </icon-base>
    </div>
    <div class="script--body-text-edit position_relative" contenteditable="true">
      <!-- <contenteditable
        :contenteditable="true"
      /> -->
      <div
        class="list--suggest position_absolute d_none"
      >
        <VuePerfectScrollbar class="suggest">
          <div
            class="suggest--item"
          >
            <span class="custom custom--item">
              list.name }}
            </span>
          </div>
          <div
            class="suggest--item"
          >
            <span class="custom custom--fixed">fixed.value }}</span>
          </div>
        </VuePerfectScrollbar>
      </div>
    </div>
    <!--Start:Delete Item Popup-->
    <!-- <delete-item
      v-if="isDeleteItemBlock === true"
      desc="Bạn có thực sự muốn xóa nội dung kịch bản này không?"
      :content="item._id"
      :block="block._id"
      target="itemblock"
      @close="isDeleteItemBlock = $event"
    /> -->
    <!--End: Delete Item Popup-->
  </div>
</template>
<script>
// import AttributeService from "@/services/modules/attributes.services";

import VuePerfectScrollbar from "vue-perfect-scrollbar";

let typingTimer;

export default {
  props: ["item", "block"],
  data() {
    return {
      isDeleteItemBlock: false,
      showSuggestAttribute: false,
      listAttribute: null,
      resultFilterAttr: null,
      dataFixed: [
        { id: 0, value: "Danh xưng" },
        { id: 1, value: "Tên" },
        { id: 2, value: "Họ tên" }
      ]
    };
  },
  methods: {
    // async upTypingText(type, group) {
    //   clearTimeout(typingTimer);
    //   if (type === "updateitem") {
    //     typingTimer = setTimeout(this.updateItem(group), 2000);
    //     if (group.valueText === "{{") {
    //       this.showSuggestAttribute = true;
    //       // Filter item have name # null
    //       const resultAttribute = await AttributeService.index();
    //       this.listAttribute = resultAttribute.data.data;
    //       this.resultFilterAttr = this.listAttribute.filter(
    //         item => item.name !== ""
    //       );
    //     }
    //   }
    // },
    // clear() {
    //   clearTimeout(typingTimer);
    // },
    // // Update item in block
    // updateItem(item) {
    //   const objSender = {
    //     itemId: item._id,
    //     valueText: item.valueText,
    //     block: this.$store.getters.block
    //   };
    //   this.$store.dispatch("updateItemBlock", objSender);
    // },
    // closeSuggestAttributeInItem() {
    //   this.showSuggestAttribute = false;
    // },
    // attachValue(list, item) {
    //   item.valueText = "{{" + list.name + "}}";
    //   // item.valueText += '{{' +list.name + '}}' + ' ';
    //   const dataSender = {
    //     itemId: item._id,
    //     valueText: item.valueText,
    //     block: this.block
    //   };
    //   this.$store.dispatch("updateItemBlock", dataSender);
    // },
    // attachValueFixed(fixed, item) {
    //   item.valueText = "{{" + fixed.value + "}}";
    //   const dataSender = {
    //     itemId: item._id,
    //     valueText: item.valueText,
    //     block: this.block
    //   };
    //   this.$store.dispatch("updateItemBlock", dataSender);
    // }
  },
  components: {
    VuePerfectScrollbar
  }
};
</script>
<style lang="scss" scoped>
@import "../index.style";
.custom {
  border-radius: 0.5rem;
  color: #ffffff;
  padding: 0.5rem;
  &:before {
    content: "{{ ";
    color: #ffffff;
  }
  &:after {
    content: " }}";
    color: #ffffff;
  }
}
.custom--item {
  background-color: #ffb94a;
}
.custom--fixed {
  background-color: #906d60;
}
.script--body-text-edit{
  color: #fff;
}
</style>
