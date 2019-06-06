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
          <div class="c_md_6 c_lg_4 c_xl_4 mb_2"
               v-for="( item, index ) in posts"
               :key="index"
          >
            <div class="card">

              <div class="thumbnail position_relative">
                <div class="thumbnail--bg"
                     :style="{ backgroundImage: 'url(' + item.img + ')' }"
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
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg">
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
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
          <div class="c_md_6 c_lg_4 c_xl_4 mb_2">
            <div class="card">

              <div class="thumbnail position_relative">
                <img src="https://www.aybu.edu.tr/insanvetoplum/psikoloji/contents/images/facebook-logo.jpg" alt="">
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
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg">
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
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
          <div class="c_md_6 c_lg_4 c_xl_4 mb_2">
            <div class="card">

              <div class="thumbnail position_relative">
                <img src="https://www.aybu.edu.tr/insanvetoplum/psikoloji/contents/images/facebook-logo.jpg" alt="">
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
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg">
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
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

          <div class="c_md_6 c_lg_4 c_xl_4 mb_2">
            <div class="card">

              <div class="thumbnail position_relative">
                <img src="https://www.aybu.edu.tr/insanvetoplum/psikoloji/contents/images/facebook-logo.jpg" alt="">
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
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg">
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
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
          <div class="c_md_6 c_lg_4 c_xl_4 mb_2">
            <div class="card">

              <div class="thumbnail position_relative">
                <img src="https://www.aybu.edu.tr/insanvetoplum/psikoloji/contents/images/facebook-logo.jpg" alt="">
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
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg">
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
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
          <div class="c_md_6 c_lg_4 c_xl_4 mb_2">
            <div class="card">

              <div class="thumbnail position_relative">
                <img src="https://www.aybu.edu.tr/insanvetoplum/psikoloji/contents/images/facebook-logo.jpg" alt="">
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
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg">
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
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

          <div class="c_md_6 c_lg_4 c_xl_4 mb_2">
            <div class="card">

              <div class="thumbnail position_relative">
                <img src="https://www.aybu.edu.tr/insanvetoplum/psikoloji/contents/images/facebook-logo.jpg" alt="">
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
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg">
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
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
          <div class="c_md_6 c_lg_4 c_xl_4 mb_2">
            <div class="card">

              <div class="thumbnail position_relative">
                <img src="https://www.aybu.edu.tr/insanvetoplum/psikoloji/contents/images/facebook-logo.jpg" alt="">
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
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg">
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
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
          <div class="c_md_6 c_lg_4 c_xl_4 mb_2">
            <div class="card">

              <div class="thumbnail position_relative">
                <img src="https://www.aybu.edu.tr/insanvetoplum/psikoloji/contents/images/facebook-logo.jpg" alt="">
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
                  <h4 class="m_0">Lorem ipsum dolor sit amet.</h4>
                  <div class="editor d_flex align_items_center">
                    <div class="name mr_2">
                      by Liu Kang
                    </div>
                    <div class="avatar">
                      <img src="https://pixel.nymag.com/imgs/daily/vulture/2018/11/02/02-avatar-2.w700.h700.jpg">
                    </div>
                  </div>
                </div>
                <div class="info d_flex align_items_center">
                  <div class="left">
                    <p class="price">$23</p>
                    <div class="rate"></div>
                    <div class="sales">56 sales</div>
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
      productSelected: {},
      posts: [
        {
          img: "https://hinhanhdepvai.com/wp-content/uploads/2017/05/hot-girl.jpg",
          title: "Cho tôi một vé trở về tuổi thơ",
          editor: "Đặng Yến",
          price: "100,000",
          tags: [ "du lịch", "mỹ phẩm" ],
          sale: 103,
          updatedAt: "2019-06-05T12:27:39.126+00:00"
        }
      ]
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
  }
}
</script>

<style lang="scss" scoped>
  @import "index.style";
</style>
