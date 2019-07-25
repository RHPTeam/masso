<template>
  <div class="avatar--wrapper">
    <div v-if="user.imageAvatar">
      <div
        class="user--info d_flex flex_column justify_content_center align_items_center py_4 position_relative"
      >
        <div class="info position_relative text_center align_items_center">
          <div class="avt--user position_relative">
            <div
              class="user--info-avatar had--avt"
              :style="{
                  backgroundImage: 'url(' + user.imageAvatar + ')'
                }"
            ></div>
            <input type="file" ref="file" @change="selectFile" class="file" />
          </div>
          <div class="user--info-title mt-2">{{ user.name }}</div>
          <div class="user--info-sub mb_3">{{ user.email }}</div>
        </div>
        <div
          class="bg--avt"
          :style="{
                backgroundImage: 'url(' + user.imageAvatar + ')'
              }"
        ></div>
      </div>
      <!--End: User Info Component-->
      <div
        class="popup--wrap-head position_absolute"
        :style="{
              backgroundImage: 'url(' + user.imageAvatar + ')'
            }"
      ></div>
    </div>
    <div v-else>
      <div class="user--info d_flex flex_column justify_content_center align_items_center mt_3">
        <div class="avt--user position_relative">
          <div
            class="user--info-avatar text_center d_flex align_items_center justify_content_center"
          >{{ user.name | getFirstLetter }}</div>
          <input type="file" ref="file" @change="selectFile" class="file" />
        </div>
        <div class="user--info-title mt-2">{{ user.name }}</div>
        <div class="user--info-sub mb_3">{{ user.email }}</div>
      </div>
      <!--End: User Info Component-->
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    getFirstLetter(string) {
      if (typeof string == "undefined") {
        return;
      }
      if (string.length === 0) {
        return;
      }
      return string.charAt(0).toUpperCase();
    }
  },
  props: ["user"],
  data() {
    return {
      isDropZone: false,
      file: ""
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.sendFile();
    },
    sendFile() {
      const formData = new FormData();

      formData.append("profileUrl", this.file);
      this.$store.dispatch("sendFile", formData);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
.file {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  outline: none;
  opacity: 0;
}
.user--info {
  position: relative;
  overflow: hidden;
  color: #ffffff;
  .info {
    z-index: 1;
  }
  .bg--avt {
    position: absolute;
    bottom: 0;
    left: calc(-1 * (400px - (100vw / 2)));
    height: 800px;
    z-index: 0;
    width: 800px;
    border-radius: 50%;
    opacity: 0.5;
  }
  .had--avt {
    &::before {
      content: "Thay đổi";
      font-size: 0.715rem;
      color: #fff;
      font-weight: 400;
      height: 40px;
      line-height: 40px;
      background: #3a3b3aa6;
      display: block;
      text-align: center;
      margin-top: 60%;
      letter-spacing: 0.5px;
    }
  }
  .user--info-avatar {
    width: 100px;
    margin: auto;
    height: 100px;
    border-radius: 50%;
    background-color: #ffb94a;
    background-position: center;
    background-size: cover;
    font-size: 80px;
    font-weight: 800;
    color: #444444;
    overflow: hidden;
  }
  .user--info-title {
    font-size: 24px;
    font-weight: 700;
  }
  .user--info-sub {
    font-size: 14px;
  }
}
</style>
