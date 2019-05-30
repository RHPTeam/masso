let typingTimer;
export default {
  data() {
    return {
      title: "AAAAAAAAA",
      isAddTypeDropdown: false,
      isActionItemDropdown: false,
      currentIndexActionItemDropdown: null,
      currentIndexGroupItemButton: null,
      showItemAction: false,
      showActionSequence: false,
      showOptionSequence: false,
      showCopyScripts: false,
      showOptionsScripts: false,
      showCopySequenceScripts: false,
      showAfterDay: false,
      showOptionsDay: false,
      currentSequenceIndex: ""
    };
  },
  computed: {
    // block() {
    //   return this.$store.getters.block;
    // },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    // groupBlock() {
    //   return this.$store.getters.groups;
    // },
    groupSequence() {
      console.log(this.$store.getters.allSequenceScript);
      return this.$store.getters.allSequenceScript;
    },
    // status() {
    //   return this.$store.getters.statusBlocks;
    // },
    // curConversation() {
    //   return this.$store.getters.curConversation;
    // }
  },
  async created() {
    // await this.$store.dispatch("getGroupBlock");
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
    },
    closeShowAfterDay(){
      this.showAfterDay = false;
      this.currentSequenceIndex = "";
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
    // showBlock(id) {
    //   this.$store.dispatch("getBlock", id);
    // },
    // showItemSqc(SqcId) {
    //   this.$store.dispatch("getItemSqc", SqcId);
    // },
    // createBlock(groupId) {
    //   this.$store.dispatch("createBlock", groupId);
    // },
    // createItemSqc(sequenceId) {
    //   this.$store.dispatch("createItemSequences", sequenceId);
    // },
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
    }
    
    // //Update nam sequence
    // updateNameSequence(value) {
    //   const objSender = {
    //     sq_id: value._id,
    //     name: value.name
    //   };
    //   this.$store.dispatch("updateSequence", objSender);
    // }
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
  }
};
