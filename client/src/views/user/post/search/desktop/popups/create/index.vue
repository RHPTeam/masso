<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content py_4">
        <!-- Start: Modal Header -->
        <div class="modal--header px_4">
          <div class="title">Thêm vào kho nội dung
          </div>
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <vue-perfect-scrollbar class="modal--scroll my_3">
          <div class="modal--body">
            <modal-body
              :fbPost="fbPost"
            ></modal-body>
          </div>
        </vue-perfect-scrollbar>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="modal--footer d_flex justify_content_between align_items_center px_4">
          <button
            class="btn--skip"
            @click="closeCreatePopup()"
          > {{ $t('chat.common.popup.delete.cancle') }} </button>
          <button
            class="btn--submit"
            @click="createPost()"
          >LƯU</button>
        </div>
        <!-- Start: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<script>
import ModalBody from "./body";

export default {
  components: {
    ModalBody
  },
  props: [ "fbPost" ],
  data() {
    return {
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeCreatePopup() {
      this.$emit( "closePopup", false );
    },
    createPost() {
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>

