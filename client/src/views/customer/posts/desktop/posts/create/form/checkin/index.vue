<template>
  <div class="tag d_flex align_items_center">
    <div class="fixed text_center">Tại</div>
    <div class="option position_relative">
      <input type="text"
             placeholder="Bạn đang ở đâu?"
             v-model="placesName"
             v-click-outside="close"
             @click="isShowSuggestDefault = true"
      >
      <div class="suggest position_absolute" v-if="isShowSuggestDefault === true">
        <VuePerfectScrollbar class="show">
          <div v-if="this.$store.getters.faceBStatus === 'loading'"
               class="loading--block d_flex align_items_center justify_content_center py_3"
          >
            <loading-component class="text_center"/>
          </div>
          <div v-else v-for="(item, index) in placesPopular" :key="index">
            <div class="item--tag d_flex align_items_center" @click="attachPlacesName(item)">
              <div class="avatar">
                <div class="avatar--bg"
                     :style="{ backgroundImage: 'url('+item.photo+')' }"
                ></div>
              </div>
              <div class="desc ml_2">
                <div class="name">
                  {{ item.title }}
                </div>
                <div class="address">
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
  props: {
    post: {
      type: Object
    }
  },
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
      this.post.place = item.title;
      delete this.post.attachments;
      this.$store.dispatch( "updatePost", this.post );
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
    border-radius: 0 0 .5rem .5rem;
    box-shadow: 0 0 10px rgba( 0, 0, 0, .1);
    left: -1px;
    padding-bottom: .375rem;
    width: calc( 100% + 2px );
    z-index: 99;
    .show {
      max-height: 200px;
      overflow-x: hidden;
      overflow-y: auto;
      width: 100%;
    }
    .item--tag {
      cursor: pointer;
      padding: .25rem .75rem;
      width: 100%;
      &:hover, &:active, &:focus, &:visited {
        background-color: $orange;
        color: $mainDefault;
        transition: all .5s ease;
      }
      .avatar {
        height: 30px;
        width: 30px;
        .avatar--bg {
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          height: 100%;
          width: 100%;
        }
      }
      .desc {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: calc(100% - 30px);
        .address {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .name {
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .loading--block {
      color: #999;
      font-size: .75rem;
    }
  }
</style>
