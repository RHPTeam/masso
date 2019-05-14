<template>
  <div class="wrap--home-help">
    <div class="ct">

      <div class="r m_0 question pd">
        <div class="c_md_6 choose">
          <p class="title--home">Câu hỏi bạn có thể có</p>
          <ul>
            <li>
              <a href="">Tên nào được phép trên Facebook?</a>
            </li>
            <li>
              <a href="">Làm cách nào để chọn nội dung thông báo tôi sẽ nhận trên Facebook?</a>
            </li>
            <li>
              <a href="">Tôi có thể tìm thấy cài đặt trên Facebook của mình ở đâu?</a>
            </li>
            <li>
              <a href="">Làm cách nào để thay đổi hoặc đặt lại mật khẩu Facebook?</a>
            </li>
            <li>
              <a href="">Tại sao tôi nhận được thông báo lỗi cho biết tôi không thể trả lời cuộc trò chuyện trên Facebook?</a>
            </li>
          </ul>
        </div>
        <div class="c_md_6 descri--img" :style="{backgroundImage: 'url('+ srcDefault +')'}">

        </div>
      </div>

      <div class="popular--topics pd">
        <p class="title--home">Chủ đề phổ biến</p>
        <div class="r m_0">

          <div class="c_3 page--peronal text_center">
            <div class="img--position" :style="{backgroundImage: 'url('+ srcDefault +')'}">
            </div>
            <p class="intro">GIỚI THIỆU</p>
            <p class="title">Trang cá nhân và cài đặt của bạn</p>
            <p class="content">Tìm hiểu cách thêm ảnh đại điện, chỉnh sửa thông tin và quản lý bài viết trên Dòng thời gian của bạn.</p>
          </div>

          <div class="c_3 page text_center">
            <div class="img--position" :style="{backgroundImage: 'url('+ srcDefault +')'}">
            </div>
            <p class="intro">GIỚI THIỆU</p>
            <p class="title">Trang</p>
            <p class="content">Nhận trợ giúp quản lý Trang và hiểu cách tương tác với Trang mà bạn quan tâm.</p>
          </div>

          <div class="c_3 message text_center">
            <div class="img--position" :style="{backgroundImage: 'url('+ srcDefault +')'}">
            </div>
            <p class="intro">GIỚI THIỆU</p>
            <p class="title">Nhắn tin</p>
            <p class="content">Tìm câu trả lời về cách gửi và nhận tin nhắn trên Facebook.</p>
          </div>

          <div class="c_3 notification text_center">
            <div class="img--position" :style="{backgroundImage: 'url('+ srcDefault +')'}">
            </div>
            <p class="intro">GIỚI THIỆU</p>
            <p class="title">Thông báo</p>
            <p class="content">Thay đổi nội dung bạn sẽ được thông báo trên Facebook và quyết định cách nhận các thông báo đó.</p>
          </div>

        </div>
      </div>

      <div class="search--other pd">
        <p class="title--home text_center">Bạn tìm kiếm điều khác?</p>
        <p class="text_center description">Khám phá Cộng đồng trợ giúp của chúng tôi hoặc tìm hiểu thêm về Quảng cáo trên Facebook</p>
        <div class="r">
          <div class="pd-lr d_inline_flex">
            <div class="c_6 text_center">
              <div class="img" :style="{backgroundImage: 'url('+ srcDefault +')'}"></div>
              <div>
                <a href="" class="access--public access--help">
                  <icon-base
                    icon-name="access"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                  >
                    <icon-logout />
                  </icon-base>
                  Truy cập Cộng đồng trợ giúp
                </a>
              </div>
              <p class="des--content">Nhận trợ giúp từ người khác trên Facebook có câu hỏi tương tự</p>
            </div>

            <div class="c_6 text_center">
            <div class="img advertise" :style="{backgroundImage: 'url('+ srcDefault +')'}"></div>
            <div>
              <a href="" class="access--public access--help-advertise">
                <icon-base
                  icon-name="access"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                >
                  <icon-logout />
                </icon-base>
                Truy cập Cộng đồng trợ giúp
              </a>
            </div>
            <p class="des--content">Tìm hiểu thêm về cách quảng cáo doanh nghiệp trên Facebook</p>
          </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      srcDefault: require("@/assets/images/home-help.png")
    }
  },
}
</script>
<style lang="scss" scoped>
  @import "./index.style";
</style>
