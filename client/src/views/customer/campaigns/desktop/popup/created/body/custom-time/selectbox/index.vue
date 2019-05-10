<template>
  <div
    class="btn btn--custom"
    @click="showDropdown = !showDropdown"
    :data-theme="currentTheme"
  >
    {{ selected.name }}
    <icon-base
      class="ml_1"
      icon-name="icon-sort-down"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <icon-sort-down />
    </icon-base>
    <!-- Start: Filter dropdown -->
    <div class="dropdown text_left" v-show="showDropdown">
      <div
        class="dropdown--item"
        v-for="(item, index) in options"
        :key="`a-${index}`"
        @click="updateSelected(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- End: Filter dropdown -->
  </div>
</template>

<script>
export default {
  props: [ "options", "selected" ],
  data() {
    return {
      showDropdown: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    updateSelected( data ) {
      this.$emit( "updateSelected", data );
    }
  }
};
</script>

<style lang="scss" scoped>
  .btn--custom {
    border-radius: 0.5rem;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    padding: 0 .75rem;
    position: relative;
    &:active,
    &:focus {
      box-shadow: none;
      outline: 0;
    }
    .dropdown {
      border: 0;
      border-radius: 0.5rem;
      padding: 0.375rem 0;
      position: absolute;
      top: calc(100% + 3px);
      right: 0;
      min-width: 13rem;
      width: auto;
      z-index: 999;
      &--item {
        padding: 0 .75rem;
      }
    }
    svg {
      stroke-width: 5;
      vertical-align: middle;
      vertical-align: -webkit-baseline-middle;
    }
  }
  /*  Theme color */
  .btn--custom[data-theme="light"] {
    background-color: #fff;
    .dropdown {
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      color: #444;
      &--item {
        &:hover {
          background-color: #ffb94a;
          color: #fff;
        }
      }
    }
    svg {
      color: #ccc;
    }
  }
  .btn--custom[data-theme="dark"] {
    background-color: #27292d;
    color: #f7f7f7;
    .dropdown {
      background-color: #27292d;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
      color: #f7f7f7;
      &--item {
        &:hover {
          background-color: #ffb94a;
          color: #fff;
        }
      }
    }
    svg {
      color: #999;
    }
  }
</style>
