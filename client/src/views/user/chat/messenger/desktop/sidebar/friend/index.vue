<template>
  <div class="result" v-click-outside="changeStatusDefault">
    <div class="title px_3 mb_2">Người liên hệ</div>
    <div class="list--item d_flex align_items_center"
         :class="[ item.name === 'Ngọc Hân' ? 'item--active' : null ]"
         v-for="(item, index) in friends"
         :key="index"
         @click="changeStatusDefault"
    >
      <div class="list--item-avt mr_2"
           :style="{ backgroundImage: 'url(' + item.profilePicture + ')' }"
      ></div>
      <div class="list--item-name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      friends: [
        { name: "Lê Khang", profilePicture: "https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" },
        { name: "Ngọc Hân", profilePicture: "https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" },
        { name: "Lê Khang", profilePicture: "https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" },
        { name: "Đặng Yến", profilePicture: "https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" },
        { name: "Lê Khang", profilePicture: "https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" },
        { name: "Đặng Yến", profilePicture: "https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" },
        { name: "Lê Khang", profilePicture: "https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" },
        { name: "Đặng Yến", profilePicture: "https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" },
      ]
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
</style>
