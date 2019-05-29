<template>
  <div class="subcrible card text_left mb_4 mt_4" :data-theme="currentTheme">
    <div class="card_body">
      <div
        class="header d_flex align_items_center justify_content_between mb_3"
      >
          <img src="@/assets/images/plugins/subscribe.svg" class="mr_1" height="30" alt="">
        <h3 class="title mb_0">{{ $t("chat.common.card.subscribe.title") }}</h3>
        <div class="icon--remove ml_auto" @click="isDeleteItemBlock = true">
          <icon-base
            class="icon--delete"
            icon-name="remove"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>
      <div class="desc mb_3">
        {{ $t("chat.common.card.subscribe.desc") }}
      </div>
<!--      <div class="subcrible&#45;&#45;filter mb_3">-->
<!--        <div class="body mb_3" v-if="showFilter === true">-->
<!--          &lt;!&ndash;Start: Add Filter&ndash;&gt;-->
<!--          <div-->
<!--            class="option d_flex align_items_center pb_2 pt_2"-->
<!--            v-if="addFilter === true"-->
<!--          >-->
<!--            <filter-bee />-->
<!--            <div class="icon d_flex align_items_center">-->
<!--              <div-->
<!--                class="add and cp position_relative"-->
<!--                @click.prevent="showCondition = !showCondition"-->
<!--              >-->
<!--                và-->
<!--                <div-->
<!--                  class="condition position_absolute"-->
<!--                  v-if="showCondition === true"-->
<!--                >-->
<!--                  <div class="item">và</div>-->
<!--                  <div class="item">hoặc</div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="icon&#45;&#45;drop cp ml_1">-->
<!--                <icon-base-->
<!--                  icon-name="remove"-->
<!--                  width="18"-->
<!--                  height="18"-->
<!--                  viewBox="0 0 18 18"-->
<!--                >-->
<!--                  <icon-remove />-->
<!--                </icon-base>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          &lt;!&ndash;End: Add Filter&ndash;&gt;-->
<!--          &lt;!&ndash;Start:  Filter&ndash;&gt;-->
<!--          <div class="option d_flex align_items_center pb_2 pt_2">-->
<!--            <filter-bee />-->
<!--            <div class="icon d_flex align_items_center">-->
<!--              <div class="add cp" @click.prevent="addFilter = !addFilter">-->
<!--                <icon-base-->
<!--                  icon-name="plus"-->
<!--                  width="18"-->
<!--                  height="18"-->
<!--                  viewBox="0 0 60 60"-->
<!--                >-->
<!--                  <icon-plus />-->
<!--                </icon-base>-->
<!--              </div>-->
<!--              <div class="icon&#45;&#45;drop cp ml_1">-->
<!--                <icon-base-->
<!--                  icon-name="remove"-->
<!--                  width="18"-->
<!--                  height="18"-->
<!--                  viewBox="0 0 18 18"-->
<!--                >-->
<!--                  <icon-remove />-->
<!--                </icon-base>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          &lt;!&ndash;End:  Filter&ndash;&gt;-->
<!--          &lt;!&ndash;Start: Result Filter&ndash;&gt;-->
<!--          <div class="result d_flex align_items_center mb_3 mt_3">-->
<!--            <div class="item text_center">K</div>-->
<!--            <div class="item text_center">K</div>-->
<!--            <div class="desc ml_2">Xem những người phù hợp với bộ lọc</div>-->
<!--          </div>-->
<!--          &lt;!&ndash;End: Result Filter&ndash;&gt;-->
<!--        </div>-->
<!--        <button-->
<!--          class="btn btn_warning btn&#45;&#45;add"-->
<!--          @click="showFilter = !showFilter"-->
<!--        >-->
<!--          Thêm bộ lọc-->
<!--        </button>-->
<!--      </div>-->
      <div class="subcrible--edit mb_3">
        <list
          :sequence="item"
          :block="schedule"
          @update="updateToParent($event)"
        />
      </div>
    </div>
    <!-- Start: Delete Item Popup-->
    <transition name="popup">
      <delete-campaign-popup
          v-if="isDeleteItemBlock === true"
          :data-theme="currentTheme"
          title="Delete Property"
          @closePopup="isDeleteItemBlock = $event"
          storeActionName="deleteProperty"
          typeName="Property"
      ></delete-campaign-popup>
    </transition>
    <!-- End: Delete Item Popup -->
  </div>
</template>
<script>
import List from "../sequence";
import DeleteCampaignPopup from "@/components/popups/delete";
export default {
  props: {
    schedule: Object,
    item: Object
  },
  data() {
    return {
      showFilter: false,
      addFilter: false,
      showCondition: false,
      isDeleteItemBlock: false,
      dataMulti: [{
        title: "A"
      },{
        title: "B"
      },{
        title: "C"
      },{
        title: "D"
      }]
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    updateToParent(value) {
      this.$emit("updateItemFromMiddleComponent", value);
    }
  },
  components: {
    List,
    DeleteCampaignPopup
  }
};
</script>
<style lang="scss" scoped>
@import "../index.style";
.subcrible{
  .title{
    color: #000000;
    margin: 0 0 14px;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 24px;
  }
  .icon--delete{
    transition: 0.3s;
    &:hover{
      color: #fdb849;
    }
  }
}
.subcrible[data-theme="dark"]{
  border: 0;
  .card_body{
    background: #2f3236;
    border-radius: 10px;
  }
}

.subcrible[data-theme="light"]{
  border-radius: 10px;
  transition: 0.3s;
  &:hover{
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.11), 0 1px 0 0 rgba(0, 0, 0, 0.08);
  }
}

@media only screen and (max-width: 845px) and (min-width: 768px){
  .subcrible{
    width: 280px!important;
  }
}
</style>
