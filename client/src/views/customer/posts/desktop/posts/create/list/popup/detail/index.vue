<template>
  <div
    class="modal--wrapper position_fixed d_flex justify_content_center align_items_center"
  >
    <div class="modal--content p_4">
      <VuePerfectScrollbar class="detail--scroll">
        <p>🔥LIVESTREAM 20h TỐI NAY ON SÓNG #Hàng_mới_về🔥</p>

        <p>
          🎈OMG nhân dịp NHIỀU CỰC PHẨM #Hàng_mới_về xinh yêu quá nên tối nay
          20h FRI quyết định sẽ LIVESTREAM để UP DATE cho các nàng những mẫu NEW
          ARRIVAL để các nàng tha hồ lựa chọn nhaaaa🎊🎊
        </p>

        <p>
          💯Rất nhiều mẫu áo phông hot hít, baby doll, áo ren, áo trễ vai, váy
          đang làm mưa làm gió ở Friday sẽ được khui hết trong live đó nhaaa
        </p>

        <p>
          ⚠️VÀ ĐẶC BIỆT SẼ CÓ MỘT MÓN QUÀ VÔ CÙNG BẤT NGỜ dành cho 1 bạn may mắn
          nhất.⚠️
          <br />💪CÙNG ĐÓN ĐỢI XEM MÓN QUÀ MAY MẮN NÀY LÀ GÌ VÀO TỐI NAY NHÉ
        </p>

        <p>
          ✌Hãy “.” Để chúng mình xem những cánh tay nào đang hóng Livestream
          tối nay nhà FRI nào các bạn ơi!!!
        </p>

        <p>
          🛵🛵🛵
          <br />Friday ship COD toàn quốc <br />📌 Nội thành HN: đồng giá 20k
          <br />📌 Ship COD ngoại thành và tỉnh: đồng giá 30k ( 25k chuyển khoản
          trước) <br />📌 Ưu đãi phí ship khi đặt hàng trên shopee
        </p>
        🐰Facebook: http://m.me/fridayshophn <br />🐰Shopee: friday.official
        <br />🐰Instagram: fridayshop.official
      </VuePerfectScrollbar>
      <div
        class="gallery d_flex justify_content_start align_items_center flex_wrap"
      >
        <div class="gallery--block position_relative">
          <div class="image--wrap position_relative">
            <img
              src="https://images.costco-static.com/ImageDelivery/imageService?profileId=12026540&imageId=1279387-847__1&recipeName=350"
              alt
            />
          </div>
        </div>
        <div class="gallery--block position_relative">
          <div class="image--wrap position_relative">
            <img
              src="https://pbs.twimg.com/profile_images/883859744498176000/pjEHfbdn_400x400.jpg"
              alt
            />
          </div>
        </div>
        <div class="gallery--block position_relative">
          <div class="image--wrap position_relative">
            <img
              src="https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/26/40/90/264090b4-017b-758e-9e32-f4cb602fe70e/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-4.png/246x0w.jpg"
              alt
            />
          </div>
        </div>
        <div class="gallery--block position_relative">
          <div class="image--wrap position_relative">
            <img
              src="https://is1-ssl.mzstatic.com/image/thumb/Purple124/v4/26/40/90/264090b4-017b-758e-9e32-f4cb602fe70e/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-4.png/246x0w.jpg"
              alt
            />
          </div>
          <div
            class="gallery--block-more d_flex align_items_center justify_content_center position_absolute"
          >
            +2
          </div>
        </div>
      </div>
      <div
        class="reaction d_flex justify_content_start align_items_center mb_4"
      >
        <div
          class="reaction--item d_flex justify_content_start align_items_center"
        >
          <span class="reaction--item-icon">
            <icon-base
              icon-name="icon-like"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-like />
            </icon-base>
          </span>
          <span class="reaction--item-number ml_1">1018</span>
        </div>
        <div
          class="reaction--item d_flex justify_content_start align_items_center ml_3"
        >
          <span class="reaction--item-icon">
            <icon-base
              icon-name="icon-share"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-share />
            </icon-base>
          </span>
          <span class="reaction--item-number ml_1">354</span>
        </div>
      </div>
      <div class="action d_flex justify_content_end align_items_center">
        <button class="btn--cancel" @click="closePopupDetail">Hủy</button>
        <button class="btn--edit ml_4">Chỉnh sửa</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closePopupDetail() {
      this.$emit("closePopupDetail", false);
    }
  }
};
</script>

<style scoped lang="scss">
.modal--wrapper {
  // background-color: rgba(153, 153, 153, 0.5);
  height: 100vh;
  left: 0;
  max-height: 100vh;
  top: 0;
  width: 100%;
  z-index: 1050;
  .modal--content {
    background-color: #ffffff;
    border-radius: 8px;
    width: 750px;
  }
}
.detail--scroll {
  max-height: calc(100vh - 450px);
  min-height: 150px;
}
.gallery {
  background-color: #ffffff;
  margin: 1.5rem -0.375rem 1rem -0.375rem;
  .gallery--block {
    border-radius: 5px;
    overflow: hidden;
    width: calc(25% - 0.75rem);
    margin: 0 0.375rem;
    &-more {
      background-color: rgba(153, 153, 153, 0.5);
      color: #fff;
      font-size: 2.5rem;
      font-weight: 600;
      height: 100%;
      left: 0;
      top: 0;
      width: 100%;
    }
  }
  .image--wrap {
    width: 100%;
    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }

    img {
      height: auto;
      left: 50%;
      max-width: none;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
  }
}

.reaction {
  &--item {
    > span {
      line-height: 1.2;
    }
    &-number {
      color: #666;
      font-size: 14px;
      font-weight: 600;
    }
  }
}

.action {
  button {
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    height: 40px;
    outline: none;
    transition: all 0.4s ease;
    width: 112px;
    &.btn--cancel {
      color: #ffb94a;
      &:hover {
        border-color: #ffb94a;
      }
    }
    &.btn--edit {
      background-color: #ffb94a;
      border-color: #ffb94a;
      color: #fff;
      &:hover {
        background-color: transparent;
        color: #ffb94a;
      }
    }
  }
}

/*Transition popup*/
.popup-enter {
  transform: translateY(-100%);
}
.popup-enter-to {
  transition: transform 0.75s;
  transform: translateY(0);
}
.popup-leave-to {
  transition: transform 0.75s;
  transform: translateY(-100%);
}
</style>
