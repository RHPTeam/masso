<template>
  <div class="search position_absolute">
    <!-- Start: Search messenger by key word -->
    <div class="action d_flex align_items_center px_4 py_3" v-if="isShowResult === false">
      <div class="left position_relative">
        <input
          type="text"
          placeholder="Tìm kiếm tin nhắn"
          v-model="keyword"
          @keydown.enter="searchMessenger"
        />
        <div class="icon position_absolute">
          <icon-base
            icon-name="Tìm kiếm"
            width="16.772"
            height="17.287"
            viewBox="0 0 16.772 17.287"
          >
            <icon-input-search />
          </icon-base>
        </div>
      </div>
      <div class="right text_center" @click="closeSearchMessenger">
        Đóng
      </div>
    </div>
    <!-- End: Search messenger by key word -->

    <!-- Start: Result search messenger -->
    <div class="result d_flex align_items_center px_4 py_3" v-if="isShowResult === true">
      <div class="before d_flex align_items_center">
        <div class="icon--down mr_2">
          <icon-base
            icon-name="Chuyển trang"
            width="18"
            height="18"
            viewBox="0 0 125 125"
          >
            <icon-arrow-down />
          </icon-base>
        </div>
        <div class="icon--up">
          <icon-base
            icon-name="Chuyển trang"
            width="18"
            height="18"
            viewBox="0 0 20 20"
          >
            <icon-arrow-up />
          </icon-base>
        </div>
      </div>
      <div class="middle">
        <div class="">Hiển thị 1/10 kết quả cho  "từ khóa"</div>
        <div class="d_none">Không tìm thấy kết quả nào cho  "từ khóa"</div>
      </div>
      <div class="after text_center" @click="closeShowResultMessenger">
        Xong
      </div>
    </div>
    <!-- End: Result search messenger -->
  </div>
</template>

<script>
export default {
  props: {
    currentTheme: {
      type: String,
      default: "dark"
    }
  },
  data() {
    return {
      isShowResult: false,
      keyword: ""
    }
  },
  computed: {
    variableControlSearch(){
      return this.$store.getters.caseControl;
    }
  },
  methods: {
    closeSearchMessenger() {
      this.$store.dispatch("setVariableControl", {
        key: "messenger",
        value: false
      });
    },
    closeShowResultMessenger(){
      this.isShowResult = false;
    },
    searchMessenger(){
      this.isShowResult = true;
    }
  },
}
</script>

<style lang="scss" scoped>
.search {
  background-color: #27292d;
  width: 100%;
  z-index: 99;
  .action {
    .left {
      width: 90%;
      input {
        background-color: #2F3136;
        border: none;
        border-radius: .5rem;
        color: #fff;
        font-size: calc(1rem - 3px);
        width: 100%;
        padding: .5rem 2.2rem;
        &:hover, &:active, &:focus, &:visited {
          box-shadow: none;
          outline: 0;
        }
      }
      .icon {
        left: 10px;
        top: 28%;
      }
    }
    .right {
      cursor: pointer;
      font-weight: 600;
      width: 10%;
    }
  }
  .result {
    .before {
      width: 10%;
      .icon--down {
        cursor: pointer;
        &:hover {
          color: #ffb94a;
        }
      }
      .icon--up {
        cursor: pointer;
        &:hover {
          color: #ffb94a;
        }
        svg {
          margin-bottom: -6px;
        }
      }
    }
    .middle {
      width: 80%;
    }
    .after {
      cursor: pointer;
      font-weight: 600;
      width: 10%;
    }
  }
}
</style>
