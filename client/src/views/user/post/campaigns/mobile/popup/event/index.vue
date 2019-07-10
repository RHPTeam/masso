<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content">
        <!-- Start: Modal Header -->
        <div class="modal--header d_flex align_items_center">
          <div @click="closePopup">
            <icon-base
              icon-name="arrow-down"
              class="arrow-down"
              width="20"
              height="20"
              viewBox="0 0 130 130"
            >
              <icon-arrow-down />
            </icon-base>
          </div>
          <p class="name--modal mb_0 m_auto">Tạo sự kiện</p>
          <div class="active mr_3" @click="createEvent">Tạo</div>
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div class="modal--body px_2 mt_2">
          <div class="d_flex">
            <div
              class="ml_auto"
              @click="isShowColorDropdown = !isShowColorDropdown"
            >Thay đổi màu sắc</div>
            <!-- Start: Change color dropdown -->
            <div class="dropdown--menu" v-if="isShowColorDropdown" v-click-outside="closeColorGrid">
              <div class="r mx_0">
                <div class="dropdown--menu-item" v-for="(i, index) in 3" :key="index">
                  <div
                    class="grid"
                    :style="{ backgroundColor: colors[index] }"
                    @click="changeColor(colors[index])"
                  ></div>
                </div>
              </div>
              <div class="r mx_0">
                <div class="dropdown--menu-item" v-for="(i, index) in 3" :key="`s-${index}`">
                  <div
                    class="grid"
                    :style="{ backgroundColor: colors[index + 3] }"
                    @click="changeColor(colors[index + 3])"
                  ></div>
                </div>
              </div>
            </div>
            <!-- End: Change color dropdown -->
          </div>
          <!-- Start: Name event -->
          <div class="items">
            <p class="title mb_2">Tên sự kiện</p>
            <input type="text" placeholder="Nhập tên sự kiện" class="name--event" />
          </div>
          <!-- Start: Time -->
          <div class="items d_flex align_items_center" @click="showPopupTime">
            <div class="item">
              <p class="title mb_0">Chọn thời gian</p>
              <div class="content">11:00 ngày 01/01/2018</div>
            </div>
            <icon-base
              icon-name="arrow-down"
              class="arrow-down ml_auto"
              width="20"
              height="20"
              viewBox="0 0 130 130"
            >
              <icon-arrow-down />
            </icon-base>
          </div>
          <!-- Start: Category - Post -->
          <div class="items d_flex align_items_center" @click="showPopupCategory">
            <div class="item">
              <p class="title mb_0">Chọn danh mục hoặc bài viết</p>
              <div class="content">Danh mục A</div>
            </div>
            <icon-base
              icon-name="arrow-down"
              class="arrow-down ml_auto"
              width="20"
              height="20"
              viewBox="0 0 130 130"
            >
              <icon-arrow-down />
            </icon-base>
          </div>
          <!-- Start: Address to post -->
          <div class="items d_flex align_items_center" @click="showPopupPostPlace">
            <div class="item">
              <p class="title mb_0">Chọn nơi đăng</p>
              <div class="content">1 TCN, 2 Group, 1 Fanpage</div>
            </div>
            <icon-base
              icon-name="arrow-down"
              class="arrow-down ml_auto"
              width="20"
              height="20"
              viewBox="0 0 130 130"
            >
              <icon-arrow-down />
            </icon-base>
          </div>
        </div>
        <!-- End: Modal Body -->
      </div>

      <!-- Start: Transition Popup -->
      <transition name="popup--mobile">
        <popup-time v-if="isShowPopupTime === true" @closePopup="isShowPopupTime = $event"/>
        <popup-category v-if="isShowPopupCategory === true"/>
        <popup-post-place v-if="isShowPopupPostPlace === true"/>
      </transition>
      <!-- End: Transition Popup -->
    </div>
  </div>
</template>

<script>
import PopupTime from "./components/time";
import PopupCategory from "./components/category";
import PopupPostPlace from "./components/postplace";
export default {
  components: {
    PopupTime,
    PopupCategory,
    PopupPostPlace
  },
  data() {
    return {
      colors: [
        "#85CFFF",
        "#BE92E3",
        "#7BD48A",
        "#999999",
        "#FFB94A",
        "#FF8787"
      ],
      isShowColorDropdown: false,
      isShowPopupTime: false,
      isShowPopupCategory: false,
      isShowPopupPostPlace: false

    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    event() {
      return this.$store.getters.event;
    }
  },
  methods: {
    closeColorGrid() {
      this.isShowColorDropdown = false;
    },
    changeColor(value) {
      this.$store.dispatch("setEvent", {
        key: "color",
        value: value
      });
      this.isShowColorDropdown = false;
    },
    closePopup() {
      this.$emit("closePopup", false);
    },
    createEvent() {
      this.closePopup();
    },
    showPopupTime() {
      this.isShowPopupTime = true;
    },
    showPopupCategory() {
      this.isShowPopupCategory = true;
    },
    showPopupPostPlace() {
      this.isShowPopupPostPlace = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
