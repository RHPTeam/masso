<template>
  <div class="main">
    <div class="success--icon">
      <icon-base icon-name="check-circle" width="250" height="250" viewBox="0 0 20 20">
        <!-- Icon component below doesnt work 🙄 -->
        <!-- <icon-check-circle /> -->
        <g fill="#ffb94a">
          <path
            d="M10,0A10,10,0,1,0,20,10,10,10,0,0,0,10,0ZM8.166,15.137l-4.4-4.4L5.23,9.266,8.166,12.2l6.6-6.6,1.468,1.468Z"
          ></path>
        </g>
      </icon-base>
    </div>

    <div class="success--message">Thiết lập đăng bài thành công!</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$emit("can-continue", { value: true });
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 27rem;
  overflow-y: scroll;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.success {
  &--icon {
  }
  &--message {
    text-align: center;
    padding: 1.5rem 0;
    font-size: 2rem;
    color: #ffb94a;
    text-transform: uppercase;
  }
}
</style>
