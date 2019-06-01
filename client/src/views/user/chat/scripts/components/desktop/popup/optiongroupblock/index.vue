<template>
  <div class>
    <div class="icon-more" @click="showOptionsSequence">
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
        <li @click="closeOptionsSequence" class="disable">
          <div class="pb_1 copy">Sao chép</div>
          <div
            class="desc--copy"
          >Các bản cập nhật trong tương lai cho nhóm ban đầu sẽ không được sao chép sang các phiên bản được sao chép</div>
        </li>
        <li class="delete">Xóa</li>
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
  float: right;
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
  top: 30px;
  right: -97px;
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