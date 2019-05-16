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
            <li class="flex_fill home" @click="goToHomeHelp">
              <div>Trang chủ</div>
            </li>
            <li class="menu--help-item flex_fill">
              Sử dụng facebook
              <ul>
                <li><a href="">Tạo Tài khoản</a></li>
                <li><a href="">Kết bạn</a></li>
                <li><a href="">Trang chủ của bạn</a></li>
                <li><a href="">Nhắn tin</a></li>
                <li><a href="">Ảnh</a></li>
                <li><a href="">Video</a></li>
                <li><a href="">Trang</a></li>
                <li><a href="">Nhóm</a></li>
                <li><a href="">Sự kiện</a></li>
                <li><a href="">Thanh toán</a></li>
                <li><a href="">Marketplace</a></li>
                <li><a href="">Ứng dụng và trò chơi</a></li>
                <li><a href="">Ứng dụng Facebook trên di động và máy tính</a></li>
                <li><a href="">Trợ năng</a></li>
              </ul>
            </li>
            <li class="menu--help-item flex_fill">
              Quản lý tài khoản
              <ul>
                <li><a href="">Đăng nhập và mật khẩu</a></li>
                <li><a href="">Trang cá nhân và cài đặt của bạn</a></li>
                <li><a href="">Tên trên Facebook</a></li>
                <li><a href="">Giữ an toàn cho tài khoản của bạn</a></li>
                <li><a href="">Thông báo</a></li>
                <li><a href="">Tùy chọn quảng cáo</a></li>
                <li><a href="">Truy cập & Tải thông tin xuống</a></li>
                <li><a href="">Vô hiệu hóa hoặc xóa tài khoản của bạn</a></li>
              </ul>
            </li>
            <li class="flex_fill">Quyền riêng tư và an toàn
              <ul>
                <li><a href="">Quyền riêng tư của bạn</a></li>
                <li><a href="">Giữ an toàn</a></li>
                <li><a href="">Giữ an toàn cho tài khoản của bạn</a></li>
                <li><a href="">Hủy kết bạn hoặc chặn ai đó</a></li>
                <li><a href="">Tài khoản bị hack và giả mạo</a></li>
              </ul>
            </li>
            <li class="flex_fill">Chính sách và báo cáo
              <ul>
                <li><a href="">Báo cáo lạm dụng</a></li>
                <li><a href="">Báo cáo sự cố về Facebook</a></li>
                <li><a href="">Báo cáo vi phạm quyền riêng tư</a></li>
                <li><a href="">Tài khoản bị hack và giả mạo</a></li>
                <li><a href="">Quản lý tài khoản của người đã qua đời</a></li>
                <li><a href="">Tải lên giấy tờ tùy thân của bạn</a></li>
                <li><a href="">Quyền sở hữu trí tuệ</a></li>
                <li><a href="">Giới thiệu về chính sách của chúng tôi</a></li>
              </ul>
            </li>
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
  props: [ "goToHomeHelp" ]
}
</script>
<style lang="scss" scoped>
  @import "./index.style";
</style>
