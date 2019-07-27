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
  data() {
    return {

    };
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


// ******************** CHANGE THEME



// DARK
.keyword--wrapper[data-theme="dark"]{
  background: #27292d;
  .vue-input-tag-wrapper{
    border: 1px solid #ccc;
    background: #27292d;
    &.new-tag{
      color: #fff!important;
    }
  }
}


// LIGHT
.keyword--wrapper[data-theme="light"]{
  background: #f0f0f0;
}
</style>
