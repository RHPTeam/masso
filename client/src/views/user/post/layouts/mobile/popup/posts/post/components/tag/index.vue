<template>
  <div class="tag" :data-theme="currentTheme">
    <div class="items--header d_flex align_items_center pt_2">
      <div @click="closeTag">
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
      <div class="title">Chọn người bạn muốn tag</div>
      <div class="edit mr_3" @click="closeTag">Xong</div>
    </div>
    <div class="items--body px_2 mt_3">
      <div class="fixed d_flex align_items_center justify_content_center mb_2">Với</div>
      <div class="right">
        <multiselect
          class="tag--multi"
          :options="friendFb"
          label="text"
          multiple
          placeholder="Cùng với ai?"
          @input="update($event)"
          v-model="post.tags"
        >
          <template slot="option" slot-scope="option">
            <div class="d_flex align_items_center">
              <div
                style="height: 30px;width: 30px;border-radius: 50%;background-position: center;background-repeat: no-repeat;background-size: cover"
                :style="{ backgroundImage: 'url(' + option.photo + ')' }"
              ></div>
              <div style="font-weight: 600; margin-left: .5rem;">{{ option.text }}</div>
            </div>
          </template>
        </multiselect>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    post: {
      type: Object
    }
  },
  data() {
    return {
      name: "",
      isShowSuggest: false,
      listCategories: [],
      listFriend: []
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    friendFb() {
      return this.$store.getters.allFriend;
    }
  },
  watch: {
    name(value) {
      if (value.length !== 0) this.isShowSuggest = true;
    }
  },
  async created() {},
  methods: {
    update(value) {
      this.$emit("updatePostTags", value);
    },
    closeTag() {
      this.$emit("closeTag", false);
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
.right {
  width: 100%;
}
.tag--multi .vs__dropdown-toggle {
  border: none !important;
}
.tag--multi .vs__dropdown-toggle .vs__actions {
  display: none;
}
/* Theme Color */
.tag[data-theme="light"] {
  .right {
    background-color: #fff;
  }
}
.tag[data-theme="dark"] {
  .right {
    background-color: #27292c;
    .tag--multi {
    }
  }
}
</style>
