<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content py_4 px_4">
        <!-- Start: Modal Header -->
        <div class="header alert alert_success mb_3">
          Thông báo: Hệ thống yêu cầu bạn cung cấp ít nhất 1 từ khóa trong lĩnh vực mà bạn đang hoạt động,
          thông qua từ khóa bạn cung cấp để hệ thống giúp bạn có những trải nghiệm tốt hơn cũng như tiết kiệm thời gian tìm kiếm bài viết cho bạn.
        </div>
        <!-- End: Modal Header -->
        <!-- Start: Modal Body -->
        <div class="body">
          <ol class="list m_0" v-if="listKey.length > 0">
            <li v-for="(item, index) in listKey" :key="index">{{ item }}</li>
          </ol>
          <div v-else class="text_danger"> Bạn chưa cung cấp cho hệ thống từ khóa </div>
          <div class="key mt_3">
            <input
              type="text"
              class="form_control"
              placeholder="Nhập từ khóa của bạn ..."
              v-model="keyword"
              @keydown.enter="updateKey"
            />
          </div>
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center justify_content_center mt_3">
          <button @click="updateKeyToUserInfo">Cập Nhật</button>
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
      listKey: [],
      keyword: ""
    }
  },
  computed: {

  },
  methods: {
    updateKey(){
      this.listKey.push(this.keyword);
      this.keyword = "";
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
