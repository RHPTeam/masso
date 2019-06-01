<template>
  <div>
    <div>
      <div
        class="body mt_4 pb_3"
        v-for="(item, index) in scheduleBlockDetail.content"
        :key="index"
      >
        <!-- Start: Text item component -->
        <div v-if="item.typeContent === 'text'">
          <add-text :item="item" :schedule="scheduleBlockDetail" />
        </div>
        <!-- End: Text item component -->
        <!--Start: Image item component -->
        <div v-if="item.typeContent === 'image'">
          <add-image :item="item" :schedule="scheduleBlockDetail" />
        </div>
        <!--  End: Image item component -->
        <!--  Start: Time item component -->
        <slider-schedule :item="item" :schedule="scheduleBlockDetail" />
        <!--  End: Time item component -->
        <!--  Start: subscribe item component -->
        <div v-if="item.typeContent === 'subscribe'">
          <subscribe
            :item="item"
            :schedule="scheduleBlockDetail"
            @updateItemFromMiddleComponent="scheduleBlockDetail.content[index] = $event"
          />
        </div>
        <!--        End: subscribe item component-->
        <!--        Start: Unsubcribe item component-->
        <div v-if="item.typeContent === 'unsubscribe'">
          <un-subscribe
            :item="item"
            :schedule="scheduleBlockDetail"
            @updateItemFromMiddleComponent="scheduleBlockDetail.content[index] = $event"
          />
        </div>
        <!--        End: Unsubcribe item component-->
      </div>
    </div>
    <div class="footer mt_3">
      <div class="title text_left">Thêm phần tử</div>
      <div class="group d_flex align_items_center">
        <div
          class="item d_flex align_items_center justify_content_center flex_column"
          @click.prevent="addItemSchedule('text', $route.params.scheduleBlockId)"
        >
          <icon-base
            class="icon-text"
            width="20"
            height="20"
            viewBox="0 0 13.53 20.11"
          >
            <icon-text />
          </icon-base>
          Văn bản
        </div>

        <div
          class="item d_flex align_items_center justify_content_center flex_column"
          @click="addItemSchedule('image', $route.params.scheduleBlockId)"
        >
          <icon-base
            class="icon-image"
            width="20"
            height="20"
            viewBox="0 0 26 26"
          >
            <icon-image />
          </icon-base>
          Hình ảnh
        </div>
        <div
          class="item d_flex align_items_center justify_content_center flex_column"
          @click="addItemSchedule('time', $route.params.scheduleBlockId)"
        >
          <icon-base
            class="icon-sand-clock"
            width="20"
            height="20"
            viewBox="0 0 14.41 20.14"
          >
            <icon-sand-clock />
          </icon-base>
          Thời gian
        </div>
        <div
          class="item d_flex align_items_center justify_content_center flex_column"
          @click="showPopupPlugins = true"
        >
          <icon-base
            class="icon-plus"
            width="20"
            height="20"
            viewBox="0 0 68 68"
          >
            <icon-plus />
          </icon-base>
          Thêm mới
        </div>
      </div>
    </div>
    <!-- Popup add plugins -->
    <transition name="popup">
      <add-plugins
        v-if="showPopupPlugins === true"
        :schedule="scheduleBlockDetail._id"
        :popupData="showPopupPlugins"
        @closePopupPlugin="showPopupPlugins = $event"
        @closePopupPluginClick="showPopupPlugins = $event"
        @showSubcrible="showSubcrible = $event"
        @showUnSubcrible="showUnSubcrible = $event"
      />
    </transition>
  </div>
</template>
<script>
import AddText from "./plugins/text";
import AddImage from "./plugins/images";
import Subscribe from "./plugins/subscribe";
import UnSubscribe from "./plugins/unsubscribe";

export default {
  components: {
    AddText,
    AddImage,
    Subscribe,
    UnSubscribe
  },
  data() {
    return {
      showPopupPlugins: false,
      showAddAttribute: false,
      showSubcrible: false,
      showUnSubcrible: false
    };
  },
  computed: {
    scheduleBlocks() {
      return this.$store.getters.scheduleBlocks;
    },
    scheduleBlockDetail() {
      return this.$store.getters.scheduleBlockDetail;
    }
  },
  methods: {
    async addItemSchedule( type, id ) {
      const dataSender = {
        type: type,
        scheduleBlockId: id
      };
      this.$store.dispatch( "createScheduleBlockItem", dataSender );
    }
  }
};
</script>
<style lang="scss" scoped>
  @import "index.style";
</style>
