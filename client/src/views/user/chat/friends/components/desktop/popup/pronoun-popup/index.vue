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
        <div class="modal--body mt_3" v-if="isShowSuggestion === false">
          <input
            type="text"
            class="modal--body-input"
            placeholder="Nhập danh xưng"
            @keydown.enter="createVocate"
            v-model="pronounInput"
          />
        </div>
        <div class="desc--error py_2" v-if="isShowAlert === true">(*) Tên danh xưng không được bỏ trống!</div>
        <div class="desc--more py_2" @click="isShowSuggestion = !isShowSuggestion">(*) Xem thêm danh xưng đã sử dụng</div>
        <div class="list--vocate mt_1" v-if="isShowSuggestion  === true">
          <multiselect
            label="name"
            placeholder="Chọn danh xưng đã tạo"
            :options="allVocate"
            v-model="vocate"
          >
          </multiselect>
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
      isShowAlert: false,
      pronounInput: "",
      vocate: ""
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
  watch: {
    "pronounInput"(value){
      if(value.length > 0) {
        this.isShowAlert = false
      }
    }
  },
  async created() {
    await this.$store.dispatch("getAllVocate");
  },
  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    createVocate(){
      if(this.vocate.length === 0 && this.pronounInput.length === 0) {
        this.isShowAlert = true;
      } else if(this.vocate.length !== 0 && this.pronounInput.length === 0) {
        const dataSender = {
          name: this.vocate.name,
          _friends: this.vocateDefault._friends
        };
        this.$store.dispatch("createVocate", dataSender);
        this.closeAddPopup();
        this.$router.go({name: "chat_friends"})
      } else if(this.vocate.length === 0 && this.pronounInput.length !== 0) {
        const dataSender = {
          name: this.pronounInput,
          _friends: this.vocateDefault._friends
        };
        this.$store.dispatch("createVocate", dataSender);
        this.closeAddPopup();
        this.$router.go({name: "chat_friends"})
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/*@import "../index.style";*/
@import "./index.style";
</style>
