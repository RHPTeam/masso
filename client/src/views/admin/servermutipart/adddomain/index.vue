<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3">
        <!-- Start: Modal Body -->
        <div class="body mb_2">
          <form>

            <div class="form_group">
              <label>Tên Domain</label>
              <input type="text" placeholder="Nhập tên domain ..." class="form_control" v-model="name" />
            </div>

            <div class="info">

              <div class="title py_2">Thông tin cấu hình</div>

              <div class="d_flex align_items_center justify_content_between">

                <div class="square form_group">
                  <label>Thông tin Domain</label>
                  <input type="text" placeholder="Nhập thông tin domain ..." class="form_control" v-model="domain" />
                </div>

                <div class="square form_group">
                  <label>Thông tin IP</label>
                  <input type="text" placeholder="Nhập thông tin ip ..." class="form_control" v-model="ip" />
                </div>

              </div>
              <div class="d_flex align_items_center justify_content_between">

                <div class="square form_group">
                  <label>Thông tin CPU</label>
                  <input type="text" placeholder="Nhập thông tin cpu ..." class="form_control" v-model="cpu" />
                </div>

                <div class="square form_group">
                  <label>Thông tin RAM</label>
                  <input type="text" placeholder="Nhập thông tin ram ..." class="form_control" v-model="ram" />
                </div>

              </div>

              <div class="d_flex align_items_center justify_content_between">

                <div class="square form_group">
                  <label>Thông tin Card</label>
                  <input type="text" placeholder="Nhập thông tin card ..." class="form_control" v-model="card" />
                </div>

                <div class="square form_group">
                  <label>Hết hạn</label>
                  <input type="text" placeholder="Thông tin ngày hết hạn ..." class="form_control" v-model="expire" />
                </div>

              </div>

            </div>

            <div class="form_group">
              <label>Cụm máy chủ</label>
              <input type="text" placeholder="Nhập vùng của cụm máy chủ ..." class="form_control" v-model="region" />
            </div>

            <div class="form_group">
              <label>Số lượng người dùng</label>
              <input type="text" placeholder="Nhập số lượng người dùng ..." class="form_control" v-model="userAmount" />
            </div>

            <div class="form_group">
              <label>Trạng thái hoạt động</label>
              <select class="form_control">
                <option value="1">false</option>
                <option value="2">true</option>
              </select>
            </div>

            <div class="form_group">
              <button class="form_control">Tạo mới</button>
            </div>
          </form>
        </div>
        <!-- End: Modal Body -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTheme: String
  },
  data() {
    // return {
    //   default: {
    //     name: "",
    //     domain: "",
    //     info: {
    //
    //     },
    //     region: "",
    //     userAmount: ""
    //   }
    // }
  },
}
</script>

<style lang="scss" scoped>
  @import "./index.style";
</style>

