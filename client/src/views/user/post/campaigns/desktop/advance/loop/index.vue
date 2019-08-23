<template>
  <div class="loop">
    <loop-header
      @openPopup="isShowCreateNewLoop = $event"
    >
    </loop-header>
    <loop-list
      @getInfoCampaign="isShowCreateNewLoop = $event"
    >
    </loop-list>

    <transition name="popup">
      <create-new-loop
        v-if="isShowCreateNewLoop === true"
        :currentTheme="currentTheme"
        @close="isShowCreateNewLoop = $event"
      >
      </create-new-loop>
    </transition>
  </div>
</template>

<script>
import LoopHeader from "./components/header";
import LoopList from "./components/table";
import CreateNewLoop from "./components/popup";
export default {
  components: {
    CreateNewLoop,
    LoopHeader,
    LoopList
  },
  data() {
    return {
      isShowCreateNewLoop: false
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
