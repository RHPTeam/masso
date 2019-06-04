<template>
  <div class="activity" :data-theme="currentTheme">
    <!--Start: show option activity-->
    <div
      v-if="isShowActivityDefault === false"
      class="activity--default position_relative"
    >
      <input
        type="text"
        class="default"
        placeholder="Chọn cảm xúc hoặc hoạt động..."
        @click="showSuggestActivityDefault"
      />
      <div
        class="suggest position_absolute"
        v-if="isShowSuggestDefault === true"
      >
        <VuePerfectScrollbar class="show"
                             v-click-outside="closeSuggestActivityDefault"
        >
          <div
            v-if="this.$store.getters.faceBStatus === 'loading'"
            class="loading-block d_flex align_items_cente justify_content_center py_3"
          >
            <loading-component class="text_center"/>
          </div>
          <div
            v-else v-for="(item, index) in activity"
            :key="`av-${index}`"
          >
            <div
              class="item--tag d_flex align_items_center"
              @click="showOptionActivity(item)"
            >
              {{ item.text }}
            </div>
          </div>
        </VuePerfectScrollbar>
      </div>
    </div>
    <!--End: show option activity-->
    <!--Start: show choose option activity-->
    <div
      v-if="isShowActivityDefault === true"
      class="activity--suggets d_flex align_items_center"
    >
      <div class="activity--desc text_center"
           @click="isShowActivityDefault = false"
      >
        {{ typeActivityDefault }}
      </div>
      <div class="activity--option position_relative">
        <input
          type="text"
          placeholder="Chọn biểu tượng..."
          v-model="activityName"
          v-click-outside="close"
          @click="showSuggestOptionActivityFb"
        >
        <div
          class="suggest position_absolute"
          v-if="isShowSuggestOptionActivity === true"
        >
          <VuePerfectScrollbar class="show">
            <div
              v-if="this.$store.getters.faceBStatus === 'loading'"
              class="loading-block d_flex align_items_center justify_content_center py_3"
            >
              <loading-component class="text_center"/>
            </div>
            <div
              v-else
              v-for="(item, index) in listActivity"
              :key="`i-${index}`"
            >
              <div
                class="item--tag d_flex align_items_center"
                @click="attachActivity(item)"
              >
                <div
                  :style="{ backgroundImage: 'url('+item.photo+')' }"
                  class="avatar"
                >
                </div>
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
      typeActivityDefault: "",
      activityDefault: {
        typeActivity: {
          title: "",
          id: ""
        },
        id: {
          id: "",
          photo: ""
        },
        text: ""
      },
      isShowActivityDefault: false,
      isShowSuggestOptionActivity: true,
      isShowSuggestDefault: false
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
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

      this.activityDefault.id.id = item.uid;
      this.activityDefault.id.photo = item.photo;
      this.activityDefault.text = item.text;

      this.post.activity = this.activityDefault;
      this.$store.dispatch( "updatePost", this.post );

      this.isShowSuggestOptionActivity = false;
      this.$emit( "sendPhoto", item.photo );
      this.$emit( "closeActivity", false );
    },
    close(){
      this.isShowSuggestOptionActivity = false;
    },
    closeSuggestActivityDefault() {
      this.isShowSuggestDefault = false;
    },
    showSuggestActivityDefault() {
      this.isShowSuggestDefault = true;
    },
    showOptionActivity(val) {
      this.isShowActivityDefault = true;
      this.typeActivityDefault = val.text;

      this.activityDefault.typeActivity.text = val.prompt_text;
      this.activityDefault.typeActivity.id = val.uid;

      this.$store.dispatch( "getListActivityFb", val.uid );
    },
    showSuggestOptionActivityFb(){
      this.isShowSuggestOptionActivity = true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
