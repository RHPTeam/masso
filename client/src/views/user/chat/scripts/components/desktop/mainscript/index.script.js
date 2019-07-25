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
  props: ['selectedBlock', 'isCreateBlock'],
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
      currentBlock: {}
    };
  },
  methods: {
    // Close option in screen tablet
    // closeOptionTablet() {
    //   this.showOptionTablet = false;
    // },
    // // Add Text Value in block
    createItemBlock(type, blockId) {
      const dataSender = {
        value: '',
        type: type,
        id: blockId
      };
      this.$store.dispatch('createItemBlock', dataSender);
    },
    async upTypingText(type, item) {
      clearTimeout(typingTimer);
      if (type === 'nameblock') {
        typingTimer = setTimeout(this.updateNameBlock(item), 2000);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    //Update name block
    updateNameBlock() {
      this.$store.dispatch('updateBlock', this.selectedBlock);
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    block() {
      // console.log(this.$store.getters.block);
      return this.$store.getters.block;
    }
  },
  watch: {
    selectedBlock() {
      this.$store.dispatch('getInfoBlock', this.selectedBlock._id);
    },
    async isCreateBlock() {
      if (this.isCreateBlock === true) {
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
    this.$store.dispatch('getBlocks');
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
