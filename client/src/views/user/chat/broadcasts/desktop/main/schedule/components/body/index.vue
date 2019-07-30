<template>
  <div>
    <div v-if="scheduleBlockDetail && scheduleBlockDetail.length === 0"></div>
    <div v-else>
      <div
        v-for="(item, index) in scheduleBlockDetail.content"
        :key="index"
      >
        <!--Start: Text item component-->
        <div v-if="item.typeContent === 'text'">
          <add-text
            :item="item"
            :schedule="scheduleBlockDetail"
            :index="idScheduleDefault"
          />
        </div>
        <!--End: Text item component-->

        <!--Start: Image item component-->
        <div v-if="item.typeContent === 'image'">
          <add-image
            :item="item"
            :schedule="scheduleBlockDetail"
            :index="idScheduleDefault"
          />
        </div>
        <!--  End: Image item component-->

        <!--  Start: Time item component-->
        <div v-if="item.typeContent === 'time'">
          <add-time
            :item="item"
            :schedule="scheduleBlockDetail"
            :index="idScheduleDefault"
          />
        </div>
        <!-- End: Time item component-->

        <!-- Start: subcribe item component-->
        <div v-if="item.typeContent === 'subscribe'">
          <subcribe
            :item="item"
            :schedule="scheduleBlockDetail"
            :index="idScheduleDefault"
          />
        </div>
        <!--  End: subcribe item component-->

        <!-- Start: Unsubcribe item component-->
        <div v-if="item.typeContent === 'unsubscribe'">
          <un-subscribe
            :item="item"
            :schedule="scheduleBlockDetail"
            :index="idScheduleDefault"
          />
        </div>
        <!-- End: Unsubcribe item component-->
      </div>
    </div>
    <div class="footer mt_3">
      <div class="title text_left">{{ $t("chat.common.card.add.title") }}</div>
      <div class="group d_flex align_items_center">
        <div
          class="item d_flex align_items_center justify_content_center flex_column"
          @click.prevent="addItemSchedule('text')"
        >
          <icon-base class="icon-text" width="20" height="20" viewBox="0 0 13.53 20.11">
            <icon-text/>
          </icon-base>{{ $t("chat.common.card.add.text") }}
        </div>

        <div
          class="item d_flex align_items_center justify_content_center flex_column"
          @click.prevent="addItemSchedule('image')"
        >
          <icon-base class="icon-image" width="20" height="20" viewBox="0 0 26 26">
            <icon-image/>
          </icon-base>{{ $t("chat.common.card.add.images") }}
        </div>
        <div
          class="item d_flex align_items_center justify_content_center flex_column"
          @click.prevent="addItemSchedule('time')"
        >
          <icon-base class="icon-sand-clock" width="20" height="20" viewBox="0 0 14.41 20.14">
            <icon-sand-clock/>
          </icon-base>{{ $t("chat.common.card.add.time") }}
        </div>
        <div
          class="item d_flex align_items_center justify_content_center flex_column"
          @click="showPopupPlugins = true"
        >
          <icon-base class="icon-plus" width="20" height="20" viewBox="0 0 68 68">
            <icon-plus/>
          </icon-base>{{ $t("chat.common.card.add.add") }}
        </div>
      </div>
    </div>
    <!-- Popup add plugins -->
    <transition name="popup">
      <add-plugins
        v-if="showPopupPlugins === true"
        :schedule="scheduleBlockDetail._id"
        :index="idScheduleDefault"
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
import AddTime from "./plugins/slider";
import AddImage from "./plugins/images";
import Subscribe from "./plugins/subscribe";
import UnSubscribe from "./plugins/unsubscribe";
export default {
  components: {
    AddText,
    AddTime,
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
    scheduleBlockDetail() {
      return this.$store.getters.scheduleBlockDetail;
    },
    schedules() {
      return this.$store.getters.schedules;
    },
    schedule() {
      return this.$store.getters.schedule;
    },
    idScheduleDefault(){
      return this.$store.getters.idScheduleDefault;
    }
  },
  methods: {
    async addItemSchedule(type) {
      const dataSender = {
        type: type,
        itemId: this.$route.params.scheduleBlockId,
        scheduleId: this.idScheduleDefault
      };
      this.$store.dispatch("createItemSchedule", dataSender);
    }
  }
};
</script>
<style lang="scss" scoped>
  @import "index.style";
</style>
