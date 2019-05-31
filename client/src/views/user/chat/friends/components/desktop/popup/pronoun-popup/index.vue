<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <div class="title">Danh xưng</div>
          <div class="desc mt_2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <div class="modal--body mt_3">
          <input type="text"
                  class="modal--body-input" 
                  placeholder="Nhập danh xưng"
                 @keydown.enter="createVocate"
                  v-model="pronounInput"/>
          <div class="suggestion--list"
                v-if="isShowSuggestion && filterSuggestionList().length > 0"
          >
            <VuePerfectScrollbar class="scroll">
              <div
                class="suggestion--list-item"
                v-for="(item, index) in filterSuggestionList()"
                :key="index"
                @click="selectPronoun(item)"
              >
                {{ item }}
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeAddPopup">HỦY</button>
          <button class="btn-submit" @click="createVocate(pronounInput, userID)">
            LƯU
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {

  components: {
    VuePerfectScrollbar
  },
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
    vocatesName(){
      const vocatesNameArr = [];
      const vocatesArr = this.$store.getters.allVocates;
      vocatesArr.forEach(item => {
        vocatesNameArr.push(item.name);
      });
      return vocatesNameArr;
    },
    vocateDefault(){
      return this.$store.getters.vocateDefault;
    }
  },
  async created() {
    await this.$store.dispatch("getAllVocate");
  },

  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    showSuggestion() {
      this.isShowSuggestion = true;
    },
    filterSuggestionList() {
      return this.vocatesName.filter(item => {
        return item.toLowerCase().includes(this.pronounInput.toLowerCase())
      })
    },
    selectPronoun(val) {
      this.pronounInput = val[0].toUpperCase() + val.slice(1);
      this.isShowSuggestion = false;
    },
    createVocate(){
      const dataSender = {
        name: this.pronounInput,
        _friends: this.vocateDefault._friends
      };
      console.log(dataSender);
      this.$store.dispatch("createVocate", dataSender);
      // this.$emit("closeAddPopup", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";
@import "./index.style";
</style>
