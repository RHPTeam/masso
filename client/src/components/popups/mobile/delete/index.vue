<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <!-- Start: Delete Popup -->
      <div class="modal--content text_center">
        <div class="item mb_2 delete">
          <div class="text mb_2 pb_2">Bạn có muốn xóa {{ title }} '{{ name }}' này không?</div>
          <div @click="deleteTargets">Xóa</div>
        </div>
        <div class="item mb_2 cancel" @click="closePopup">Hủy</div>
      </div>
      <!-- End: Delete Popup -->
    </div>
  </div>
</template>

<script>
export default {
   props: {
    name: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    storeActionName: {
      type: String,
      default: ""
    },
    targetData: {
      type: Object
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    deleteTargets() {
      this.$store.dispatch( this.storeActionName, this.targetData );
      
      this.$emit( "closePopup", false );
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "index.style";
.modal--wrapper {
    height: 100vh;
    width: 100vw;
    // background: #404040b0;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;
  .modal--dialog {
    position: absolute;
    bottom: 0;
    width: 100vw;
    left: 0;
    font-size: 1rem;
    color: #333;
    .modal--content {
        width: 90%;
      .delete {
        border: 1px solid #ccc;
        background: #fff;
        border-radius: 0.625rem;
        padding: 0.625rem 0;
        .text {
          border-bottom: 1px solid #ccc;
        }
      }
      .cancel {
        border: 1px solid #ccc;
        background: #fff;
        border-radius: 0.625rem;
        padding: 0.625rem 0;
      }
    }
  }
}
</style>


