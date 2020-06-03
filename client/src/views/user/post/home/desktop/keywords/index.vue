<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content py_4 px_4">
        <!-- Start: Modal Header -->
        <div class="header mb_3">
          <div class="title text_center mb_3">Cung cấp từ khóa sản phẩm dịch vụ</div>
          <div class="desc">
            Để nâng cao trải nghiệm cũng như giúp bạn tiếp cận nhanh chóng tới các nội dung phù hợp,
            chúng tôi mong muốn bạn cung cấp ít nhất một từ khóa về sản phẩm, dịch vụ mà bạn đang quan tâm.
            (Ví dụ: Mỹ phẩm, Du lịch,...)
          </div>
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div class="body">
          <div class="key mt_3">
            <div class="wrapper--content">
              <taggle
                class="taggle"
                v-model="listKey"
                @input="updateKey"
                :placeholder="$t('chat.common.keyProduct.placeholder')"
              />
            </div>
          </div>
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center mt_3">
          <button @click="updateKeyToUserInfo">CẬP NHẬT</button>
        </div>
        <!-- End: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    currentTheme: String
  },
  data() {
    return {
      listKey: []
    }
  },
  computed: {

  },
  methods: {
    updateKey( val ){
      this.listKey = val;
    },
    updateKeyToUserInfo(){
      this.user.keywords =  this.listKey;
      this.$store.dispatch( "updateUser", this.user );
    }
  },
}
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
