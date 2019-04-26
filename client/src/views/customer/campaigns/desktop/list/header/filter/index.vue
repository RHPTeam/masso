<template>
  <button
    class="btn btn--filter"
    @click="showFilterDropdown = !showFilterDropdown"
    v-click-outside="closeFilterDropdown"
  >
    {{ filterSelected.name }}
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
    <div class="dropdown text_left" v-show="showFilterDropdown">
      <div
        class="dropdown--item"
        v-for="(item, index) in filterList"
        :key="`a-${index}`"
        @click="updateFilterSelected(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- End: Filter dropdown -->
  </button>
</template>

<script>
export default {
  props: [ "filterList", "filterSelected" ],
  data() {
    return {
      showFilterDropdown: false
    };
  },
  methods: {
    closeFilterDropdown() {
      this.showFilterDropdown = false;
    },
    updateFilterSelected( data ) {
      this.$emit( "updateFilterSelected", data );
    }
  }
};
</script>

<style lang="scss" scoped>
.btn--filter {
  background-color: #fff;
  border-radius: 0.5rem;
  font-size: inherit;
  position: relative;
  &:active,
  &:focus {
    box-shadow: none;
    outline: 0;
  }
  .dropdown {
    border: 0;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: #444;
    padding: 0.375rem 0;
    position: absolute;
    top: calc(100% + 3px);
    right: 0;
    min-width: 13rem;
    width: auto;
    z-index: 999;
    &--item {
      padding: 0.375rem 0.75rem;
      &:hover {
        background-color: #ffb94a;
        color: #fff;
      }
    }
  }
  svg {
    color: #ccc;
    stroke-width: 5;
    vertical-align: bottom;
  }
}
</style>
