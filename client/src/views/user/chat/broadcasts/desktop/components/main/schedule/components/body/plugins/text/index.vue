<template>
  <div>
    <div class="text d_flex align_items_center mb_2" :data-theme="currentTheme">
      <div class="p_3 content">
        <div class="text-edit">
          <contenteditable
            class="editable"
            tag="div"
            v-model="item.valueText"
            :placeholder="$t('chat.common.card.text')"
            :contenteditable="true"
            @keyup="upTypingText('itembroadcasts', item)"
            @keydown="clear"
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
  components: {
    DeleteCampaignPopup
  },
  props: ["item", "schedule", "index"],
  data() {
    return {
      isDeleteItemBlock: false,
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
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    upTypingText(type, item) {
      clearTimeout(typingTimer);
      if (type === "itembroadcasts") {
        typingTimer = setTimeout(this.updateSchedule(item), 800);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    // Update item schedule
    async updateSchedule(item) {
      const objSender = {
        bcId: this.index,
        blockId: this.schedule._id,
        contentId: item._id,
        value: item.valueText
      };
      console.log(objSender);
      this.$store.dispatch("updateItemSchedule", objSender);
    }
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
