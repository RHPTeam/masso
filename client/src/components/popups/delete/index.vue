<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4">
        <div class="modal--header">
          <div class="title">{{ title }}</div>
        </div>
        <div class="modal--body my_3">
          <div class="desc" v-if="multiple === false">
            <span class="pr_1">{{ $t('chat.common.popup.delete.allData') }}</span>
            <span class="pr_1">{{ typeName }}</span>
            <span class="text--bold pr_1">{{ targetName }} </span>
            <span>{{ $t('chat.common.popup.delete.willDelete') }}</span>
            <span v-if="confirmDelete === true">
              <span class="pr_1">{{ $t('chat.common.popup.delete.continue') }}</span>
              <span class="text--delete">DELETE</span>
              <span class>{{ $t('chat.common.popup.delete.input') }}</span>
            </span>
          </div>
          <div class="desc" v-else>
            <span>{{ description }}</span>
            <span class="text--bold pr_1">{{ targetName }}.</span>
            <span v-if="confirmDelete === true">
              <span class="pr_1">{{ $t('chat.common.popup.delete.continue') }}</span>
              <span class="text--delete">DELETE</span>
              <span class>{{ $t('chat.common.popup.delete.input') }}</span>
            </span>
          </div>
          <div v-if="confirmDelete === true">
            <input
              class="modal--body-input mt_3"
              placeholder="DELETE"
              type="text"
              v-model="deleteText"
            />
          </div>
        </div>
        <div class="modal--footer d_flex justify_content_between align_items_center">
          <button
            class="btn--submit"
            @click="closePopup()"
          >{{ $t('chat.common.popup.delete.cancle') }}</button>
          <span v-if="confirmDelete === true">
            <button
              class="btn--skip"
              v-if="deleteConfirm"
              @click="deleteTargets()"
            >{{ $t('chat.common.popup.delete.delete') }}</button>
          </span>
          <button
            class="btn--skip"
            v-if="confirmDelete === false"
            @click="deleteTargets()"
          >{{ $t('chat.common.popup.delete.delete') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: ""
    },
    multiple: {
      type: Boolean,
      default: false
    },
    storeActionName: {
      type: String,
      default: ""
    },
    targetData: {
      default: ""
    },
    targetName: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    typeName: {
      type: String,
      default: ""
    },
    confirmDelete: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      deleteConfirm: false,
      deleteText: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  watch: {
    deleteText() {
      this.deleteConfirm = this.deleteText === "DELETE";
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    deleteTargets() {

      // if(StringFunction.convertUnicode(this.typeName.toString().toLowerCase()) === 'bai viet') {
      //   this.$store.dispatch(this.storeActionName, this.targetData.id);
      // }

      // if(StringFunction.convertUnicode(this.typeName.toString().toLowerCase()) === 'chien dich') {
      //   this.$store.dispatch(this.storeActionName, this.targetData.id);
      // }

      this.$store.dispatch( this.storeActionName, this.targetData );

      this.$emit("closePopup", false);
      this.$emit("isDeletedTarget", true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style";
@import "./index.style";
</style>

