<template>
  <!-- Segments List-->
  <div class="segments--list d_flex align_items_center" :data-theme="currentTheme">
    <div
      class="btn--seeall mr_3 mb_2"
      :class="[groupSelected === false ? 'btn--seall-active' : '']"
      @click="seeAllUsers"
    >
      {{ $t("chat.friends.view.all") }}
    </div>

    <item-group
      v-for="(group, index) in allGroupFriends"
      :key="index"
      :group="group"
      @groupSelected="changeGroupSelected($event)"
    />

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
import ItemGroup from "./item";
let typingTimer;
export default {
  components: {
    CreateGroup,
    ItemGroup,
  },
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
  async created() {
    await this.$store.dispatch("getAllGroupFriend");
  },
  methods: {
    changeGroupSelected(val){
      this.$emit("changeSelectedGroup", val);
    },
    getGroupById(id_group) {
      // this.currentIndex = index;
      this.$store.dispatch("getGroupFriendById", id_group);
      this.$store.dispatch("selectedUIDs", []);
      this.$emit("groupSelected", true);
    },
    showDeletePopup(group) {
      console.log(group);
      this.groupDeleted = group;
      this.isDeleteItemBlock = true;
    },
    seeAllUsers() {
      this.$emit("groupSelected", false);

      this.$router.replace({name: "chat_friends"});
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
@import "./index.style";
</style>
