<template>
  <div class="">
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
        <li>Xóa</li>
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
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-more {
  right: 1px;
  z-index: 1;
  // display: none;
  &[hover="true"] {
    display: block;
    .icon--more {
      color: #fff;
    }
  }
}
.infor {
  cursor: pointer;
  top: 23px;
  right: -81px;
  z-index: 11;
  width: 108px;
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