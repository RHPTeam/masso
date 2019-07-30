import PopupPlugins from '../popup/add';
import AddTimer from '@/components/slider/index';
import Subcrible from './plugins/subcrible';
import UnSubcrible from './plugins/unsubcrible';
import AddTag from './plugins/tag';
import AddText from './plugins/text';
import AddImage from './plugins/images';
import DeletePopup from '@/components/popups/delete';

import BlockService from '@/services/modules/chat/block.service';

let typingTimer;

export default {
  props: ['selectedBlock', 'isCreateBlock', 'activeTab', 'currentSequence', 'selectedBlockSequence'],
  data() {
    return {
      textValue: '',
      showPopupPlugins: false,
      showAddAttribute: false,
      showOptionTablet: false,
      isDeletePopup: false,
      showSubcrible: false,
      showUnSubcrible: false,
      isDeleteBlock: false,
      storeAction: '',
      selectedData: {}
    };
  },
  methods: {
    // Close option in screen tablet
    // closeOptionTablet() {
    //   this.showOptionTablet = false;
    // },
    // // Add Text Value in block
    createItemBlock(type, item) {
      let dataSender = {};
      if (this.activeTab === 'script') {
        dataSender = {
          value: '',
          type: type,
          id: item._id
        };
      }
      if (this.activeTab === 'sequence') {
        dataSender = {
          value: '',
          type: type,
          id: item._id
        };
      }
      this.$store.dispatch('createItemBlock', dataSender);
    },
    async upTypingText(type, item) {
      clearTimeout(typingTimer);
      if (type === 'nameblock') {
        // typingTimer = setTimeout(this.updateNameBlock(item), 2000);
        if (this.activeTab === 'script') {
          typingTimer = setTimeout(this.updateNameBlock(item), 2000);
        }
        if (this.activeTab === 'sequence') {
          typingTimer = setTimeout(this.updateNameBlockSequence(item), 2000);
        }
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    //Update name block
    updateNameBlock(item) {
      this.$store.dispatch('updateBlock', item);
    },
    updateNameBlockSequence(item) {
      this.$store.dispatch('updateSequenceName', item);
    },
    onDeleteBlock() {
      this.isDeleteBlock = true;
      if (this.activeTab === 'script') {
        this.selectedData = this.selectedBlock;
        this.storeAction = 'deleteBlock';
        console.log('this.selectedBlock', this.selectedBlock);
      } else if (this.activeTab === 'sequence') {
        this.selectedData = {
          sqId: this.currentSequence._id,
          blockId: this.selectedBlockSequence._id
        };


        this.storeAction = 'deleteBlockInSequence';
      }
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    block() {
      return this.$store.getters.block;
    }
  },
  watch: {
    selectedBlock() {
      this.$store.dispatch('getInfoBlock', this.selectedBlock._id);
    },
    async isCreateBlock() {
      if (this.isCreateBlock === true) {
        console.log('isCreateBlock');
        await this.$store.dispatch('getInfoBlock', this.selectedBlock._id);
        this.$emit('isCreateBlock', false);
      }
    }
  },
  async created() {
    // const blocks = await BlockService.index();
    // const firstBlockId = blocks.data.data[0]._id;
    // this.$store.dispatch("getInfoBlock", firstBlockId);
    this.$store.dispatch('getInfoBlock', this.selectedBlock._id);
    // this.$store.dispatch('getBlocks');
  },
  components: {
    AddTimer,
    PopupPlugins,
    Subcrible,
    UnSubcrible,
    AddTag,
    AddText,
    AddImage,
    DeletePopup
  }
};
