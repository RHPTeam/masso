<template>
  <div :data-theme="currentTheme">
    <div @click="showCopyScripts">
      <icon-base
        class="icon--more"
        icon-name="IconMore"
        width="23"
        height="23"
        viewBox="0 0 750 750"
      >
        <icon-more/>
      </icon-base>
    </div>
    <div
      class="click--icon dropdown--menu dropdown--menu-content dropdown--menu-left flipInY animated type"
      v-if="isShowCopyScripts === true"
      v-click-outside="closeShowCopyScripts"
    >
      <div class="px_3 pt_3 pb_2 dropdown--menu-item mb_2" @click="closeShowCopyScripts">
        <div class="copy">{{ $t("chat.scripts.sidebar.name.copy.title") }}</div>
        <div>{{ $t("chat.scripts.sidebar.name.copy.desc") }}</div>
      </div>
      <div
        class="dropdown--menu-item mb_2 pl_3"
        @click="deleteGroupBlock(groupId)"
      >{{ $t("chat.scripts.sidebar.name.copy.delete") }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groupId: String
  },
  data() {
    return {
      isShowCopyScripts: false
    };
  },
  computed: {    
    currentTheme() {
      return this.$store.getters.themeName;
    },
  },
  methods: {
    showCopyScripts() {
      this.isShowCopyScripts = true;
    },
    closeShowCopyScripts() {
      this.isShowCopyScripts = false;
    },
    deleteGroupBlock( idGroup ){
      this.isShowCopyScripts = false;
      this.$store.dispatch("deleteGroupBlock", idGroup);
    }
  },
};
</script>

<style lang="scss" scoped>
div[data-theme="dark"]{
  .icon--more{
    
  }
}
.icon--more {
  margin-top: 13px;
  cursor: pointer;
  color: #ccc;
}
.click--icon {
  cursor: pointer;
  width: 250px;
  position: absolute;
  top: 37px;
  right: -225px;
  border-radius: 5px;
  background: #fff;
  color: #333;
  box-shadow: 0 0 0px 1px rgba(16, 16, 16, 0.08);
  z-index: 2;
  .dropdown--menu-item:nth-child(1) {
    border-bottom: 1px dotted rgba(16, 16, 16, 0.08);
    cursor: not-allowed;
    font-size: 13px;
    font-weight: 400;
    transition: 0.3s;
    .copy {
      font-weight: bold;
      font-size: 15px;
      margin-bottom: 5px;
    }
    &:hover {
      background: #ffb94a;
      color: #fff;
    }
  }
  .dropdown--menu-item:last-child {
    color: #f43c3c;
    font-weight: bold;
    font-size: 15px;
  }
}
</style>