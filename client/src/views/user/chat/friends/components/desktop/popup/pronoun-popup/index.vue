<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title">Danh xưng</div>
          <div class="desc mt_2">
            Tạo danh xưng hay tên thường gọi của bạn bè giúp bạn quản lý tốt hơn các phân khúc khách hàng, cũng như những người thường xuyên được bạn quan tâm.
          </div>
        </div>
        <div class="modal--body mt_3">
          <input
            type="text"
            class="modal--body-input"
            placeholder="Nhập danh xưng"
            @keydown.enter="createVocate"
            v-model="pronounInput"
          />
        </div>
        <div class="suggestion--list mt_2">
          <VuePerfectScrollbar class="scroll">
            <div
              class="suggestion--list-item"
              v-for="(item, index) in allVocate"
              :key="index"
              @click="selectPronoun(item.name)"
            >
              {{ item.name }}
            </div>
          </VuePerfectScrollbar>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeAddPopup">HỦY</button>
          <button class="btn-submit" @click="createVocate">
            LƯU
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isShowPronounPopup","userID"],

  data() {
    return {
      isShowSuggestion: false,
      pronounInput: '',
    };
  },

  computed: {
    groupInfo() {
      return this.$store.getters.groupInfo;
    },
    vocateDefault(){
      return this.$store.getters.vocateDefault;
    },
    allVocate(){
      return this.$store.getters.allVocate;
    }
  },
  async created() {
    await this.$store.dispatch("getAllVocate");
  },

  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    selectPronoun(val) {
      const dataSender = {
        name: val,
        _friends: this.vocateDefault._friends
      };
      console.log(dataSender);
      this.$store.dispatch("createVocate", dataSender);
      this.closeAddPopup();
    },
    createVocate(){
      const dataSender = {
        name: this.pronounInput,
        _friends: this.vocateDefault._friends
      };
      this.$store.dispatch("createVocate", dataSender);
      this.closeAddPopup();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";
@import "./index.style";
</style>
