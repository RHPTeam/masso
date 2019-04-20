<template>
  <div class="wrapper py_4 px_3">
    <div class="item mb_4">
      <span>Tên bài viết</span>
      <input type="text" placeholder="Nhập tên bài viết" />
    </div>
    <div class="item mb_4">
      <span>Nội dung</span>
      <textarea placeholder="Nhập nội dung"></textarea>
    </div>
    <div class="item mb_4">
      <span>Thêm đường dẫn website hoặc youtube</span>
      <input type="text" placeholder="Dán đường dẫn tại đây" />
    </div>
    <div class="item mb_4">
      <span>Thêm hình ảnh</span>
      <div
        class="gallery d_flex justify_content_start align_items_center flex_wrap m_n1"
      >
        <div class="gallery--block position_relative m_1">
          <img
            src="https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&imageId=1279387-847__1&recipeName=350"
            alt
          />
        </div>
        <div class="gallery--block position_relative m_1">
          <img
            src="https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg"
            alt
          />
        </div>
        <div class="gallery--block position_relative m_1">
          <img
            src="https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/26/40/90/264090b4-017b-758e-9e32-f4cb602fe70e/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-4.png/246x0w.jpg"
            alt
          />
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
      <br />
      <b>select</b>
    </div>
    <div class="item">
      <button>Lưu</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #ffffff;
  border-radius: 10px;
  .item {
    font-size: 14px;
    > span {
      color: #000;
      font-weight: 600;
    }
    > input,
    > textarea {
      border: solid 1px #e4e4e4;
      border-radius: 0.5rem;
      font-size: 14px;
      margin-top: 0.75rem;
      outline: none;
      transition: all 0.4s ease;
      width: 100%;
      &:focus {
        border-color: #ffb94a;
      }
    }
    > input {
      padding: 0 0.75rem;
      height: 40px;
    }
    > textarea {
      height: 170px;
      padding: 0.75rem;
      resize: none;
    }
    > button {
      background-color: #ffb94a;
      border: solid 1px #ffb94a;
      border-radius: 0.5rem;
      color: #fff;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      height: 40px;
      outline: none;
      transition: all 0.4s ease;
      width: 80px;
      &:hover {
        background-color: transparent;
        color: #ffb94a;
      }
    }
  }
}
.gallery {
  margin-top: 0.75rem !important;
  .gallery--block {
    border-radius: 5px;
    overflow: hidden;
    width: 100px;
    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }
    &-add,
    img {
      position: absolute;
      width: 100%;
    }
    img {
      height: auto;
      left: 50%;
      max-width: none;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &-add {
      border-radius: 5px;
      border: dashed 1px #e4e4e4;
      color: #ccc;
      cursor: pointer;
      height: 100%;
      left: 0;
      top: 0;
      transition: all 0.4s ease;
      &:hover {
        border: 1px solid #ffb94a;
        color: #ffb94a;
      }
    }
  }
}

// RESPONSIVE

@media only screen and (max-width: 1366px) {
  .gallery {
    .gallery--block {
      width: 80px;
    }
  }
}
@media only screen and (max-width: 1200px) {
  .gallery {
    .gallery--block {
      width: 100px;
    }
  }
}
@media only screen and (max-width: 1024px) {
  .gallery {
    .gallery--block {
      width: 80px;
    }
  }
}
</style>
