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
        <div class="modal--body my_3 px_2">
          <div class="body--form">
            <div class="mb_2">Tên chiến dịch</div>
            <input
              class="modal--body-input"
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
  methods: {
    closePopup() {
      this.$emit( "closePopupCreateNewCampaign", false );
    },
    async createCampaign() {
      await this.$store.dispatch( "createCampaign", this.newCampaign );
      const campaign = this.$store.getters.campaignDetail;
      this.$router.push( campaign._id );
      this.$emit( "closePopupCreateNewCampaign", false );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../index.style";

textarea.modal--body-input {
  resize: none;
}
</style>
