<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4">
        <div class="modal--header">
          <div class="title">{{ title }}</div>
        </div>
        <div class="modal--body my_3">
          <div class="desc" v-if="multiple === false">
            <span class="pr_1"> {{ $t('chat.common.popup.delete.allData') }} </span>
            {{ typeName }}
            <span class="text--bold pr_1">{{ targetName }}</span>
            {{ $t('chat.common.popup.delete.willDelete') }}
            <span v-if="description !== '' ">{{ description }}</span>

            <span class="pr_1"> {{ $t('chat.common.popup.delete.continue') }} </span>
            <span class="text--delete">DELETE</span>
            <span class="pl_1"> {{ $t('chat.common.popup.delete.input') }} </span>
          </div>
          <input
            class="modal--body-input mt_3"
            placeholder="DELETE"
            type="text"
            v-model="deleteText"
          />
        </div>
        <div class="modal--footer d_flex justify_content_between align_items_center">
          <button
            class="btn--submit"
            @click="closePopup()"
          > {{ $t('chat.common.popup.delete.cancle') }} </button>
          <button
            class="btn--skip"
            v-if="deleteConfirm"
            @click="deleteTargets()"
          > {{ $t('chat.common.popup.delete.delete') }} </button>
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
      type: Object
    },
    item: {
      type: Object
    },
    block: {
      type: Object
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
      this.$emit( "closePopup", false );
    },
    async deleteTargets() {
      if(this.typeName.toString().toLowerCase() === 'unsubscrible') {
      } else if (this.typeName.toString().toLowerCase() === "itemblock") {
        const dataSender = {
          blockId: this.block._id,
          itemId: this.item._id
        };
        this.$store.dispatch("deleteItemBlock", dataSender);
        // this.$router.push({ name: "scripts" });
      }
      this.closePopup();
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "./index.style";
</style>


