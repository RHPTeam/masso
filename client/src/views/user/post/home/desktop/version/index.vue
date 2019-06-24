<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <vue-perfect-scrollbar class="modal--content">
        <div class="modal--header">
          <div class="title">THÔNG TIN BẢN CẬP NHẬT ZINBEE v1.0.3 </div>
        </div>
        <div class="modal--body mt_3">
          <div class="intro"><img :src="require( '@/assets/images/undraw_content_vbqo.svg' )" alt="Update version zinbee"></div>
          <div class="main mt_3">
            <div>CHỨC NĂNG MỚI CẬP NHẬT:</div>
            <ul class="mt_2">
              <li><span style="color: #00c853; font-weight: 600;">Tìm kiếm kho nội dung:</span> Ngay bây giờ, khi bạn tạo bài đăng/ bài viết nhưng không có về ý tưởng. Bạn chỉ cần gõ từ khóa tìm kiếm và lấy nội dung bạn cần về.</li>
              <li><span style="color: #00c853; font-weight: 600;">Giao diện ngày và đêm:</span> Zinbee cung cấp giao diện ngày và đêm giúp trải nghiệm của người dùng tốt hơn khi sử dụng ở các khung giờ khác nhau trong ngày.</li>
            </ul>
            <div class="mt_3">CÁC LỖI ĐÃ ĐƯỢC KHẮC PHỤC:</div>
            <ul class="mt_2">
              <li>Đăng nhiều tài khoản khi thiết lập chiến dịch hoặc đăng ngay.</li>
              <li>Thêm bài viết mẫu từ cửa hàng content trên zinbee. <a style="color: #ffb94a;" href="https://www.zinbee.vn/#/market">Xem chi tiết</a></li>
              <li>Tối ưu hóa, cải thiện tốc độ tải dữ liệu, trải nghiệm người dùng.</li>
            </ul>
            <div>CHỨC NĂNG SẮP ĐƯỢC CẬP NHẬT:</div>
            <ul class="mt_2">
              <li><span style="color: #bd2130; font-weight: 600;">Tự động lọc bạn bè:</span> Chỉ cần một cú nhấp chuột, hệ thống sẽ giúp bạn hoàn toàn tự động giúp bạn lọc bàn bè theo thuật toán tính tương tác facebook.</li>
              <li><span style="color: #bd2130; font-weight: 600;">Tự động like và thống kê:</span> Giúp bạn tự động hóa công việc tăng tương tác like. Hệ thống cung cấp dữ liệu thống kê giúp bạn trích xuất các tập khách hàng mục tiêu từ các bài like.</li>
              <li><span style="color: #bd2130; font-weight: 600;">Thống kê tập khách hàng:</span> Trích xuất danh sách các tập khách hàng bạn muốn. Quản lý khách hàng ngay trên zinbee mà không cần phần mềm thứ ba, giúp tối đa hóa thời gian của bạn.</li>
            </ul>
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_end align_items_center"
        >
          <button class="btn--skip"
                  @click="readVersionNotification()"
          >TÔI ĐÃ HIỂU</button>
        </div>
      </vue-perfect-scrollbar>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
  @import "index.style";
</style>
