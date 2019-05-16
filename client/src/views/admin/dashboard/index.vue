<template>
  <div class="main text_left px_4 py_4" :data-theme="currentTheme">
    <div class="main--title mb_4">Bảng điều khiển</div>
    <div class="main--content card card_body p_4"></div>
  </div>
</template>
<script>

export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  .main--title {
    font-size: 1.125rem;
    font-weight: bold;
  }
  .main--content {
    border: 0;
    border-radius: .5rem;
  }
}

/* Theme Color */
.main[data-theme="light"] {
  .main--title {
    color: #666;
  }
  .main--content {
    background-color: #fff;
  }
}

.main[data-theme="dark"] {
  .main--title {
    color: #ccc;
  }
  .main--content {
    background-color: #27292D;
  }
}
</style>
