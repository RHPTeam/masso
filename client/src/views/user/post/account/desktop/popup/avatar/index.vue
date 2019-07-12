<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4" v-click-outside="closePopup">
        <div class="modal--header">
          <div class="title text_left">Thay ảnh đại diện</div>
        </div>
        <div class="modal--body d_flex align_items_center justify_content_center my_3">
          <form @submit.prevent="sendFile" class="zone" enctype="multipart/form-data">
            <div class="field">
              <div class="file box primary">
                <label class="file--label" style="cursor: pointer">
                  <input type="file" ref="file" @change="selectFile" style="display: none">
                  <span class="file--cta d_flex align_items_center justify_content_center flex_column">
                    <span class="file--cta-icon">
                      <icon-base
                        icon-name="upload-image"
                        class="icon-sort-down"
                        width="90"
                        height="90"
                        viewBox="0 0 22 22"
                      >
                        <icon-upload-image/>
                      </icon-base>
                    </span>
                    <span
                      class="file--cta-label"
                      style="font-size: 1.25rem; font-weight: 700"
                    >Chọn một ảnh...</span>
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn--submit ml_auto" @click="closePopup">HỦY</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    fileAvatar() {
      return this.$store.getters.fileAvatar;
    }
  },
  methods: {
    closePopup() {
      this.$emit("close", false);
    },
    selectFile() {
      this.file = this.$refs.file.files[ 0 ];
      this.sendFile();
    },
    sendFile() {
      const formData = new FormData();

      formData.append( "profileUrl", this.file );
      this.$store.dispatch( "sendFile", formData );
      this.closePopup();
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "index.style";
</style>
