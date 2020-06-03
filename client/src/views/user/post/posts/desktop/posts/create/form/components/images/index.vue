<template>
  <div class="px_2">
    <VuePerfectScrollbar class="gallery justify_content_start align_items_center flex_wrap m_n1" :data-theme="currentTheme">
      <div class="gallery--block position_relative m_1" v-for="(item, index) in post.attachments" :key="index">
        <div class="block--img">
          <img :src="item.link" alt>
        </div>
        <div class="block--bg position_absolute d_flex align_items_center justify_content_center"
             @click="deleteImageAttachmentPost(item.link)">
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
      imageDefault: require("@/assets/images/upload/bee-default.jpg")
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    postAttachmentsUpload() {
      return this.$store.getters.postAttachmentsUpload;
    }
  },
  methods: {
    deleteImageAttachmentPost( link ) {
      const res = this.post.attachments.filter( ( item ) => {
        return item.link !== link;
      } );

      this.$emit( "updatePostAttachments", res );
    },
    selectFile() {
      this.file = this.$refs.file.files;

      // const position = this.file.map((item, index) => {
      //   if(item.size > 5242880) {
      //     return index;
      //   }
      // });
      //
      // if(position) {
      //
      //   this.file = this.file.splice(position, 1);
      //   this.$emit("openPopupDeleteImage", true);
      //
      // }else {
      //
      //   this.sendFile();
      //
      //   // reset ref
      //   const input = this.$refs.file;
      //   input.type = "text";
      //   input.type = "file";
      // }

      this.sendFile();

      // reset ref
      const input = this.$refs.file;
      input.type = "text";
      input.type = "file";

    },
    async sendFile() {
      const formData = new FormData();

      Array.from(this.file).forEach(f => {
        formData.append("attachments", f);
      });

      await this.$store.dispatch( "uploadPostAttachments", formData );
      const uploadFiles = this.postAttachmentsUpload.map( ( item ) => {
        return {
          link: item,
          typeAttachment: 1
        }
      } );
      this.post.attachments = this.post.attachments.concat( uploadFiles );

    }
  }
};
</script>
<style lang="scss" scoped>
  @import "../../index.style";
</style>
