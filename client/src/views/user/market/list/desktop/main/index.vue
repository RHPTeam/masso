<template>
  <div class="list--main py_3 pr_4">
    <div class="r list--group">
      <div class="c_12 list--group-item"
           v-for="( item, index ) in products"
           :key="index"
      >
        <div class="card">
          <div class="card_body d_flex">
            <div class="c_md_9 left p_0">
              <div class="top d_flex">
                <div class="thumbnail mr_3">
                  <div class="thumbnail--bg"
                       @click="showDetailPopup( item )"
                  ></div>
                </div>
                <div class="info">
                  <div class="title font_weight_bold"
                       @click="showDetailPopup( item )"
                  >{{ item.name }}</div>
                  <div class="editor">bởi {{ item._creator.name }}</div>
                  <div class="description mb_1">{{ item.description }}</div>
                  <div class="attribute">
                    <ul class="m_0">
                      <li class="list_group_item" v-for="(attr, index) in item.attributes.slice(0, 3)" :key="`c-${index}`">
                        <span class="font_weight_bold">{{ attr.name }} : </span>
                        <span>{{ attr.value }}</span>
                      </li>
                      <li v-if="item.attributes.length > 1">....</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="bottom mt_3">
                <div class="tags">
                  <span>Tags: </span>
                  <span v-for="( tag, tagIndex ) in item.tags"
                        :key="tagIndex"
                  >{{ tag }}{{ tagIndex === item.tags.length - 1 ? "" : ", " }}</span>
                </div>
              </div>
            </div>
            <div class="c_md_3 right py_0 pr_0 pl_3">
              <div class="top"></div>
              <div class="right--item content text_center mt_3">
                <div class="price font_weight_bold">{{ item.priceCents }} ₫</div>
                <div class="sale d_flex align_items_center justify_content_center mt_1">
                  <icon-base
                    class="icon--user mr_1"
                    width="16px"
                    height="16px"
                    viewBox="0 0 20 20"
                  >
                    <icon-user></icon-user>
                  </icon-base>
                  <span>{{ item.numberOfSales }} đã sử dụng</span>
                </div>
                <div class="last--update mt_1">Cập nhật lần cuối: {{ dateFormat( item.updatedAt ) }}</div>
              </div>
              <div class="right--item bottom text_center">
                <div class="btn btn_outline_info">Thêm vào kho</div>
              </div>
            </div>
          </div>
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
import DetailPopup from "../../../layouts/desktop/popups/detail";

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

<style scoped lang="scss">
@import "./index.style";
.thumbnail--bg{
  background: url("https://hinhanhdepvai.com/wp-content/uploads/2017/05/hot-girl.jpg") no-repeat;
  background-size: cover;
}
</style>
