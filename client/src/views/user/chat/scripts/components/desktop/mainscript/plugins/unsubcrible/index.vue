<template>
  <div class="unsubcrible card text_left mb_3" :data-theme="currentTheme">
    <div class="card_body">
      <div
        class="header d_flex align_items_center justify_content_between mb_3"
      >
        <h3 class="title">
          <img src="@/assets/images/plugins/subscribe.svg" class="" height="30" alt="">
          {{ $t('chat.common.card.unsubscribe.title') }}</h3>
        <div class="icon--remove ml_auto" @click="isDeleteItemBlock = true">
          <icon-base
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
        {{ $t('chat.common.card.unsubscribe.desc') }}
      </div>

      <div class="subcrible--edit mb_0">
        <div class="mb_2"><b>{{ $t('chat.common.card.unsubscribe.label') }}</b></div>
        <list :sequence="item" :block="block" />
      </div>
    </div>
    <!-- Start: Delete Item Popup-->
    <transition name="popup">
      <delete-campaign-popup
          v-if="isDeleteItemBlock === true"
          :data-theme="currentTheme"
          :item="item"
          :block="block"
          title="Delete Unsubcrible"
          @closePopup="isDeleteItemBlock = $event"
          storeActionName="deleteUnsubcrible"
          typeName="itemblock"
      ></delete-campaign-popup>
    </transition>
    <!-- End: Delete Item Popup -->
  </div>
</template>
<script>
import List from "../sequence";
import DeleteCampaignPopup from "../../../popup/delete";
export default {
  components: {
    List,
    DeleteCampaignPopup
  },
  props: {
    arrValue: Array,
    block: Object,
    item: Object
  },
  data() {
    return {
      showFilter: false,
      addFilter: false,
      showCondition: false,
      isDeleteItemBlock: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../index.style";
.unsubcrible{
  border-radius: 10px;
  background: #fff;
  transition: 0.3s;
  .title{
    font-weight: bold;
    font-size: 18px;
    line-height: 30px;
    color: #000000ed;
    margin-bottom: 0;
  }
  &:hover{
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.11), 0 1px 0 0 rgba(0, 0, 0, 0.08);
  }
  .icon--remove{
    svg{
      cursor: pointer;
    }
  }
}
.unsubcrible[data-theme="dark"]{
  border: 1px solid transparent;
  background: none;
  .card_body{
    background: #2f3236;
    border-radius: 10px;
  }
  .title, .icon--remove svg{
    color: #fff;
  }
  &:hover{
    border: 1px solid $border_radius;
    box-shadow: 0;
  }
  .desc, .subcrible--edit{
    color: #fff;
  }
}
</style>
