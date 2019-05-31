<template>
  <div>
    <div class="card card_body script--body-image p_0">
      <div class="script--body-delete" @click="isDeleteItemBlock = true">
        <icon-base
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </div>
      <div class="script--body-move d_none">
        <icon-base
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 64 64"
        >
          <icon-move />
        </icon-base>
      </div>
      <div class="scrip--body-image-link">
        <div
          class="default"
        ></div>
        <!-- <img width="280" height="207" /> -->
      </div>
      <div class="script--body-upload-image">
        <form enctype="multipart/form-data">
          <input
            type="file"
            ref="file"
            id="upload_image"
          />
        </form>
        <div class="script--body-image-icon">
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
          <span>{{ $t('chat.common.card.uploadImage') }}</span>
        </div>
      </div>
    </div>
    <!--Start:Delete Item Popup-->
    <transition name="popup">
      <delete-campaign-popup
          v-if="isDeleteItemBlock === true"
          :data-theme="currentTheme"
          title="Delete Image"
          @closePopup="isDeleteItemBlock = $event"
          storeActionName="deleteImage"
          typeName="Image"
      ></delete-campaign-popup>
    </transition>
    <!--End: Delete Item Popup-->
  </div>
</template>
<script>
import DeleteCampaignPopup from "@/components/popups/delete";
export default {
  props: ["index.vue", "block"],
  data() {
    return {
      isDeleteItemBlock: false,
      file: "",
      srcDefault: require("@/assets/images/message/logo.png")
    };
  },
  methods: {
    // selectFile(id) {
    //   this.file = this.$refs.file.files[0];
    //   this.sendFile(id);
    // },
    // sendFile(id) {
    //   const formData = new FormData();
    //   formData.append("file", this.file);
    //   const objSender = {
    //     id: id,
    //     formData: formData,
    //     block: this.block
    //   };
    //   this.$store.dispatch("updateItemImageBlock", objSender);
    // }
  },
  computed: {    
    currentTheme() {
      return this.$store.getters.themeName;
    },
  },
  components:{
    DeleteCampaignPopup
  }
};
</script>
<style lang="scss" scoped>
@import "../../index.style";
.default {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 280px;
  height: 207px;
  opacity: 0.3;
}

</style>
