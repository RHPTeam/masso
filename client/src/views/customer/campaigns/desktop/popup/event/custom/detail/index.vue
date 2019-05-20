<template>
  <div class="wrap">
    <div class="custom" v-if="caseEvent.libraries === 0">
      <div class="top d_flex align_items_center py_3 px_3 mb_2" @click="resetPostType">
        <div class="icon">
          <icon-base
            class="icon--arrow-left"
            icon-name="arrow"
            width="18"
            height="22"
            viewBox="0 0 28 28"
          >
            <icon-arrow-left></icon-arrow-left>
          </icon-base>
        </div>
        <div class="text">Tùy chỉnh đăng bài đến các nhóm hoặc trang cụ thể mà bạn lựa chọn</div>
      </div>
      <div class="body mb_3">
        <!--Start: Results Option Post detail -->
        <div class="wrapper">
          <div class="desc d_flex align_items_center justify_content_between mb_2">
            <div class="left text_center" @click="selectFromLibraries">
              Chọn từ kho nội dung
            </div>
            <div>Đã chọn {{ event.post_custom.length }} trong số 20 bài viết</div>
          </div>
          <div class="item--header d_flex align_items_center px_3 py_2">
            <div class="col col--name px_2">Tên bài viết</div>
            <div class="col col--category px_2">Danh mục</div>
            <div class="col col--content px_2">Nội dung</div>
            <div class="col col--checkbox px_2">
              <label class="custom--checkbox mb_0">
                <input type="checkbox" />
              </label>
            </div>
          </div>
          <div>
            <div class="text_center py_2" v-if="event.post_custom.length === 0">Chưa có bài viết nào được chọn</div>
            <div v-else class="item--body d_flex align_items_center px_3 py_2" v-for="(post, index) in event.post_custom" :key="`d-${index}`">
              <div class="col col--name px_2">
                <div class="col col--name-text">
                  {{post.title}}
                </div>
              </div>
              <div class="col col--category px_2">
                <span v-for="(cate,index) in post._categories" :key="`c-${index}`">{{cate.title + ', '}}</span>
              </div>
              <div class="col col--content px_2">
                <div class="col--content-text">
                  {{post.content}}
                </div>
              </div>
              <div class="col col--checkbox px_2" @click="removePostSelect(index)">
                <label class="custom--checkbox mb_0">
                  <input type="checkbox" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <!--End: Results Option Post detail -->
      </div>
      <div class="bottom">
        <!--Start: Post detail -->
        <global-option />
        <!--End: Post detail -->
      </div>
    </div>
    <!--Start: Show Option Post detail -->
    <custom-option
      v-if="caseEvent.libraries === 1"
    />
    <!--End: Show Option Post detail -->
  </div>
</template>

<script>
import CustomOption from "./option";
import GlobalOption from "../components/target";
export default {
  components: {
    CustomOption,
    GlobalOption
  },
  computed: {
    caseEvent() {
      return this.$store.getters.caseEvent;
    },
    event() {
      return this.$store.getters.event;
    }
  },
  methods: {
    resetPostType() {
      this.$store.dispatch( "setCaseEvent", {
        key: "target",
        value: 0
      } );
      this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: 0
      } );
      // Assign post_custom with empty array
      this.$store.dispatch( "setEvent", {
        key: "post_custom",
        value: []
      } );
    },
    selectFromLibraries() {
      this.$store.dispatch( "setCaseEvent", {
        key: "libraries",
        value: 1
      } );
    }
  }
}
</script>

<style lang="scss" scoped>
.custom {
  background-color: #fafafa;
  color: $mainDarkLight;
  .top {
    background-color: #cccccc;
    border-radius: calc(.5rem + 2px);
    cursor: pointer;
    .icon {
      svg {
        margin-bottom: -6px;
      }
    }
  }
  .body {
    .desc {
      .left {
        background-color: #ffb94a;
        border: none;
        border-radius: .5rem;
        color: #ffffff;
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        width: 160px;
      }
    }
    .item--header {
      background-color: #ffffff;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      color: #666666;
      font-weight: 600;
      height: 48px;
    }
    .col--checkbox {
      height: 20px;
      width: 5%;
    }
    .col--name {
      width: 30%;
    }
    .col--category {
      width: 30%;
    }
    .col--content {
      width: 35%;
      &-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .custom--checkbox {
      input[type="checkbox"] {
        border-radius: 6px;
        border: solid 1.5px #cccccc;
        cursor: pointer;
        height: 20px;
        outline: none;
        width: 20px;
        -webkit-appearance: none;
        -moz-appearance: none;
        &:checked {
          background-color: #ffb94a;
          border: solid 1px #ffb94a;

          &:before {
            border-bottom: 2px solid #fff;
            border-right: 2px solid #fff;
            content: "";
            display: block;
            height: 10px;
            position: relative;
            left: 50%;
            top: 42%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 7px;
          }
        }
      }
    }
  }
}
.wrap[data-theme="light"] {
  .item--header {
    background-color: #fff;
  }
  .item--body {
    background-color: #fafafa;
  }
  .image--wrap-more {
    background-color: #e4e4e4;
    color: #999999;
  }
}

//DARK

.wrap[data-theme="dark"] {
  .item--header {
    background-color: #27292d;
    color: #cccccc;
  }
  .item--body {
    background-color: #27292c;
    color: #999999;
  }
  .image--wrap-more {
    background-color: #2f3136;
    color: #999999;
  }
}
</style>
