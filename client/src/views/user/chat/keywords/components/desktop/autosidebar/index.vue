<template>
  <div class="auto--sidebar-wrap p_4">
    <!-- <auto-header /> -->
    <auto-search :search.sync="search" @update="search = $event"/>
    <loading-component v-if="this.$store.getters.statusSyntaxList === 'loading'"/>
    <div v-else class="auto--list r d_flex align_items_center">
      <VuePerfectScrollbar class="scroll-area r m_0">
        <div
          class="c_md_12 c_lg_12 c_xl_6 text_center mb_2 px_2"
          v-for="(syntax, index) in filteredSyntaxList"
          :key="index"
        >
          <div class="auto--list-item" @click="showSyntax(syntax._id)">{{ syntax.title }}</div>
        </div>
        <div class="c_md_12 c_xl_6 text_center mb_2 px_2">
          <div class="auto--list-item auto--list-plus" @click.prevent="createSyntax">
            <icon-base
              class="icon--add"
              icon-name="plus"
              width="16"
              height="16"
              viewBox="0 0 60 60"
            >
              <icon-plus/>
            </icon-base>
          </div>
        </div>
      </VuePerfectScrollbar>
    </div>
  </div>
</template>
<script>
import AutoHeader from "./header";
import AutoSearch from "./search";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    AutoHeader,
    AutoSearch,
    VuePerfectScrollbar
  },
  data() {
    return {
      search: ""
    };
  },
  computed: {
    syntaxList() {
      return this.$store.getters.syntaxList;
    },
    filteredSyntaxList() {
      return this.syntaxList.filter(syntax => {
        return syntax.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  async created() {
    await this.$store.dispatch("getSyntaxList");
  },
  methods: {
    createSyntax() {
      this.$store.dispatch("createSyntax");
    },
    showSyntax(syntaxId) {
      this.$store.dispatch("getSyntax", syntaxId);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../index.style";
.auto--sidebar-wrap {
  .scroll-area {
    padding: 0 10px;
    max-height: 570px !important;
    width: 100%;
    height: auto!important;
  }
}
</style>
