<template>
  <div>
    <div class="text d_flex align_items_center mb_2" :data-theme="currentTheme">
      <div class="p_3 content">
        <div class="text-edit">
          <contenteditable
            class="editable"
            tag="div"
            placeholder="Nhập văn bản..."
            :contenteditable="true"
            v-model="title"
          />
        </div>
      </div>
      <div class="body--icon ml_2" @click="isDeleteItemBlock = true">
        <div class="icon--delete">
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </div>
        <div class="icon--move d_none">
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 64 64"
          >
            <icon-move />
          </icon-base>
        </div>
      </div>
    </div>
    <!-- Start: Delete Item Popup-->
    <transition name="popup">
      <delete-campaign-popup
          v-if="isDeleteItemBlock === true"
          :data-theme="currentTheme"
          title="Delete Property"
          @closePopup="isDeleteItemBlock = $event"
          storeActionName="deleteProperty"
          typeName="Property"
      ></delete-campaign-popup>
    </transition>
    <!-- End: Delete Item Popup -->
  </div>
</template>
<script>
import BroadcastService from "@/services/modules/chat/broadcast.service";
import StringFunction from "@/utils/functions/string";
import DeleteCampaignPopup from "@/components/popups/delete";

// import VuePerfectScrollbar from "vue-perfect-scrollbar";

let typingTimer;

export default {
  props: ["item", "schedule"],
  data() {
    return {
      isDeleteItemBlock: false,
      title: "AAAAAAAA"
      // showSuggestAttribute: false,
      // listAttribute: null,
      // resultFilterAttr: null,
      // dataFixed: [
      //   { id: 0, value: "Danh xưng" },
      //   { id: 1, value: "Tên" },
      //   { id: 2, value: "Họ tên" }
      // ]
    };
  },
  methods: {
    // upTypingText(type, group) {
    //   clearTimeout(typingTimer);
    //   if (type === "itembroadcasts") {
    //     typingTimer = setTimeout(this.updateSchedule(group), 800);
    //   }
    // },
    // clear() {
    //   clearTimeout(typingTimer);
    // },
    // // Update item schedule
    // async updateSchedule(group) {
    //   let result = await BroadcastService.index();
    //   result = result.data.data.filter(
    //     item =>
    //       StringFunction.convertUnicode(item.typeBroadCast)
    //         .toLowerCase()
    //         .trim() === "thiet lap bo hen"
    //   );
    //   const objSender = {
    //     bcId: result[0]._id,
    //     blockId: this.$store.getters.schedule._id,
    //     contentId: group._id,
    //     value: group.valueText
    //   };
    //   this.$store.dispatch("updateItemSchedule", objSender);
    // }
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
    //   console.log(dataSender);
    //   this.$store.dispatch("updateItemBlock", dataSender);
    // },
    // attachValueFixed(fixed, item) {
    //   item.valueText = fixed.value;
    //   const dataSender = {
    //     itemId: item._id,
    //     valueText: item.valueText,
    //     block: this.block
    //   };
    //   console.log(dataSender);
    //   this.$store.dispatch("updateItemBlock", dataSender);
    // }
  },
  computed: {    
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    // VuePerfectScrollbar,
    DeleteCampaignPopup
  }
};
</script>
<style lang="scss" scoped>
@import "../../index.style";
.icon--delete{
  transition: 0.3s;
  &:hover{
    cursor: pointer;
    color: #fdb849;
  }
}
</style>
