<template>
  <div class="content--header-help">
    <div class="ct">
      <div class="r mx_0 mb_3">
        <!-- Start header logo help   -->
        <div class="c_md_3">
          <div class="logo d_flex align_items_center">
            <icon-base
              icon-name="logo"
              width="40px"
              height="40px"
              viewBox="0 0 200 200"
            >
              <icon-logo-icon-white/>
            </icon-base>
            <div class="center--support ml_2">
              Trung tâm trợ giúp
            </div>
          </div>
        </div>
        <!-- End header logo help   -->
        <!-- Start search help   -->
        <div class="c_md_6">
          <div class="wrap--search">
            <div class="search">
              <icon-base
                icon-name="search"
                width="26"
                height="24"
                viewBox="0 0 24 24"
              >
                <icon-input-search />
              </icon-base>
              <input type="text" name="" id="" placeholder="Chào ABC, chúng tôi có thể giúp gì cho bạn?">
            </div>
          </div>
        </div>
        <!-- End search help   -->
        <!-- Start back facebook   -->
        <div class="c_md_3 d_flex align_items_center">
          <div class="content--back">
            <div class="icon">
              <icon-base
                icon-name="back"
                width="25"
                height="22"
                viewBox="0 0 25 25"
              >
                <icon-logout />
              </icon-base>
            </div>
            <router-link to="/">
              <div class="text">
                Quay lại Zinbee
              </div>
            </router-link>
          </div>
        </div>
        <!-- End back facebook   -->
      </div>

      <!--  navigation help-->
      <div class="wrap--nav">
        <nav>
          <ul class="menu--help d_inline_flex">
            <li class="flex_fill home menu--help-item" @click="goToHomeHelp">Trang chủ</li>
            <li class="flex_fill menu--help-item" v-for="(category, index) in allCategories" :key="index"> {{ category.title }} </li>
            <!-- <li class="menu--help-item flex_fill">
              Sử dụng facebook
              <ul class="dropdown--menu">
                <li class="dropdown--menu-item"><a href="">Tạo Tài khoản</a></li>
                <li class="dropdown--menu-item"><a href="">Kết bạn</a></li>
                <li class="dropdown--menu-item"><a href="">Trang chủ của bạn</a></li>
                <li class="dropdown--menu-item"><a href="">Nhắn tin</a></li>
                <li class="dropdown--menu-item"><a href="">Ảnh</a></li>
                <li class="dropdown--menu-item"><a href="">Video</a></li>
                <li class="dropdown--menu-item"><a href="">Trang</a></li>
                <li class="dropdown--menu-item"><a href="">Nhóm</a></li>
                <li class="dropdown--menu-item"><a href="">Sự kiện</a></li>
                <li class="dropdown--menu-item"><a href="">Thanh toán</a></li>
                <li class="dropdown--menu-item"><a href="">Marketplace</a></li>
                <li class="dropdown--menu-item"><a href="">Ứng dụng và trò chơi</a></li>
                <li class="dropdown--menu-item"><a href="">Ứng dụng Facebook trên di động và máy tính</a></li>
                <li class="dropdown--menu-item"><a href="">Trợ năng</a></li>
              </ul>
            </li>
            <li class="menu--help-item flex_fill">
              Quản lý tài khoản
              <ul class="dropdown--menu">
                <li class="dropdown--menu-item"><a href="">Đăng nhập và mật khẩu</a></li>
                <li class="dropdown--menu-item"><a href="">Trang cá nhân và cài đặt của bạn</a></li>
                <li class="dropdown--menu-item"><a href="">Tên trên Facebook</a></li>
                <li class="dropdown--menu-item"><a href="">Giữ an toàn cho tài khoản của bạn</a></li>
                <li class="dropdown--menu-item"><a href="">Thông báo</a></li>
                <li class="dropdown--menu-item"><a href="">Tùy chọn quảng cáo</a></li>
                <li class="dropdown--menu-item"><a href="">Truy cập & Tải thông tin xuống</a></li>
                <li class="dropdown--menu-item"><a href="">Vô hiệu hóa hoặc xóa tài khoản của bạn</a></li>
              </ul>
            </li>
            <li class="menu--help-item flex_fill">
              Quyền riêng tư và an toàn
              <ul class="dropdown--menu">
                <li class="dropdown--menu-item"><a href="">Quyền riêng tư của bạn</a></li>
                <li class="dropdown--menu-item"><a href="">Giữ an toàn</a></li>
                <li class="dropdown--menu-item"><a href="">Giữ an toàn cho tài khoản của bạn</a></li>
                <li class="dropdown--menu-item"><a href="">Hủy kết bạn hoặc chặn ai đó</a></li>
                <li class="dropdown--menu-item"><a href="">Tài khoản bị hack và giả mạo</a></li>
              </ul>
            </li>
            <li class="menu--help-item flex_fill">
              Chính sách và báo cáo
              <ul class="dropdown--menu">
                <li class="dropdown--menu-item"><a href="">Báo cáo lạm dụng</a></li>
                <li class="dropdown--menu-item"><a href="">Báo cáo sự cố về Facebook</a></li>
                <li class="dropdown--menu-item"><a href="">Báo cáo vi phạm quyền riêng tư</a></li>
                <li class="dropdown--menu-item"><a href="">Tài khoản bị hack và giả mạo</a></li>
                <li class="dropdown--menu-item"><a href="">Quản lý tài khoản của người đã qua đời</a></li>
                <li class="dropdown--menu-item"><a href="">Tải lên giấy tờ tùy thân của bạn</a></li>
                <li class="dropdown--menu-item"><a href="">Quyền sở hữu trí tuệ</a></li>
                <li class="dropdown--menu-item"><a href="">Giới thiệu về chính sách của chúng tôi</a></li>
              </ul>
            </li> -->
            <li class="menu--help-item flex_fill">
              <a href="">
                <div class="mail--help d_flex">
                  <div class="icon--envelope mr_1">
                    <icon-base
                      icon-name="mail"
                      width="22"
                      height="20"
                      viewBox="0 0 22 22"
                    >
                      <icon-envelope />
                    </icon-base>
                  </div>
                  <div>Hộp thư hỗ trợ</div>
                </div>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  props: [ "goToHomeHelp" ],
  computed: {
    allCategories(){
      const arrCateHelpMenu = [];
      this.$store.getters.getCateAdmin.map( item => {
        if( item.level === 1){
          arrCateHelpMenu.push( item );
        }
      } );
      return arrCateHelpMenu;
    }
  },
  created() {
    this.$store.dispatch( "getAllCategoriesAdmin" );
  },
}
</script>
<style lang="scss" scoped>
  @import "./index.style";
</style>
