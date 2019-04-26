<template>
  <div class="gallery d_flex justify_content_start align_items_center flex_wrap m_n1">
    <div class="gallery--block position_relative m_1">
      <img :src="imageDefault" alt>
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
      <input id="file-upload" hidden type="file">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageDefault: require( "@/assets/images/upload/bee-default.jpg" )
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../index.style";
</style>
