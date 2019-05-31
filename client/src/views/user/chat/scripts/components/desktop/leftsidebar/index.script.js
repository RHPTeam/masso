let typingTimer;

import AfterDay from "../popup/time";
import OptionsSequence from "../popup/optionssequence";
import OptionGroup from "../popup/optiongroup";
import OptionGroupBlock from "../popup/optiongroupblock";

export default {
  props: ["clickShowAfterDay", "closeAfterDay"],
  data() {
    return {
      title: "AA",
      isAddTypeDropdown: false,
      // isActionItemDropdown: false,
      // currentIndexActionItemDropdown: null,
      // currentIndexGroupItemButton: null,
      // showItemAction: false,
      // showActionSequence: false,
      // showOptionSequence: false,
      showCopyScripts: false,
      showOptionsScripts: false,
      showCopySequenceScripts: false,
      showAfterDay: false,
      showOptionsDay: false,
      currentSequenceIndex: "",
      currentAfterDayIndex: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    groupSequence() {
      return this.$store.getters.allSequenceScript;
    },
    groupBlock(){
      return this.$store.getters.allGroupBlock;
    }
  },
  async created() {
    await this.$store.dispatch("getAllGroupBlockScripts");
    await this.$store.dispatch("getAllSequenceScript");
  },
  methods: {
    closeShowCopyScripts(){
      this.showCopyScripts = false;
    },
    closeShowOptionsScripts(){
      this.showOptionsScripts = false;
    },
    closeCopySequenceScripts(){
      this.showCopySequenceScripts = false;
      this.currentSequenceIndex = "";
    },
    closeShowAfterDay(){
      this.showAfterDay = false;
      this.currentAfterDayIndex = "";
    },
    closeShowOptionsDay(){
      this.showOptionsDay = false;
    },
    closeAddTypeDropdown() {
      this.isAddTypeDropdown = false;
    },
    openSequenceDropdown( id ){
      this.showCopySequenceScripts = true;
      this.currentSequenceIndex = id;
    },
    openShowAfterDay( ){
      this.showAfterDay = true;
    },
    createSequence() {
      this.$store.dispatch("createSequenceScript");
    },
    deleteASequence( id ){
      this.showCopySequenceScripts = false;
      this.$store.dispatch("deleteASequence", id);
    },
    async upTypingText(type, group) {
      await clearTimeout(typingTimer);
      if (type === "groupfriend") {
        typingTimer = await setTimeout(this.updateGroupFriend(group), 1000);
      }
      if (type === "groupblock") {
        typingTimer = await setTimeout(this.updateGroupBlock(group), 1000);
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
      this.$store.dispatch("updateSequence", objSender);
    },

    // create new block in a sequence
    createNewBlockInSequence( id ) {
      this.$store.dispatch("createBlockInSequence", id);
    },

    // get all block in a sequence
    getAllBlockInSequence( id ) {
      this.$store.dispatch("getAllBlockInSequence", id);
    },


    // ************ Group Block
    createGroupBlock(){
      this.$store.dispatch("createGroupBlock");
    },


    // update a block group
    updateGroupBlock(groupBlock){
      const dataSender = {
        _id: groupBlock._id,
        name: groupBlock.name
      };
      this.$store.dispatch("updateGroupBlock", dataSender)
    },
    // create a block in group 
    createBlockInAGroup( idGroup ){
      this.$store.dispatch("createBlockInGroup", idGroup);
    },

    // // get all block in group block
    getAllBlockInGroupById( idGroup ){
      console.log("idGroup");
      console.log(idGroup);
      this.$store.dispatch("getAllBlockInAGroupById", idGroup);
    }
  },
  sockets: {
    // async receiveMessage(value) {
    //   let _ = this;
    //   if (
    //     this.curConversation._sender === undefined ||
    //     this.curConversation._receiver === undefined
    //   ) {
    //     if (localStorage.getItem("rid")) {
    //       await this.$store.dispatch(
    //         "getAllConversationsByAcc",
    //         localStorage.getItem("rid")
    //       );
    //     }
    //   } else if (
    //     value.message._sender._id === this.curConversation._sender._id &&
    //     value.message._receiver._id === this.curConversation._receiver._id
    //   ) {
    //     // Listen receive messages of current conversation
    //     this.$store.dispatch("updateMessage", value.message);
    //     // Play audio when client listen new message
    //     _.$refs.audioTone.play();
    //   }
    // }
  },
  components: {
    AfterDay,
    OptionsSequence,
    OptionGroup,
    OptionGroupBlock
  }
};
