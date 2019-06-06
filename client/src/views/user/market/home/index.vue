<template>
  <div class="main ct">
    <div class="search p_4">
      <div class="d_flex justify_content_center">
        <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, esse.</h3>
      </div>

      <div class=" d_flex justify_content_center mt_2">
        <div class="form--search d_flex align_content_center position_relative">
          <div class="icon--search position_absolute btn">
            <icon-base
              icon-name="logo"
              width="24"
              height="24"
              viewBox="0 0 25 25"
            >
              <icon-info />
            </icon-base>
          </div>
          <input class="search--input" type="text" placeholder="Tìm Kiếm...">
        </div>
      </div>
    </div>
    <div class="products p_4">
      <div class="tab d_flex justify_content_center py_3">
        <div class="d_flex align_items_center">
          <button class="btn btn_outline_info mr_3">Post Popular</button>
          <button class="btn btn_outline_info">Campaigns Simple</button>
        </div>
      </div>
      <div class="popular">
        <div class="r">
          <div class="c_md_6 c_lg_4 mb_3"
               v-for="( item, index ) in sixNewProducts"
               :key="index"
          >
            <div class="card">

              <div class="thumbnail position_relative">
                <div class="thumbnail--bg"
                     @click="showDetailPopup( item )"
                ></div>
                <div class="icon position_absolute">
                  <icon-base
                    icon-name="logo"
                    width="24"
                    height="24"
                    viewBox="0 0 25 25"
                  >
                    <icon-info />
                  </icon-base>
                </div>
              </div>

              <div class="detail px_3">
                <div class="desc">
                  <div class="m_0 name--product">{{ item.name }}</div>
                  <div class="editor d_flex align_items_center">
                    <div>by</div>
                    <div class="avatar mx_1">
                      <img src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg">
                    </div>
                    <div class="name mr_2">
                      {{ item._creator.name }}
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">{{ item.priceCents }} VND</p>
                    <div class="rate"></div>
                    <div class="sales">{{ item.numberOfSales }} đã sử dụng</div>
                  </div>
                  <div class="right d_flex align_items_center ml_auto">
                    <button class="btn btn_outline_info mr_2">Download</button>
                    <div class="icon">
                      <icon-base
                        icon-name="logo"
                        width="24"
                        height="24"
                        viewBox="0 0 550 550"
                      >
                        <icon-copy />
                      </icon-base>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="join p_4">
      <div class="r">
        <div class="c_md_6 c_lg_6 c_xl_6">
          <div class="mb_2">Nếu bạn chưa có tài khoản, vui lòng đăng ký để có trải nghiệm tốt hơn</div>
          <form>
            <div class="form_group">
              <div class="mb_2">Nhập email của bạn</div>
              <input type="text" class="form_control" placeholder="Nhập email ..." />
            </div>
          </form>
        </div>
        <div class="c_md_6 c_lg_6 c_xl_6">
          <div class="mb_2">Vui lòng đăng nhập nếu bạn đã có tài khoản của hệ thống zinbee</div>
          <button class="btn btn_outline_info">Đăng nhập</button>
        </div>
      </div>
    </div>
    <!-- *************POPUP************* -->
    <transition name="popup">
      <detail-popup
        v-if="isShowDetailPopup"
        :product="productSelected"
        @closePopup="isShowDetailPopup = $event"
      ></detail-popup>
    </transition>
  </div>
</template>

<script>
import DetailPopup from "../layouts/desktop/popups/detail";

export default {
  components: {
    DetailPopup
  },
  data() {
    return {
      isShowDetailPopup: false,
      productSelected: {}
    }
  },
  computed: {
    products(){
      return this.$store.getters.allProduct;
    },
    sixNewProducts() {
      return this.products.slice(this.products.length - 6, this.products.length).reverse();
    }
  },
  methods: {
    dateFormat( date ) {
      const dateTime = new Date( date ),
        day = String( dateTime.getDate() ).padStart( 2, 0 ),
        month = String( dateTime.getMonth() + 1 ).padStart( 2, 0 ),
        year = dateTime.getFullYear();

      return `${day}/${month}/${year}`;
    },
    showDetailPopup( val ) {
      this.productSelected = val;
      this.isShowDetailPopup = true;
    }
  },
  created() {
    this.$store.dispatch("products");
  },
}
</script>

<style lang="scss" scoped>
@import "index.style";
.thumbnail--bg{
  background: url("https://hinhanhdepvai.com/wp-content/uploads/2017/05/hot-girl.jpg") no-repeat;
  background-size: cover;
}
</style>
