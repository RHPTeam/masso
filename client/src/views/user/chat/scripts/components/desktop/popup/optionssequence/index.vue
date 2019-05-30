<template>
  <div>
    <div class="position_absolute icon-more" @click="showOptionsSequence" v-if="hover === true">
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
        <li @click="closeOptionsSequence">Sao chép</li>
        <li @click="closeOptionsSequence">Di chuyển</li>
        <li @click="closeOptionsSequence">Xóa</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    item: Object,
    hover: false
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
  top: 15px;
  right: 1px;
  z-index: 1;
  // display: none;
  &[hover="true"]{
    display: block;
    .icon--more{
      color: #fff;
    }
  }
}
.infor {
  cursor: pointer;
  top: 40px;
  right: -90px;
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
}
</style>