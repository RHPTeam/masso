<template>
  <div class="">
    <div class="images d_flex align_items_center position_relative mb_2">
      <div class="image--link">
        <div
          class="default"
        ></div>
        <!-- <img width="280px" height="207px" /> -->
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
        <div class="icon--move d_none mt_1 mb_1">
          <icon-base
            icon-name="remove"
            width="20"
            height="20"
            viewBox="0 0 64 64"
          >
            <icon-move />
          </icon-base>
        </div>
        <div class="icon--plus d_none">
          <icon-base
            icon-name="plus"
            width="20"
            height="20"
            viewBox="0 0 64 64"
          >
            <icon-plus />
          </icon-base>
        </div>
      </div>
      <div class="upload--image position_absolute">
        <form enctype="multipart/form-data">
          <input
            type="file"
            ref="file"
            id="upload_image"
          />
        </form>
        <div class="image--icon">
          <div class="icon-image">
            <icon-base
              class="icon-image"
              width="32"
              height="32"
              viewBox="0 0 26 26"
              name="upload-image"
            >
              <icon-upload-image />
            </icon-base>
          </div>
          <span>{{ $t("chat.common.card.uploadImage") }}</span>
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

export default {
  props: ["index.vue", "schedule"],
  data() {
    return {
      isDeleteItemBlock: false,
      file: "",
      srcDefault: require("@/assets/images/message/logo.png")
    };
  },
  methods: {
    async getSchedules() {
      let result = await BroadcastService.index1();
      result = result.data.data.filter(
        item =>
          StringFunction.convertUnicode(item.typeBroadCast)
            .toLowerCase()
            .trim() === "thiet lap bo hen"
      );
      return result[0];
    },
    selectFile(id) {
      this.file = this.$refs.file.files[0];
      this.sendFile(id);
    },
    async sendFile(id) {
      const formData = new FormData();
      formData.append("file", this.file);
      const schedules = await this.getSchedules();
      const objSender = {
        bcId: schedules._id,
        blockId: this.schedule._id,
        contentId: id,
        value: formData
      };
      this.$store.dispatch("updateItemImageSchedule", objSender);
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }    
  },
  components: {
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
.default {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 280px;
  height: 207px;
  opacity: 0.3;
}

.upload--image{
  background: #fff;
  color: #000;
}
</style>
