<template>
  <div class="result" v-click-outside="changeStatusDefault" :data-theme="currentTheme">
    <div class="title px_3 mb_2">Người liên hệ</div>
    <div class="list--item d_flex align_items_center"
         :class="[ item.fullName === 'Mi Lan' ? 'item--active' : null ]"
         v-for="(item, index) in friendsFb"
         :key="index"
         @click="changeStatusDefault"
    >
      <div class="list--item-avt mr_2"
           :style="{ backgroundImage: 'url(' + item.profilePicture + ')' }"
      ></div>
      <div class="list--item-name">{{ item.fullName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["keySearch", "currentTheme"],
  data() {
    return {

    }
  },
  computed: {
    friendsFb(){
      return this.$store.getters.friends;
    },
    resultSearchFriend(){
      return this.friendsFb.filter(item => {
        return item.fullName.toString().toLowerCase().includes(this.keySearch.toString().toLowerCase());
      });
    }
  },
  methods: {
    changeStatusDefault() {
      this.$emit("backDefault", true);
    }
  },
}
</script>

<style lang="scss" scoped>
.result {
  .title {
    color: #999;
    font-size: .875rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  .list--item {
    cursor: pointer;
    padding: .375rem 1rem;
    &.item--active {
      background-color: #F7F7F7;
    }
    &:hover {
      background-color: #F7F7F7;
    }
    &-avt {
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 50%;
      width: 32px;
      height: 32px;
    }
    &-name {
      font-size: .875rem;
    }
  }
}
  .result[data-theme="dark"] {
    background-color: #2F3136;
    color: #fff;
    .title {
      color: #fff;
    }
    .list--item {
      &:hover {
        background-color: #27292d;
      }
      &.item--active {
        background-color: #27292d;
      }
    }
  }
</style>
