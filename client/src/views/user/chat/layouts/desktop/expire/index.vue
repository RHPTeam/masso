<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4" v-click-outside="closePopup">
        <div class="modal--header d_flex flex_column align_items_center justify_content_center">
          <div class="title text_center">Gia hạn tài khoản</div>
          <div class="divine mt_2 mb_2"></div>
        </div>
        <div class="modal--body my_3">
          <div class="item--header d_flex align_items_center">
            <div class="items text_center function">
              <icon-base
                icon-name="ZinBee"
                width="132.92"
                height="49.73"
                viewBox="0 0 250.446 93.703"
              >
                <icon-logo />
              </icon-base>
            </div>
            <div class="items text_center main--price first">
              <ul>
                <li class="month">1 THÁNG</li>
                <li class="money">2.800.000đ</li>
                <li class="register">
                  <a
                    href="https://www.facebook.com/zinbeeauto/?ref=br_tf&epa=SEARCH_BOX"
                    target="_blank"
                  >Liên hệ</a
                  >
                </li>
              </ul>
            </div>
            <div class="items text_center main--price">
              <ul>
                <li class="month">6 THÁNG</li>
                <li class="money">16.199.000đ</li>
                <li class="register">
                  <a
                    href="https://www.facebook.com/zinbeeauto/?ref=br_tf&epa=SEARCH_BOX"
                    target="_blank"
                  >Liên hệ</a
                  >
                </li>
              </ul>
            </div>
            <div class="items text_center main--price">
              <ul>
                <li class="month">1 NĂM</li>
                <li class="money">28.799.000đ</li>
                <li class="register">
                  <a
                    href="https://www.facebook.com/zinbeeauto/?ref=br_tf&epa=SEARCH_BOX"
                    target="_blank"
                  >Liên hệ</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="item--body text_center">
            <VuePerfectScrollbar class="scroll--price">
              <div class="items d_flex align_items_center">
                <div class="items--main function">Tài khoản facebook</div>
                <div class="items--main">1</div>
                <div class="items--main">2</div>
                <div class="items--main">2</div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="items--main function">Pages</div>
                <div class="items--main">Không giới hạn</div>
                <div class="items--main">Không giới hạn</div>
                <div class="items--main">Không giới hạn</div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="items--main function">Groups</div>
                <div class="items--main">Không giới hạn</div>
                <div class="items--main">Không giới hạn</div>
                <div class="items--main">Không giới hạn</div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="items--main function">Tìm nội dung hot</div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tìm nội dung hot"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tìm nội dung hot"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tìm nội dung hot"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="items--main function">Tự động tìm nội dung</div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tự động tìm nội dung"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tự động tìm nội dung"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tự động tìm nội dung"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="items--main function">Tự động đăng bài</div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tự động đăng bài"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tự động đăng bài"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tự động đăng bài"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="items--main function">Tự động like</div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tự động like"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tự động like"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tự động like"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="items--main function">Tự động huỷ kết bạn</div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tự động huỷ kết bạn"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tự động huỷ kết bạn"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
                <div class="items--main">
                  <icon-base
                    icon-name="Tự động huỷ kết bạn"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
              </div>
              <div class="items d_flex align_items_center">
                <div class="items--main function">Chatbot profile</div>
                <div class="items--main">
                  <icon-base
                    icon-name="Chatbot profile"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
                <div class="items--main">
                  <icon-base
                    icon-name="Chatbot profile"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
                <div class="items--main">
                  <icon-base
                    icon-name="Chatbot profile"
                    class
                    width="20"
                    height="20"
                    viewBox="0 0 290 290"
                  >
                    <icon-check-circle />
                  </icon-base>
                </div>
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn--skip" @click="closePopup"></button>
          <button class="btn--submit" @click="closePopup">
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {

    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit("close", false);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "index.style";
</style>
