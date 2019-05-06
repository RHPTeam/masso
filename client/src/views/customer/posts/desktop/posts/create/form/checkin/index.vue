<template>
  <div class="tag d_flex align_items_center">
    <div class="fixed text_center">Với</div>
    <div class="option position_relative">
      <input type="text" placeholder="Chọn địa điểm ..." v-model="placesName" v-click-outside="close" @click="isShowSuggestDefault = true">
      <div class="suggest position_absolute" v-if="isShowSuggestDefault === true">
        <VuePerfectScrollbar class="show">
          <div v-if="this.$store.getters.faceBStatus === 'loading'" class="loading d_flex align_items_center">
            <loading-component class="text_center"/>
          </div>
          <div v-else v-for="(item, index) in placesPopular" :key="index">
            <div class="item--tag d_flex align_items_center" @click="attachPlacesName(item)">
              <div :style="{ backgroundImage: 'url('+item.photo+')' }" class="avatar"></div>
              <div class="desc ml_2">
                <div class="name">
                  {{ item.title }}
                </div>
                <div class="">
                  {{ item.subtitle }}
                </div>
              </div>
            </div>
          </div>
        </VuePerfectScrollbar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placesName: "",
      isShowSuggestDefault: false
    }
  },
  computed: {
    placesPopular(){
      return this.$store.getters.places;
    }
  },
  watch: {
    placesName(value) {
      if( value.length !== 0 ) {
        this.$store.dispatch( "searchPlacesCheckIn", value );
      }
    }
  },
  async created() {
  },
  methods: {
    attachPlacesName( item ) {
      this.placesName = item.title;
      this.isShowSuggestDefault = false;
    },
    close(){
      this.isShowSuggestDefault = false
    }
  }
};
</script>



<style lang="scss" scoped>
  @import "../index.style";
  .suggest {
    background-color: $mainDefault;
    border: 1px solid $border-color;
    border-radius: calc(.25rem + 2px);
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 99;
    .show {
      max-height: 200px;
      overflow-x: hidden;
      overflow-y: auto;
      width: 100%;
    }
    .item--tag {
      padding: 6px 8px;
      width: 100%;
      &:hover, &:active, &:focus, &:visited {
        background-color: $orange;
        color: $mainDefault;
        transition: all .5s ease;
      }
      .avatar {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 30px;
        width: 30px;
      }
      .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .name {
        font-weight: 600;
      }
    }
  }
</style>
