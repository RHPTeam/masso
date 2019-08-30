<template>
  <div class="tag d_flex align_items_center" :data-theme="currentTheme">
    <div class="fixed d_flex align_items_center justify_content_center">Với</div>
    <div class="right">
      <multiselect
        class="tag--multi"
        :options="friendFb"
        label="text"
        multiple
        placeholder="Cùng với ai?"
        @input="update"
        :value="post.tags"
      >
        <template slot="option" slot-scope="option">
          <div class="d_flex align_items_center">
            <div style="height: 30px;width: 30px;border-radius: 50%;background-position: center;background-repeat: no-repeat;background-size: cover" :style="{ backgroundImage: 'url(' + option.photo + ')' }"></div>
            <div style="font-weight: 600; margin-left: .5rem;">{{ option.text }}</div>
          </div>
        </template>
      </multiselect>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    post: {
      type: Object
    },
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
    friendFb(){
      return this.$store.getters.allFriend;
    }
  },
  watch: {
    "name"(value) {
      if( value.length !== 0 ) this.isShowSuggest  = true;
    }
  },
  async created() {
  },
  methods: {
    update( value ) {
      const tags = value.map(item => {
        return {
          uid: item.uid,
          text: item.text
        }
      });
      this.$store.dispatch( "setPostArray", {
        key: "tags",
        value: tags
      });

      this.$store.dispatch( "updatePost", this.post );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../index.style";
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
