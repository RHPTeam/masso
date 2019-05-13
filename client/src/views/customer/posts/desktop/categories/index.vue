<template>
  <div class="category--wrap">
    <div class="ct_f">
      <div class="r">
        <div class="c_12 c_lg_12 c_xl_4 mb_0 mb_md_5">
          <!-- Start: Category Form -->
          <app-form 
            :isUpdateCategories="isUpdateCategories" 
          />
          <!-- End: Category Form -->
        </div>
        <div class="c_12 c_lg_12 c_xl_8">
          <!-- Start: Action -->
          <app-action />
          <!-- End: Action -->
          <!-- Start: Data List -->
          <app-list 
            @changeUpdate="isUpdateCategories = $event" 
          />
          <!-- End: Data List -->
          <!-- Start: Info -->
          <!-- <app-info /> -->
          <!-- Start: Info -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppAction from "../layouts/categoriesaction";
import AppForm from "./form";
import AppList from "./list";

export default {
  components: {
    AppAction,
    AppForm,
    AppList
  },
  data() {
    return {
      isUpdateCategories: false
    };
  },
  async created() {
    await this.$store.dispatch( "getAllCategories" );
  },
};
</script>

<style lang="scss" scoped></style>
