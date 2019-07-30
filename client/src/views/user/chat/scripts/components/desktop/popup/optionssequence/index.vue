<template>
  <div>
    <div class="icon-more float_right" @click="showOptionsSequence">
      <icon-base
        class="icon--more"
        icon-name="IconMore"
        width="22"
        height="22"
        viewBox="0 0 760 760"
      >
        <icon-more />
      </icon-base>
    </div>
    <div
      class="infor position_absolute"
      v-if="isOptionsSequence === true"
      v-click-outside="closeOptionsSequence"
    >
      <ul>
        <li @click="closeOptionsSequence" class="disable">
          <div class="pb_1 copy">Sao chép</div>
          <div
            class="desc--copy"
          >Các bản cập nhật trong tương lai cho nhóm ban đầu sẽ không được sao chép sang các phiên bản được sao chép</div>
        </li>
        <li @click="isDeletedTarget = true;" class="delete">Xóa</li>
        <!-- <li @click="deleteBlockInSequence( sequenceId, item._id )" class="delete">Xóa</li> -->
      </ul>
    </div>
    <transition name="popup">
      <delete-popup
        v-if="isDeletedTarget === true"
        :data-theme="currentTheme"
        title="Delete Scripts"
        @closePopup="isDeletedTarget = $event"
        @isDeletedTarget="$emit('isDeletedTarget', $event)"
        storeActionName="deleteBlockInSequence"
        :targetData="selectedSequenceBlock"
        typeName="Scripts"
      ></delete-popup>
    </transition>
  </div>
</template>

<script>
import DeletePopup from "@/components/popups/delete";

export default {
  // props: {
  //   sequenceId: String,
  //   item: Object
  // },
  props: ["selectedBlock", "sequence"],
  components: {
    DeletePopup
  },
  data() {
    return {
      isOptionsSequence: false,
      isDeletedTarget: false,
      selectedSequenceBlock: {
        sqId: this.sequence._id,
        blockId: this.selectedBlock._id
      }
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    showOptionsSequence() {
      this.isOptionsSequence = true;
    },
    closeOptionsSequence() {
      this.isOptionsSequence = false;
    },
    // deleteBlockInSequence(sqId, blockId) {
    //   const dataSender = {
    //     sqId: sqId,
    //     blockId: blockId
    //   };
    //   this.$store.dispatch("deleteBlockInSequence", dataSender);
    // }
  }
};
</script>

<style lang="scss" scoped>
.icon-more:hover {
  cursor: pointer;
}
.infor {
  cursor: pointer;
  top: 29px;
  right: 0;
  z-index: 11;
  width: 250px;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 0px 1px rgba(16, 16, 16, 0.08);
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    border-bottom: 1px dotted rgba(16, 16, 16, 0.08);
    text-align: left;
    background: #fff;
    color: #333;
    padding: 0.75rem;
    transition: 0.3s;
  }
  li:last-child {
    color: #f43c3c;
    border-bottom: 0;
  }
  & li:hover {
    background: #ffb94a;
    color: #fff;
  }
  .disable {
    cursor: not-allowed;
    .copy {
      font-weight: bold;
    }
    .desc--copy {
      font-size: 0.8125rem;
    }
  }
  .delete {
    font-weight: bold;
  }
}
</style>
