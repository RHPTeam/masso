<template>
	<div class="campaigns--data my_3" :data-theme="currentTheme">
		<!-- Start: Table Header -->
		<div class="item--header d_flex align_items_center px_3 py_2">
			<div class="col col--checkbox px_2">
				<label class="custom--checkbox mb_0">
					<input type="checkbox" />
				</label>
			</div>
			<div class="col col--name px_2">
        <span
          class="sort"
          @click="sortCampaignsByProperty(isSort[0], 0)"
          :class="[
            isSort[0].asc === true || isSort[0].desc === true ? 'active' : ''
          ]"
        >Tên chiến dịch
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[0].asc === false && isSort[0].desc === false"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[0].asc"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down descending ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[0].desc"
          >
            <icon-arrow-down />
          </icon-base>
        </span>
      </div>
			<div class="col col--desc px_4">Mô tả</div>
			<div class="col col--start px_2">
        <span
          class="sort"
          @click="sortCampaignsByProperty(isSort[1], 1)"
          :class="[
            isSort[1].asc === true || isSort[1].desc === true ? 'active' : ''
          ]"
        >Bắt đầu
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[1].asc === false && isSort[1].desc === false"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[1].asc"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down descending ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[1].desc"
          >
            <icon-arrow-down />
          </icon-base>
        </span>
      </div>
			<div class="col col--finish px_2">
        <span
          class="sort"
          @click="sortCampaignsByProperty(isSort[2], 2)"
          :class="[
            isSort[2].asc === true || isSort[2].desc === true ? 'active' : ''
          ]"
        >Kết thúc
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[2].asc === false && isSort[2].desc === false"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[2].asc"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down descending ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[2].desc"
          >
            <icon-arrow-down />
          </icon-base>
        </span>
      </div>
			<div class="col col--status px_2">
        <span
          class="sort"
          @click="sortCampaignsByProperty(isSort[3], 3)"
          :class="[
            isSort[3].asc === true || isSort[3].desc === true ? 'active' : ''
          ]"
        >Trạng thái
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[3].asc === false && isSort[3].desc === false"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[3].asc"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down descending ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 160 160"
            v-if="isSort[3].desc"
          >
            <icon-arrow-down />
          </icon-base>
        </span>
      </div>
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
		<transition-group v-else name="list-complete" tag="p">
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
					<span class="col col--name-text" @click="viewCampaignDetail( campaign._id )">
						{{ campaign.title }}
					</span>
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
		</transition-group>
		<!-- End: Table Body -->
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
</template>

<script src="./main.js"></script>

<style lang="scss" scoped>
@import "./style";
.list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
