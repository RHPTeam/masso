<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4">
        <div class="modal--header">
          <div class="title">{{ title }}</div>
        </div>
        <div class="modal--body my_3">
          <div class="desc" v-if="multiple === false">
            Toàn bộ dữ liệu liên quan đến {{ typeName }}
            <span class="campaign--name">{{ targetName }}</span> sẽ bị xóa hoàn toàn. Nhập
            <span class="text--delete">DELETE</span> để tiếp tục.
          </div>
          <input
            class="modal--body-input mt_3"
            placeholder="DELETE"
            type="text"
            v-model="deleteText"
          />
        </div>
        <div class="modal--footer d_flex justify_content_between align_items_center">
          <button
            class="btn--submit"
            @click="closePopup()"
          >HỦY</button>
          <button
            class="btn--skip"
            v-if="deleteConfirm"
            @click="deleteTargets()"
          >XÓA</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    storeActionName: {
      type: String,
      default: ""
    },
    targetId: {
      type: String,
      default: ""
    },
    targetIds: {
      type: Array,
      default: () => { [] }
    },
    targetName: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      deleteConfirm: false,
      deleteText: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    typeName() {
      let res;

      if (this.type === "postGroup") {
        res = "nhóm";
      }
      return res;
    }
  },
  watch: {
    deleteText() {
      this.deleteConfirm = this.deleteText === "DELETE";
    }
  },
  methods: {
    closePopup() {
      this.$emit( "closePopup", false );
    },
    deleteTargets() {
      if ( this.multiple === false ) {
        this.$store.dispatch( this.storeActionName, this.targetId );
      } else {
        this.$store.dispatch( this.storeActionName, this.targetIds );
      }
      this.$emit( "closePopup", false );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style";
@import "./index.style";
</style>

