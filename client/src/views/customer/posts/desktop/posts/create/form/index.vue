<template>
  <div class="wrapper py_4 px_3" :data-theme="currentTheme">
    <div class="item mb_4">
      <span>Tên bài viết</span>
      <input type="text" class="input" placeholder="Nhập tên bài viết" />
    </div>
    <div class="item mb_4">
      <span>Nội dung</span>
      <textarea class="input" placeholder="Nhập nội dung"></textarea>
    </div>
    <div class="item mb_4">
      <span>Thêm đường dẫn website hoặc youtube</span>
      <input class="input" type="text" placeholder="Dán đường dẫn tại đây" />
    </div>
    <div class="item mb_4">
      <span>Thêm hình ảnh</span>
      <div
        class="gallery d_flex justify_content_start align_items_center flex_wrap m_n1"
      >
        <div class="gallery--block position_relative m_1"
          v-for="(image, index) in images"
          :key="index"
        >
          <img
            :src="image"
            alt
          />
          <div class="gallery--block-mask d_flex align_items_center justify_content_center">
            <div class="btn--remove">
              <icon-base
                class="icon--remove"
                icon-name="remove"
                width="20"
                height="20"
                viewBox="0 0 15 15"
              >
                <icon-remove />
              </icon-base>
            </div>
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
              <icon-plus />
            </icon-base>
          </label>
          <input id="file-upload" hidden type="file" />
        </div>
      </div>
    </div>
    <div class="item mb_4">
      <span>Danh mục</span>
      <multiselect
        class="mt_3"
        multiple
        :options="categories"
        :maxHeight="200"
        placeholder="Chọn danh mục"
      />
    </div>
    <div class="item">
      <button>Lưu</button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      categories: [ "Mỹ phẩm", "Du lịch", "Ăn uống", "Thể thao", "Làm đẹp", "Âm nhạc" ],
      images: [ 
        "https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&imageId=1279387-847__1&recipeName=350", 
        "https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg",
        "https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/26/40/90/264090b4-017b-758e-9e32-f4cb602fe70e/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-4.png/246x0w.jpg"
      ]
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style";
</style>
