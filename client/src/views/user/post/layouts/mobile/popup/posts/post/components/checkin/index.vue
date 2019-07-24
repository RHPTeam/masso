<template>
  <div class="tag">
    <div class="content">
      <div class="items--header d_flex align_items_center pt_2">
        <div @click="closeAddress">
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
        <div class="title">Chọn địa điểm</div>
        <div class="edit mr_3">Xong</div>
      </div>
      <div class="items--body d_flex align_items_center px_2 mt_3">
        <div class="fixed text_center">Tại</div>
        <div class="option position_relative">
          <div class="input--place">
            <input
              type="text"
              placeholder="Bạn đang ở đâu?"
              v-model="placesName"
              v-click-outside="closeAddress"
              @click="isShowSuggestDefault = true"
              @input="searchPlaces"
            />
          </div>
          <div
            class="suggest position_absolute"
            :data-theme="currentTheme"
            v-if="isShowSuggestDefault === true"
          >
            <VuePerfectScrollbar class="show">
              <div
                v-if="this.$store.getters.faceBStatus === 'loading'"
                class="loading--block d_flex align_items_center justify_content_center py_3"
              >
                <loading-component class="text_center" />
              </div>
              <div v-else v-for="(item, index) in placesPopular" :key="index">
                <div class="item--tag d_flex align_items_center" @click="attachPlacesName(item)">
                  <div class="avatar">
                    <div class="avatar--bg" :style="{ backgroundImage: 'url('+item.photo+')' }"></div>
                  </div>
                  <div class="desc ml_2">
                    <div class="name">{{ item.title }}</div>
                    <div class="address">{{ item.subtitle }}</div>
                  </div>
                </div>
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StringFunction from "@/utils/functions/string";

export default {
  props: {
    post: {
      type: Object
    }
  },
  data() {
    return {
      placesName: "",
      isShowSuggestDefault: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    placesPopular() {
      return this.$store.getters.places;
    }
  },
  async created() {
    if (this.post.place) {
      this.placesName = this.post.place.text;
    }
  },
  methods: {
    attachPlacesName(item) {
      this.placesName = item.title;
      this.$emit("updateCheckin", {
        id: item.uniqueID,
        text: item.title
      });

      this.closeAddress();
      this.$emit("closeCheckin", false);
    },
    closeAddress() {
      this.$emit("closeAddress", false);
    },
    searchPlaces() {
      if (this.placesName.length !== 0) {
        const dataSender = StringFunction.convertUnicode(this.placesName);

        this.$store.dispatch("searchPlacesCheckIn", dataSender);
      }
      this.isShowSuggestDefault = true;
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "../../index.style";
.tag {
  font-size: 0.825rem;
  .fixed {
    font-weight: 600;
    height: 100%;
    width: 46px;
  }
  .option {
    width: calc(100% - 46px);
    input {
      border: 0;
      height: 40px;
      line-height: 40px;
      width: 100%;
      padding-left: 0.75rem;
      background: #27292c;
      color: #f7f7f7;
      &:hover,
      &:focus,
      &:active,
      &:visited {
        box-shadow: none;
        outline: 0;
      }
      &::placeholder {
        color: #ccc;
      }
    }
  }
}
.tag {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #27292d;
  z-index: 10;
  .items--header {
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.3rem;
    .arrow-down {
      transform: rotate(90deg);
      margin-left: 0.5rem;
    }
    .title {
      font-size: 1rem;
      margin: auto;
      text-align: center;
    }
  }
  .items--body {
    background: #2f3136;
    border-bottom: 1px solid #4345485e;
  }
}
.suggest {
  border-radius: 0 0 0.5rem 0.5rem;
  left: -1px;
  padding-bottom: 0.375rem;
  width: calc(100% + 2px);
  z-index: 99;
  .show {
    max-height: 200px;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
  }
  .item--tag {
    cursor: pointer;
    padding: 0.25rem 0.75rem;
    width: 100%;
    &:hover,
    &:active,
    &:focus,
    &:visited {
      background-color: $orange;
      color: $mainDefault;
      transition: all 0.5s ease;
    }
    .avatar {
      height: 30px;
      width: 30px;
      .avatar--bg {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
      }
    }
    .desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: calc(100% - 30px);
      .address {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name {
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .loading--block {
    color: #999;
    font-size: 0.75rem;
  }
}

/* Theme Color */
.suggest[data-theme="light"] {
  background-color: $mainDefault;
  border: 1px solid $border-color;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.suggest[data-theme="dark"] {
  background-color: #27292c;
  border: 1px solid #444;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  .item--tag {
    .desc {
      .name {
        color: #f7f7f7;
      }
    }
  }
}
</style>
