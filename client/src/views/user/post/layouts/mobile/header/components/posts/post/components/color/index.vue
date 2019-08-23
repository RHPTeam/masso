<template>
  <div class="color d_flex align_items_center">
    <div
      class="color--fixed d_flex align_items_center"
      @click="showOptionColor"
      v-if="isShowDefault === true"
    >
      <icon-base icon-name="more" width="20" height="20" viewBox="0 0 23 23">
        <icon-grid />
      </icon-base>
    </div>

    <VuePerfectScrollbar class="show--bg">
      <div
        class="color--box d_flex align_items_center position_relative"
        v-if="isShowOption === true"
      >
        <div class="color--item back" @click="comeBackDefault">
          <icon-base
            class="ic--search"
            icon-name="Arrow"
            width="15"
            height="15"
            viewBox="0 0 28 28"
          >
            <icon-arrow-left />
          </icon-base>
        </div>
        <!--Get random 15 first item more object 0-14 -->
        <div v-for="(colors, index) in randomColor" :key="index">
          <div
            class="color--item"
            @click="hiddeOptionColor(colors.bodyStyle, colors.presetID)"
            :style="colors.bodyStyle"
          ></div>
        </div>
        <div
          class="color--fixed more--color d_flex align_items_center"
          @click="isShowMoreColor = true"
          v-click-outside="close"
        >
          <icon-base icon-name="more" width="20" height="20" viewBox="0 0 23 23">
            <icon-grid />
          </icon-base>
        </div>
        <!-- <transition name="more">
        <div class="more position_absolute" v-if="isShowMoreColor === true">
          <div class="wrapper">
            <div class="desc p_2">
              Chọn phông nền cho bài viết của bạn
            </div>
            <div class="body">
              <VuePerfectScrollbar class="show">
                <div v-if="!colorFb">Đang tải về kết quả, vui lòng chờ ít giây.</div>
                <div
                  v-else
                  class="more--item p_2"
                  v-for="(item, index) in colorFb"
                  :key="`i-${index}`"
                >
                  <div class="header">{{ item.categoryName }}</div>
                  <div
                    class="wrap--item"
                    v-for="(color, index) in  item.textFormats"
                    :key="`c-${index}`"
                  >
                    <div
                      class="option"
                      :style="color.bodyStyle"
                      @click="hiddeOptionColor(color.bodyStyle, color.presetID)"
                    >
                    </div>
                  </div>
                </div>
              </VuePerfectScrollbar>
            </div>
          </div>
        </div>
        </transition>-->
      </div>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar
  },
  props: ["randomColor", "colorFb", "post"],
  data() {
    return {
      isShowDefault: true,
      isShowOption: false,
      isShowMoreColor: false
    };
  },
  methods: {
    showOptionColor() {
      this.isShowDefault = false;
      this.isShowOption = true;
    },
    comeBackDefault() {
      this.isShowDefault = true;
      this.isShowOption = false;
    },
    changeBgColorDefault() {
      this.$emit("turnOff", false);
    },
    close() {
      this.isShowMoreColor = false;
    },
    async hiddeOptionColor(value, id) {
      await this.$emit("openContentColor", true);
      await this.$emit("changeBgColor", value);
      this.$store.dispatch("setPostDefault", {
        key: "color",
        value: {
          id: id,
          value: value
        }
      });
      this.$store.dispatch("updatePostColor", this.post);
      this.changeBgColorDefault();
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../index.style";
.show--bg {
  max-width: 90%;
}
.back {
  background-color: #fafafa !important;
  cursor: pointer;
  svg {
    margin-bottom: -1px;
    margin-left: 1px;
  }
}
.more--color {
  margin-left: 0.5rem;
  /*border: 1px solid #fafafa;*/
}
.more {
  background-color: #ffffff;
  border: 1px solid #e4e4e4;
  border-radius: calc(0.5rem + 2px);
  top: 108%;
  right: 0;
  width: 315px;
  z-index: 99;
  .desc {
    border-bottom: 1px solid #e4e4e4;
  }
  .show {
    max-height: 250px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .more--item {
    .header {
      font-weight: 600;
      padding: 0.5rem 0;
    }
    .wrap--item {
      display: inline-block;
      height: 64px;
      margin: 0 4px;
      width: 64px;
      .option {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border: 1px solid #e4e4e4;
        border-radius: 0.5rem;
        cursor: pointer;
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
