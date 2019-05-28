<template>
  <div class="result px_2" v-click-outside="changeStatusDefault">
    <h3>người liên hệ</h3>
    <div class="list d_flex align_items_center mb_2" @click="changeStatusDefault">
      <div class="list--item-avt mr_3" :style="{backgroundImage:'url('+srcDefault+')'}"></div>
      <div class="list--item-name">Liu Kang</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      srcDefault: "https://i.pinimg.com/originals/64/6f/06/646f064bff54f4fa2132e23a505d8aa9.jpg"
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
  h3 {
    font-size: 16px;
    text-transform: uppercase;
  }
  .list {
    cursor: pointer;
    &--item-avt {
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
    &--item-name {
      font-size: 15px;
    }
  }
}
</style>
