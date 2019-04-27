<template>
	<div class="campaigns--data my_3" :data-theme="currentTheme">
		<!-- Start: Table Header -->
		<div class="item--header d_flex align_items_center px_3 py_2">
			<div class="col col--checkbox px_2">
				<label class="custom--checkbox mb_0">
					<input type="checkbox" />
				</label>
			</div>
			<div class="col col--name px_2">Tên chiến dịch</div>
			<div class="col col--desc px_4">Mô tả</div>
			<div class="col col--start px_2">Bắt đầu</div>
			<div class="col col--finish px_2">Kết thúc</div>
			<div class="col col--status px_2">Trạng thái</div>
			<div class="col col--action px_4">Hành động</div>
		</div>
		<!-- End: Table Header -->
		<!-- Start: Table Body Empty Data-->
		<div
			class="item--body d_flex align_items_center justify_content_center px_3 py_2"
			v-if="filteredCampaigns.length === 0"
		>
			Không có dữ liệu.
		</div>
		<!-- End: Table Body Empty Data-->
		<!-- Start: Table Body -->
		<div v-else>
			<div class="item--body d_flex align_items_center px_3 py_2"
			v-for="( campaign, index ) in filteredCampaigns"
			:key="index"
			>
				<div class="col col--checkbox px_2">
					<label class="custom--checkbox mb_0">
						<input type="checkbox"/>
					</label>
				</div>
				<div class="col col--name px_2">
					<div class="col col--name-text" @click="viewCampaignDetail( campaign._id )">
						{{ campaign.title }}
					</div>
				</div>
				<div class="col col--desc px_4">
					<div class="col--desc-text">
						{{ campaign.description }}
					</div>
				</div>
				<div class="col col--start px_2">
					{{ formatDate(campaign.started_at) }}
				</div>
				<div class="col col--finish px_2">
					{{ formatDate(campaign.finished_at) }}
				</div>
				<div class="col col--status px_2">
					<div class="status--content d_flex align_items_center">
						<div class="status--dot mr_2"
							:class="[ campaign.status ? 'active' : 'deactive' ]"
						></div>
						<div class="status--text" v-if="campaign.status">
							Đang hoạt động
						</div>
						<div class="status--text" v-else>
							Ngừng hoạt động
						</div>
					</div>
				</div>
				<div class="col col--action px_4 text_center">
					<span class="mx_1">
						<icon-base
							class="ic--copy"
							icon-name="copy"
							width="20"
							height="20"
							viewBox="0 0 520 520"
						>
							<icon-copy />
						</icon-base>
					</span>
					<span @click="showDeleteCampaignPopup(campaign)">
						<icon-base
							class="ic--remove"
							icon-name="remove"
							width="20"
							height="20"
							viewBox="0 0 16 16"
						>
							<icon-remove />
						</icon-base>
					</span>
				</div>
			</div>
      <!-- Start: Delete Campaign Popup -->
      <transition name="popup">
        <delete-campaign-popup
          v-if="isShowDeleteCampaignPopup === true"
          :campaign="campaignDelete"
          @closePopup="isShowDeleteCampaignPopup = $event"
        ></delete-campaign-popup>
      </transition>
      <!-- End: Delete Campaign Popup -->
		</div>
		<!-- End: Table Body -->
	</div>
</template>

<script src="./main.js"></script>

<style lang="scss" scoped>
@import "./style";
</style>
