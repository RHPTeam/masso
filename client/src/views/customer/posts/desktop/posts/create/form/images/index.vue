<template>
  <div class="px_2">
    <VuePerfectScrollbar class="gallery justify_content_start align_items_center flex_wrap m_n1">
    <div class="gallery--block position_relative m_1" v-for="(item, index) in post.attachments" :key="index">
      <div class="block--img">
        <img :src="item.link" alt>
      </div>
      <div class="block--bg position_absolute d_flex align_items_center justify_content_center">
        <icon-base
          class="icon--remove"
          icon-name="remove"
          width="20px"
          heigh="20px"
          viewBox="0 0 16 16"
        >
          <icon-remove/>
        </icon-base>
      </div>
    </div>
    <div class="gallery--block position_relative m_1">
      <label
        for="file-upload"
        class="gallery--block-add d_flex align_items_center justify_content_center"
      >
        <icon-base
          class="icon--add"
          icon-name="plus"
          width="30"
          height="30"
          viewBox="0 0 60 60"
        >
          <icon-plus/>
        </icon-base>
      </label>
      <form enctype="multipart/form-data" @submit.prevent="sendFile">
        <input id="file-upload" hidden type="file" ref="file" @change="selectFile(post._id)" accept="image/x-png,image/gif,image/jpeg" multiple />
      </form>
    </div>
    </VuePerfectScrollbar>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object
    }
  },
  data() {
    return {
      file: "",
      imageDefault: require( "@/assets/images/upload/bee-default.jpg" )
    };
  },
  methods: {
    selectFile(id) {
      this.file = this.$refs.file.files;
      this.sendFile(id);
    },
    sendFile() {
      const formData = new FormData();
      Array.from(this.file).forEach((f) => {
        formData.append("attachments", f)
      });
      const objSender = {
        id: this.post._id,
        formData: formData
      };
      this.$store.dispatch( "updateAttachmentPost", objSender );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../index.style";
</style>
