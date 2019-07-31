<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog">
      <div class="modal--content">
        <div class="modal--header mb_3 d_flex align_items_center">
          <div @click="closePopup">
            <icon-base
              icon-name="arrow-down"
              class="arrow-down"
              width="20"
              height="20"
              viewBox="0 0 130 130"
            >
              <icon-arrow-down />
            </icon-base>
          </div>
          <p class="name--modal mb_0 m_auto">Tạo chiến dịch</p>
          <div class="active mr_3" @click="createCampaign">Tạo</div>
        </div>
        <div class="modal--body my_3 px_3">
          <div class="body--form">
            <div class>Tên chiến dịch</div>
            <div class="error mt_1" v-if="isShowAlert === true">Tên chiến dịch không được bỏ trống</div>
            <input
              class="modal--body-input mt_2"
              placeholder="Nhập tên chiến dịch"
              type="text"
              v-model="newCampaign.title"
            />
          </div>
          <div class="body--form mt_3">
            <div class="mb_2">Mô tả</div>
            <textarea
              class="modal--body-input"
              placeholder="Nhập mô tả"
              rows="3"
              v-model="newCampaign.description"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowAlert: false,
      newCampaign: {
        title: "",
        description: "",
        startedAt: new Date(),
        finishedAt: new Date()
      }
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  watch: {
    "newCampaign.title"(value) {
      if (value.length > 0) {
        this.isShowAlert = false;
      }
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    async createCampaign() {
      if (this.newCampaign.title.trim().length === 0) {
        this.isShowAlert = true;
      } else {
        await this.$store.dispatch("createCampaign", this.newCampaign);
        const dataSender = {
          size: 25,
          page: 1
        };
        await this.$store.dispatch("getCampaignsByPageMobile", dataSender);
        this.closePopup();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";

textarea.modal--body-input {
  resize: none;
}
.error {
  font-size: 0.8315rem;
  color: red;
}
</style>
