<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content py_4">
        <div class="modal--header px_3">
          <div class="title">Bạn bè ngoại trừ...</div>
        </div>
        <!-- Start: Modal Body -->
        <div class="modal--body my_3">
          <!-- Start: Search Area -->
          <div class="search--area position_relative mb_3 mx_3">
            <icon-base
              class="icon--search position_absolute"
              height="20px"
              width="20px"
              viewBox="0 0 20 20"
              icon-name="Tìm kiếm"
            >
              <icon-input-search
              ></icon-input-search>
            </icon-base>
            <input class="search--area-input"
                   type="text"
                   placeholder="Tìm kiếm"
            >
          </div>
          <!-- Start: Search Area -->
          <vue-perfect-scrollbar class="modal--scroll my_3">
            <div class="data--group">
              <!-- Start: Selected Friends -->
              <friend-item
                v-for="( item, index ) in friends"
                :key="`fr-${index}`"
                :friend="item"
              ></friend-item>
              <!-- End: Selected Friends -->
              <!-- Start: All Friends -->
              <div class="title mt_3 mb_2 px_3">Bạn bè</div>
              <friend-item
                v-for="( item, index ) in friends"
                :key="`fri-${index}`"
                :friend="item"
              ></friend-item>
              <!-- End: All Friends -->
            </div>
          </vue-perfect-scrollbar>
        </div>
        <!-- Start: Modal Body -->
        <div class="modal--footer d_flex justify_content_between align_items_center px_3">
          <button
            class="btn--skip"
            @click="closePopup()"
          > {{ $t('chat.common.popup.delete.cancle') }} </button>
          <button
            class="btn--submit"
            @click="submit()"
          >LƯU</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FriendItem from "./friend";

export default {
  components: {
    FriendItem
  },
  data() {
    return {
      friends: [
        {
          name: "Đặng Yến",
          thumbSrc: "https://ae01.alicdn.com/kf/HTB1.M7GbsyYBuNkSnfoq6AWgVXaK/1-5inch-Cute-funny-sugar-cubes-bathing-in-coffee-cup-square-stickr.jpg_640x640.jpg"
        },
        {
          name: "Lê Khang",
          thumbSrc: "https://ae01.alicdn.com/kf/HTB1.M7GbsyYBuNkSnfoq6AWgVXaK/1-5inch-Cute-funny-sugar-cubes-bathing-in-coffee-cup-square-stickr.jpg_640x640.jpg"
        },
        {
          name: "Trần Toản",
          thumbSrc: "https://ae01.alicdn.com/kf/HTB1.M7GbsyYBuNkSnfoq6AWgVXaK/1-5inch-Cute-funny-sugar-cubes-bathing-in-coffee-cup-square-stickr.jpg_640x640.jpg"
        },
        {
          name: "Đặng Yến",
          thumbSrc: "https://ae01.alicdn.com/kf/HTB1.M7GbsyYBuNkSnfoq6AWgVXaK/1-5inch-Cute-funny-sugar-cubes-bathing-in-coffee-cup-square-stickr.jpg_640x640.jpg"
        },
        {
          name: "Lê Khang",
          thumbSrc: "https://ae01.alicdn.com/kf/HTB1.M7GbsyYBuNkSnfoq6AWgVXaK/1-5inch-Cute-funny-sugar-cubes-bathing-in-coffee-cup-square-stickr.jpg_640x640.jpg"
        },
        {
          name: "Trần Toản",
          thumbSrc: "https://ae01.alicdn.com/kf/HTB1.M7GbsyYBuNkSnfoq6AWgVXaK/1-5inch-Cute-funny-sugar-cubes-bathing-in-coffee-cup-square-stickr.jpg_640x640.jpg"
        },
      ]
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    }
  }
}
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
