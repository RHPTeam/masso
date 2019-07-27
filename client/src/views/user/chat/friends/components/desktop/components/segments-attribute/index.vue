<template>
  <div class="segments--attribute position_relative py_4 mt_3" :data-theme="currentTheme">
    <div class="segments--attribute-item">
      <div class="attribute--form mr_2 pl_3">
        <app-filter
          @showResultsFilter="showResultsFilter($event)"
        />
      </div>

      <div class="attribute--remove">
        <icon-base
          class="icon--add mr_1"
          icon-name="remove"
          width="20"
          height="20"
          viewBox="0 0 15 15"
        >
          <icon-remove />
        </icon-base>
      </div>
    </div>

    <div
      class="icon--close d_flex align_items_center justify_content_center position_absolute"
      @click="closeFilterFriend"
    >
      <icon-base
        icon-name="Đóng"
        width="13"
        height="13"
        viewBox="0 0 18 18"
      >
        <icon-close />
      </icon-base>
    </div>

  </div>
</template>

<script>
import AppFilter from "@/components/shared/filter";

export default {
  components: {
    AppFilter
  },
  data() {
    return {
      selectFilter: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async showResultsFilter(event){
      await this.$emit("openResultsFilter", event);
      this.$emit("hiddenDefault", false);
    },
    closeFilterFriend(){
      this.$emit("closeFilter", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
