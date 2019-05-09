<template>
<div class="modal--wrapper" :data-theme="currentTheme">
	<div class="modal--dialog d_flex justify_content_center align_items_center">
		<div class="modal--content px_3 py_4">
			<div class="modal--header">
				<div class="title">Tạo mới chiến dịch</div>
				</div>
			<div class="modal--body my_3">
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
			<div class="modal--footer d_flex justify_content_between align_items_center">
				<button class="btn--skip" @click="closePopup()">HỦY</button>
				<button class="btn--submit" @click="createCampaign()">TẠO</button>
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
        description: ""
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
      this.$emit( "closePopup", false );
    },
    async createCampaign() {
      await this.$store.dispatch( "createCampaign", this.newCampaign );
      const campaign = this.$store.getters.campaignDetail;

      this.$router.push( campaign._id );
      this.$emit( "closePopup", false );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style";
textarea.modal--body-input {
  resize: none;
}
</style>

