<template>
  <div @click="showWizard()" class="float-button">
    <div class="button-holder">
      <icon-base class="icon-plus" icon-name="Add" width="24" height="24" viewBox="0 0 68 68">
        <icon-plus />
      </icon-base>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showWizard() {
      this.$store.dispatch("toggleWizard", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.float-button {
  position: fixed;
  bottom: 3rem;
  right: 5rem;
  z-index: 99;
  border: none;
  outline: none;
  background-color: #ffb339;
  color: white;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  box-shadow: 1px 1px 6px #888;
  transition: all 0.2s;
  &:hover {
    box-shadow: 1px 1px 12px #888;
  }
}

.button-holder {
  position: relative;
}
.icon-plus {
  position: absolute;
  top: 13px;
  right: 10px;
}
</style>
