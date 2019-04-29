<template>
  <div class="color d_flex align_items_center">
    <div class="color--fixed d_flex align_items_center" @click="showOptionColor" v-if="isShowDefault === true">
      <icon-base
        icon-name="copy"
        width="20"
        height="20"
        viewBox="0 0 23 23"
      >
        <icon-grid />
      </icon-base>
    </div>
    <div class="color--box d_flex align_items_center" v-if="isShowOption === true">
      <div class="color--item back" @click="comeBackDefault">
        <icon-base
          class="ic--search"
          icon-name="copy"
          width="15"
          height="15"
          viewBox="0 0 28 28"
        >
          <icon-arrow-left />
        </icon-base>
      </div>
      <div class="color--item" @click="hiddeOptionColor"></div>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   isShowColor: {
  //     type: Boolean
  //   }
  // },
  data() {
    return {
      isShowDefault: true,
      isShowOption: false
    };
  },
  methods: {
    showOptionColor() {
      this.isShowDefault = false;
      this.isShowOption = true;
    },
    comeBackDefault() {
      this.isShowDefault = true;
      this.isShowOption = false;
    },
    hiddeOptionColor() {
      this.$emit( "turnOff", false );
      this.$emit( "openContentColor", true );
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../index.style";
  .back {
    background-color: #fafafa !important;
    cursor: pointer;
    svg {
      margin-bottom: -1px;
      margin-left: 1px;
    }
  }
</style>
