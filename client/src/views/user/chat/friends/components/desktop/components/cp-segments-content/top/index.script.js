import DeleteFriendsPopup from "../../../popup/delete-popup";
import AddtoGroupPopup from "../../../popup/addto-group-popup";
import AppTooltip from "./tooltip";
let typingTimer;
export default {

  components: {
    DeleteFriendsPopup,
    AddtoGroupPopup,
    AppTooltip
  },
  props: ["groupSelected", "accountSelected", "sizeDefault"],
  data() {
    return {
      showUsers: false,
      showSequenceDropdown: false,
      isShowDeleteFrPopup: false,
      isShowAddtoGrPopup: false,
      statusNumberDisplayedDropdown: false,
      keySearch: "",
      currentPage: 1,
      isShowOptionsAttribute: false,
      showButtonDelete: false,
      currentSize: [
        {id: 1, size: 25},
        {id: 2, size: 50},
        {id: 3, size: 100},
      ]
    };
  },
  async created() {
    await this.$store.dispatch("getAccountsFB");
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    groupInfo() {
      return this.$store.getters.groupInfo;
    },
    accountFb() {
      return this.$store.getters.accountsFB;
    },
    users() {
      return this.$store.getters.allFriends;
    },
    selectedUIDs() {
      return this.$store.getters.selectedUIDs;
    },
    friendSelected() {
      return this.$store.getters.uidSelectDelete;
    }
  },
  methods: {
    showAttribute(){
      this.isShowOptionsAttribute = true;
    },
    closeShowAttribute(){
      this.isShowOptionsAttribute = false;
    },
    closeShowUsers(){
      this.showUsers = false;
    },
    closeSequenceDropdown() {
      this.showSequenceDropdown = false;
    },
    closeNumberDisplayedDropdown() {
      this.statusNumberDisplayedDropdown = false;
    },
    async changeCurrentSize(val){
      await this.$store.dispatch("getFriendFbChatBySize", {
        size:  val.size,
        page: this.currentPage
      });
      this.$emit("changeSizeDefault", val);
    },
    showDeleteFrPopup() {
      this.isShowDeleteFrPopup = true;
    },
    showAddtoGrPopup() {
      this.isShowAddtoGrPopup = true;
    },
    upTypingText(type, group) {
      clearTimeout(typingTimer);
      if (type === "groupfriend") {
        typingTimer = setTimeout(this.updateGroupFriend(group), 800);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    updateAccountSelected(id, name) {
      const objSender = {
        id: id,
        name: name
      };
      this.$emit("updateAccountSelected", objSender);
    },
    updateGroupFriend(group) {
      const objSender = {
        gr_id: group._id,
        name: group.name
      };
      this.$store.dispatch("updateGroup", objSender);
    },
    updateSearch() {
      this.$emit("updateSearch", this.keySearch);
    },
    async searchFriendFacebook(){
      if(this.keySearch.length !== 0) {
        const dataSender = {
          keyword: this.keySearch,
          size: this.sizeDefault,
          page: this.currentPage
        };
        await this.$store.dispatch("searchFriendFacebookChat", dataSender);
        this.$emit("changeStatusDefault", false);
      } else {
        const dataSender = {
          size: this.sizeDefault,
          page: this.currentPage
        };
        this.$store.dispatch("getFriendFbChatBySize", dataSender);
      }
    },
    updateFriendFacebookToSystem(){
      const dataSender = {
        size: this.sizeDefault,
        page: this.currentPage
      };
      this.$store.dispatch("updateFriendFacebookForSystem", dataSender);
    },
    showFilterFriendByAtribute(){
      this.$emit("openFilterFriend", true);
    },
    openPopupDeleteFriend(){
      this.isShowDeleteFrPopup = true;
    }
  }
};
