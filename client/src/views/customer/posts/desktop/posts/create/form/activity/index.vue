<template>
  <div class="activity">
    <!--Start: show option activity-->
    <div v-if="isShowActivityDefault === false" class="activity--default position_relative">
      <input type="text" class="default" placeholder="Chọn biểu tượng cảm xúc" @click="showSuggestActivityDefault" />
      <div class="suggest position_absolute" v-if="isShowSuggestDefault === true">
        <VuePerfectScrollbar class="show">
          <div v-if="this.$store.getters.faceBStatus === 'loading'" class="loading d_flex align_items_center">
            <loading-component class="text_center"/>
          </div>
          <div v-else v-for="(item, index) in activity" :key="`av-${index}`">
            <div class="item--tag d_flex align_items_center" @click="showOptionActivity(item)">{{ item.text }}</div>
          </div>
        </VuePerfectScrollbar>
      </div>
    </div>
    <!--End: show option activity-->
    <!--Start: show choose option activity-->
    <div v-if="isShowActivityDefault === true" class="activity--suggets d_flex align_items_center mt_2 px_2">
      <div class="activity--desc text_center">{{ activityDefault.typeActivity }}</div>
      <div class="activity--option position_relative">
        <input type="text" placeholder="Chọn biểu tượng cảm xúc ..." v-model="activityName" v-click-outside="close" @click="isShowSuggestOptionActivity = true">
        <div class="suggest position_absolute" v-if="isShowSuggestOptionActivity === true">
          <VuePerfectScrollbar class="show">
            <div v-if="this.$store.getters.faceBStatus === 'loading'" class="loading d_flex align_items_center">
              <loading-component class="text_center"/>
            </div>
            <div v-else v-for="(item, index) in listActivity" :key="`i-${index}`">
              <div class="item--tag d_flex align_items_center" @click="attachActivity(item)">
                <div :style="{ backgroundImage: 'url('+item.photo+')' }" class="avatar"></div>
                <div class="desc ml_2">
                    {{ item.text }}
                </div>
              </div>
            </div>
          </VuePerfectScrollbar>
        </div>
      </div>
    </div>
    <!--End: show choose option activity-->
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
      activityName: "",
      activityDefault: {
        "typeActivity": "",
        "id": "",
        "text": ""
      },
      isShowActivityDefault: false,
      isShowSuggestOptionActivity: true,
      isShowSuggestDefault: false
    }
  },
  computed: {
    activity() {
      return this.$store.getters.activity;
    },
    listActivity(){
      return this.$store.getters.listActivity;
    }
  },
  watch: {
  },
  async created() {
  },
  methods: {
    attachActivity( item ) {
      this.activityDefault.id = item.uid;
      this.activityDefault.text = item.text;
      this.post.activity = this.activityDefault;
      this.$store.dispatch( "updatePost", this.post );
      this.isShowSuggestOptionActivity = false;
      this.$emit( "sendPhoto", item.photo );
    },
    close(){
      this.isShowSuggestOptionActivity = false
    },
    showSuggestActivityDefault() {
      this.$store.dispatch( "getActivityFb" );
      this.isShowSuggestDefault = true;
    },
    showOptionActivity(val) {
      this.isShowActivityDefault = true;
      this.activityDefault.typeActivity = val.text;
      this.$store.dispatch( "getListActivityFb", val.uid );
    }
  }
};
</script>



<style lang="scss" scoped>
  .activity--default {
    input {
      border: none;
      border-bottom: 1px solid #e4e4e4;
      height: 40px;
      padding-left: 2rem;
      width: 100%;
      &:hover, &:active, &:visited, &:focus {
        box-shadow: none;
        outline: 0;
      }
    }
  }
  .activity--suggets {
    .activity--desc {
      width: 150px;
      height: 40px;
      line-height: 40px;
      background-color: #fafafa;
    }
    .activity--option {
      width: calc(100% - 150px);
      input {
        width: 100%;
        height: 40px;
        border: none;
        border-bottom: 1px solid #e4e4e4;
        border-top: 1px dotted #e4e4e4;
        &:hover, &:active, &:visited, &:focus {
          box-shadow: none;
          outline: 0;
        }
      }
    }
  }
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
