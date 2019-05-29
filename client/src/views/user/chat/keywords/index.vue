<template>
  <div class="main" :data-theme="currentTheme">
    <div class="d_block d_md_none">
      <!-- <app-auto-mobile /> -->
    </div>
    <div class="d_none d_md_block">
      <app-bread-crumb
        :nameBread="$t('chat.keywords.title')"
        :subBread="$t('chat.keywords.desc')"
      />
      <div class="main--content r">
        <div class="auto--sidebar c_md_4 c_xl_4">
          <auto-sidebar />
        </div>
        <div class="auto--main c_md_8 c_xl_8">
          <loading-component
          />
          <div class="auto--main-wrap p_4">
            <div class="auto--content-header d_flex align_items_center mb_3">
              <contenteditable
                class="header--title"
                tag="div"
                :contenteditable="true"
                :placeholder="$t('chat.keywords.content.nameSyntax')"
                v-model="title"
              />
              <div class="icon--drop ml_auto" @click="isDeleteItemBlock = true">
                <icon-base
                  class="icon--remove"
                  icon-name="remove"
                  width="26"
                  height="26"
                  viewBox="0 0 20 20"
                >
                  <icon-remove />
                </icon-base>
              </div>
            </div>
            <auto-header />
            <auto-reply-main />
          </div>
        </div>
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
import AutoHeader from "./components/desktop/autosidebar/header";
import AppBreadCrumb from "@/components/breadcrumb";
import AutoSidebar from "./components/desktop/autosidebar";
import AutoReplyMain from "./components/desktop/autocontent";
import DeleteCampaignPopup from "@/components/popups/delete";

let typingTimer;
export default {
  components: {
    AppBreadCrumb,
    AutoSidebar,
    AutoReplyMain,
    DeleteCampaignPopup,
    AutoHeader
  },
  data() {
    return {
      isDeleteItemBlock: false,
      title: "VVVVVVVV"
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    // syntax() {
    //   if (this.$store.getters.syntax === undefined)
    //     return { title: "Mặc định (dữ liệu mẫu)" };
    //   return this.$store.getters.syntax;
    // }
  },
  async created() {
    // await this.$store.dispatch("getFirstSyntax");
  },
  methods: {
    // upTypingText(type, group) {
    //   clearTimeout(typingTimer);
    //   if (type === "titlesyntax") {
    //     typingTimer = setTimeout(this.updateSyntax(group), 1000);
    //   }
    // },
    // clear() {
    //   clearTimeout(typingTimer);
    // },
    // updateSyntax() {
    //   this.$store.dispatch("updateSyntax", this.$store.getters.syntax);
    // }
  }
};
</script>

<style scoped lang="scss">
@import "./index.style";
</style>
