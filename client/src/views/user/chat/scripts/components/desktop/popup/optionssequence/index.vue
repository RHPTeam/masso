<template>
  <div>
    <div class="position_absolute icon-more" @click="showOptionsSequence">
      <icon-base
        class="icon--more"
        icon-name="IconMore"
        width="22"
        height="22"
        viewBox="0 0 760 760"
      >
        <icon-more/>
      </icon-base>
    </div>
    <div
      class="infor position_absolute"
      v-if="isOptionsSequence === true"
      v-click-outside="closeOptionsSequence"
    >
      <ul>
        <li @click="closeOptionsSequence" class="disable">Sao chép</li>
        <li @click="closeOptionsSequence" class="disable">Di chuyển</li>
        <li @click="deleteBlockInSequence( sequenceId, item._id )">Xóa</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sequenceId: String,
    item: Object
  },
  data() {
    return {
      isOptionsSequence: false
    };
  },
  methods: {
    showOptionsSequence() {
      this.isOptionsSequence = true;
    },
    closeOptionsSequence() {
      this.isOptionsSequence = false;
    },
    deleteBlockInSequence( sqId, blockId ){
      const dataSender = {
        sqId: sqId,
        blockId: blockId
      };
      this.$store.dispatch("deleteBlockInSequence", dataSender);
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-more:hover{
  cursor: pointer;
}
.infor {
  cursor: pointer;
  top: 40px;
  right: -90px;
  width: 108px;
  z-index: 11;
  border: 1px solid #48484852;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    border-bottom: 1px dotted #333;
    text-align: left;
    background: #fff;
    color: #333;
    padding: 0.75rem 1.25rem;
  }
  li:last-child {
    color: #f43c3c;
    border-bottom: 0;
  }
  & li:hover {
    background: #ffb94a;
    color: #fff;
  }
  .disable{
    cursor: not-allowed;
  }
}
</style>