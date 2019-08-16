<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content position_relative py_4 px_4">
        <!-- Start: Modal Header -->
        <div class="header position_absolute" @click="closePopup">
          <div class="icon--close">
            <icon-base
              icon--name="Hủy"
              height="12"
              width="12"
              viewBox="0 0 20 20"
            >
              <icon-close></icon-close>
            </icon-base>
          </div>
        </div>
        <!-- Start: Modal Header -->

        <!-- Start: Modal Body -->
        <div class="body pt_3 d_flex">
          <!-- Start: Modal Content -->
          <div class="left">
            <div class="title mb_3">
              <input type="text" placeholder="Nhập tên chiến dịch" />
            </div>
            <div class="multi mb_3">
              <multiselect
                placeholder="Chọn danh mục bài đăng"
              />
            </div>
            <div class="timer">
              <div class="d_flex align_items_center mb_3">
                <div>Thời gian bắt đầu:</div>
                <div>
                  <date-picker
                    :value="new Date()"
                    class="ml_3 mr_2"
                    format="DD/MM/YYYY"
                  />
                </div>
              </div>
              <div class="d_flex align_items_center mb_3">
                <div>Thời gian kết thúc:</div>
                <div>
                  <date-picker
                    :value="new Date()"
                    class="ml_3 mr_2"
                    format="DD/MM/YYYY"
                  />
                </div>
              </div>
              <div class="time--loop d_flex align_items_center">
                <div>Chiến dịch lặp lại sau:</div>
                <div class="ml_3 mr_3">
                  <input type="number" placeholder="10" class="text_center" />
                </div>
                <div><span>ngày</span></div>
              </div>
            </div>
          </div>
          <!-- Start: Modal Content -->

          <!-- Start: Modal Sidebar -->
          <div class="right ml_3">
            <div class="desc mb_3">Thêm vào chiến dịch</div>
            <div class="position_relative mb_3">
              <div
                class="advance d_flex align_items_center"
                @click="isShowAdvanceContent = !isShowAdvanceContent"
              >
                <div class="icon icon--mix mr_2">
                  <icon-base
                    height="14px"
                    width="14px"
                    viewBox="0 0 580 580"
                  >
                    <icon-mix></icon-mix>
                  </icon-base>
                </div>
                <span>Nội dung nâng cao</span>
              </div>
              <transition>
                <advance-content
                  v-if="isShowAdvanceContent === true"
                  @close="isShowAdvanceContent = $event"
                />
              </transition>
            </div>

            <div class="action text_center">Tạo mới</div>
          </div>
          <!-- End: Modal Sidebar -->
        </div>
        <!-- End: Modal Body -->
      </div>
    </div>
  </div>
</template>

<script>
import AdvanceContent from "./mix";
export default {
  components: {
    AdvanceContent
  },
  props: ["currentTheme"],
  data() {
    return {
      isShowAdvanceContent: false
    }
  },
  methods: {
    closePopup() {
      this.$emit("close", false);
    }
  },
}
</script>

<style lang="scss" scoped>
  @import "./index.style";
</style>
