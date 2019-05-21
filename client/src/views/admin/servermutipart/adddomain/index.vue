<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content" v-click-outside="close">
        <!-- Start: Modal Body -->
        <VuePerfectScrollbar class="wrap">
          <div class="body mb_2 px_4 py_3">
            <form>

              <div class="form_group">
                <label>Tên Domain</label>
                <input type="text" placeholder="Nhập tên domain ..." class="form_control" v-model="defaultInfo.name" />
              </div>

              <div class="info">

                <div class="title py_2">Thông tin cấu hình</div>

                <div class="d_flex align_items_center justify_content_between">

                  <div class="square form_group">
                    <label>Thông tin Domain</label>
                    <input type="text" placeholder="Nhập thông tin domain ..." class="form_control" v-model="defaultInfo.info.domain" />
                  </div>

                  <div class="square form_group">
                    <label>Thông tin IP</label>
                    <input type="text" placeholder="Nhập thông tin ip ..." class="form_control" v-model="defaultInfo.info.ip" />
                  </div>

                </div>
                <div class="d_flex align_items_center justify_content_between">

                  <div class="square form_group">
                    <label>Thông tin CPU</label>
                    <input type="text" placeholder="Nhập thông tin cpu ..." class="form_control" v-model="defaultInfo.info.cpu" />
                  </div>

                  <div class="square form_group">
                    <label>Thông tin RAM</label>
                    <input type="text" placeholder="Nhập thông tin ram ..." class="form_control" v-model="defaultInfo.info.ram" />
                  </div>

                </div>

                <div class="d_flex align_items_center justify_content_between">

                  <div class="square form_group">
                    <label>Thông tin Card</label>
                    <input type="text" placeholder="Nhập thông tin card ..." class="form_control" v-model="defaultInfo.info.card" />
                  </div>

                  <div class="square form_group">
                    <label>Hết hạn</label>
                    <date-picker
                      class="ml_3"
                    />
                  </div>

                </div>

                <div class="d_flex align_items_center justify_content_between">

                  <div class="square form_group">
                    <label>Thông tin nhà cung cấp</label>
                    <input type="text" placeholder="Nhập thông tin nhà cung cấp ..." class="form_control" v-model="defaultInfo.info.supplier" />
                  </div>

                </div>

              </div>

              <div class="form_group">
                <label>Cụm máy chủ</label>
                <select class="form_control"  v-model="defaultInfo.region">
                  <option value="1">0</option>
                  <option value="2">1</option>
                  <option value="3">2</option>
                </select>
              </div>

              <div class="form_group">
                <label>Số lượng người dùng</label>
                <input type="text" placeholder="Nhập số lượng người dùng ..." class="form_control" v-model="defaultInfo.userAmount" />
              </div>

              <div class="form_group">
                <label>Số lượng người dùng lớn nhất</label>
                <input type="text" placeholder="Nhập số lượng người dùng max ..." class="form_control" v-model="defaultInfo.amountMax" />
              </div>

              <div class="form_group">
                <label>Trạng thái hoạt động</label>
                <select class="form_control" v-model="defaultInfo.status">
                  <option value="1">true</option>
                  <option value="2">false</option>
                </select>
              </div>

              <div class="form_group">
                <button class="form_control" @click="createNewDomain">Tạo mới</button>
              </div>
            </form>
          </div>
        </VuePerfectScrollbar>
        <!-- End: Modal Body -->
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar
  },
  props: {
    currentTheme: String
  },
  data() {
    return {
      defaultInfo: {
        name: "",
        info: {
          domain: "",
          ip: "",
          cpu: "",
          ram: "",
          card: "",
          supplier: {},
          expire: ""
        },
        region: "",
        userAmount: null,
        amountMax: "",
        status: null
      }
    }
  },
  methods: {
    close(){
      this.$emit( "closePopUpAddNewDomain", false );
    },
    createNewDomain() {
      console.log(this.defaultInfo);
      this.$store.dispatch( "createNewDomain", this.defaultInfo );
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./index.style";
</style>

