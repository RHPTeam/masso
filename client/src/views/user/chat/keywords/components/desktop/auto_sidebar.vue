<template>
  <div class="auto--sidebar-wrap p_4">
    <auto-header />
    <auto-search />
    <loading-component
    />
    <div class="auto--list r d_flex align_items_center">
      <div
        class="c_md_6 c_xl_6 text_center mb_2"
      >
        <div class="auto--list-item">
          syntax.title
        </div>
      </div>
      <div class="c_md_6 c_xl_6 text_center mb_2">
        <div class="syntax">Syntax 0</div>
      </div>
      <div class="c_md_6 c_xl_6 text_center mb_2">
        <div
          class="auto--list-item auto--list-plus"
        >
          <icon-base
            class="icon--add"
            icon-name="plus"
            width="16"
            height="16"
            viewBox="0 0 60 60"
          >
            <icon-plus />
          </icon-base>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AutoHeader from "./autosidebar/header";
import AutoSearch from "./autosidebar/search";
export default {
  data() {
    return {
      search: ""
    };
  },
  computed: {
    syntaxList() {
      // return this.$store.getters.syntaxList;
    },
    filteredSyntaxList() {
      // return this.syntaxList.filter(syntax => {
      //   return syntax.title.toLowerCase().includes(this.search.toLowerCase());
      // });
    }
  },
  methods: {
    // createSyntax() {
    //   this.$store.dispatch("createSyntax");
    // },
    // showSyntax(syntaxId) {
    //   this.$store.dispatch("getSyntax", syntaxId);
    // }
  },
  components: {
    AutoHeader,
    AutoSearch
  },
  async created() {
    // await this.$store.dispatch("getSyntaxList");
  }
};
</script>
<style lang="scss" scoped>
@import "../../index.style";
</style>
