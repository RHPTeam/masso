<template>
  <div class="keyword--wrapper p_3" :data-theme="currentTheme">
    <div class="wrapper--top mb_3">
      <div class="title mb_1">{{ $t('chat.common.keyProduct.title') }}</div>
      <div class="desc">
        {{ $t('chat.common.keyProduct.desc') }}
      </div>
    </div>
    <div class="wrapper--content">
      <taggle class="taggle" v-model="user.keywords" @input="updateKey" :placeholder="$t('chat.common.keyProduct.placeholder')" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    updateKey( val ){
      this.user.keywords = val;
      this.$store.dispatch( "updateUser", this.user );
    }
  }
};
</script>

<style lang="scss" scoped>
.keyword--wrapper {
  background-color: #fff;
  border-radius: 0.625rem;
  .wrapper--top {
    .desc {
      color: #999;
      font-size: 0.8rem;
    }
    .title {
      font-size: 0.875rem;
      font-weight: 600;
    }
  }
  .wrapper--content {
    .taggle {
      border-radius: calc( .5rem + 2px );
    }
  }
}

// CHANEG THEME

// dark
.keyword--wrapper[data-theme="dark"] {
  background: #282b2d;
  .wrapper--content {
    .taggle {
      background: #282a2d;
      color: #ccc;
      border: 1px solid #484848;
      transition: 0.4s;
      &:hover {
        border-color: #999;
      }
    }
  }
}
</style>
