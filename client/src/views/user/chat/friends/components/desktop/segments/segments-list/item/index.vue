<template>
  <div>
    <div class="segments--list-item mr_2 mb_2 position_relative">
      <div @click="getInfoGroupById(group._id)">
        <contenteditable
          class="editable"
          tag="div"
          placeholder="..."
          :contenteditable="true"
          v-model="group.name"
          @keyup="upTypingText('groupfriend', group)"
          @keydown="clear"
        />
      </div>
      <div class="position_absolute remove--group" @click="showDeletePopup()">
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

    <transition name="popup">
      <delete-campaign-popup
        v-if="isDeleteItemBlock === true"
        :data-theme="currentTheme"
        title="Delete Time"
        @closePopup="isDeleteItemBlock = $event"
        storeActionName="deleteGroupFriend"
        :targetData="group"
        :typeName="group"
      ></delete-campaign-popup>
    </transition>
  </div>
</template>

<script>
import DeleteCampaignPopup from "@/components/popups/delete";

let typingTimer;
export default {
  components: {
    DeleteCampaignPopup
  },
  props: {
    group: Object
  },
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
  async created() {
    await this.$store.dispatch("getAllGroupFriend");
  },
  methods: {
    getInfoGroupById(val) {
      // this.currentIndex = index;
      this.$store.dispatch("getGroupFriendById", val);
      this.$store.dispatch("selectedUIDs", []);
      this.$emit("groupSelected", true);
    },
    showDeletePopup() {
      this.isDeleteItemBlock = true;
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
    // update
    updateGroupFriend(group) {
      const objSender = {
        _id: group._id,
        name: group.name
      };
      this.$store.dispatch("updateGroupFriend", objSender);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../index.style";
</style>
