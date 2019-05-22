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
      <div class="suggest position_absolute" :data-theme="currentTheme" v-if="isShowSuggestDefault === true">
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
    currentTheme() {
      return this.$store.getters.themeName;
    },
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
  methods: {
    attachPlacesName( item ) {
      this.placesName = item.title;
      this.post.place = item.uniqueID;
      delete this.post.attachments;
      this.$store.dispatch( "updatePost", this.post );
      this.isShowSuggestDefault = false;
      this.$emit( "closeCheckin", false );
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
  border-radius: 0 0 .5rem .5rem;
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

/* Theme Color */
.suggest[data-theme="light"] {
  background-color: $mainDefault;
  border: 1px solid $border-color;
  box-shadow: 0 0 10px rgba( 0, 0, 0, .1);
}
.suggest[data-theme="dark"] {
  background-color: #27292c;
  border: 1px solid #444;
  box-shadow: 0 0 10px rgba( 255, 255, 255, .1);
  .item--tag {
    .desc {
      .name {
        color: #f7f7f7;
      }
    }
  }
}
</style>
