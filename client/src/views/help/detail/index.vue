<template>
  <div class="ct mt_0 mb_5">
    <div class="wrap--name-expect">
      <div class="r m_0">
        <div class="c_3 list--problem px_0 pt_5">
          <nav class="navigation">
            <ul>
              <li class="navigation--item">Đăng nhập và mật khẩu</li>
              <li class="navigation--item">Trang cá nhân và cài đặt của bạn</li>
              <li class="navigation--item">Tên trên Facebook</li>
              <li class="navigation--item">Giữ an toàn cho tài khoản của bạn</li>
              <li class="navigation--item">Thông báo</li>
            </ul>
          </nav>
        </div>
        <div class="c_9 content px_4 pt_5">
          <div v-html="allBlogHelp[0].content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {  
  computed: {
    allBlogHelp(){
      console.log(this.$store.getters.getAllBlog);
      return this.$store.getters.getAllBlog;
    }
  },
  created() {
    this.$store.dispatch( "getAllBlogAdmin" );
  },
}
</script>

<style lang="scss" scoped>
  @import "./index.style";
</style>
