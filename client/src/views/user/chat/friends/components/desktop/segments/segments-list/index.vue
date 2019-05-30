<template>
  <!-- Segments List-->
  <div class="segments--list" :data-theme="currentTheme">
    <div
      class="btn--seeall mr_3 mb_2"
      :class="[groupSelected === false ? 'btn--seall-active' : '']"
      @click="seeAllUsers"
    >
      {{ $t("chat.friends.view.all") }}
    </div>

    <div class="segments--list-item mr_2 mb_2 position_relative" v-for="(group, index) in allGroupFriends" :key="index">
      <contenteditable
          class="editable"
          tag="div"
          placeholder="..."
          :contenteditable="true"
          v-model="group.name"
        />
      <div class="position_absolute remove--group" @click="isDeleteItemBlock = true">
        <icon-base
          class="icon--remove"
          icon-name="plus"
          width="20"
          height="20"
          viewBox="0 0 26 26"
        >
        <icon-remove /> </icon-base>
      </div>
    </div>

    <div class="segments--list-item btn--add-segment mb_2" @click="isShowCreateGroup = true">
      <icon-base
        class="icon--add mr_2"
        icon-name="plus"
        width="14"
        height="14"
        viewBox="0 0 60 60"
      >
        <icon-plus /> </icon-base
      >{{ $t("chat.friends.view.new") }}
    </div>

    <!--*********** POPUP *************-->

    <transition name="popup">
      <delete-campaign-popup
          v-if="isDeleteItemBlock === true"
          :data-theme="currentTheme"
          title="Delete Time"
          @closePopup="isDeleteItemBlock = $event"
          storeActionName="deleteTime"
          typeName="TIME"
      ></delete-campaign-popup>
      <create-group
        v-if="isShowCreateGroup === true"
        :data-theme="currentTheme"
        @closePopup="isShowCreateGroup = $event"
      ></create-group>
    </transition>
  </div>
  <!-- End Segments List -->
</template>

<script>
import CreateGroup from "../../popup/creategroup";
import DeleteGroupPopup from "../../popup/delete-popup";
import DeleteCampaignPopup from "@/components/popups/delete";
let typingTimer;
export default {
  props: ["groupSelected"],
  data() {
    return {
      currentIndex: null,
      isShowDeletePopup: false,
      groupDeleted: {},
      isDeleteItemBlock: false,
      isShowCreateGroup: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    allGroupFriends() {
      return this.$store.getters.allGroupFriends;
    }
  },
  methods: {
    getGroupById(group_id, index) {
      this.currentIndex = index;
      this.$store.dispatch("getGroupByID", group_id);
      this.$store.dispatch("selectedUIDs", []);
      this.$emit("groupSelected", true);
    },
    showDeletePopup(group) {
      this.groupDeleted = group;
      this.isShowDeletePopup = true;
    },
    seeAllUsers() {
      this.$emit("groupSelected", false);
      this.currentIndex = null;
    },
    async upTypingText(type, group) {
      await clearTimeout(typingTimer);
      if (type === "groupfriend") {
        typingTimer = await setTimeout(this.updateGroupFriend(group), 1000);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    updateGroupFriend(group) {
      const objSender = {
        gr_id: group._id,
        name: group.name
      };
      this.$store.dispatch("updateGroup", objSender);
    }
  },
  async created() {
    await this.$store.dispatch("getAllGroupWhenCreate");
  },
  components: {
    CreateGroup,
    DeleteGroupPopup,
    DeleteCampaignPopup
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
