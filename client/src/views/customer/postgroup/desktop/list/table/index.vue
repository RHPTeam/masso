<template>
	<div class="postgroup--data my_3" :data-theme="currentTheme">
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
        >Tên
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
			<div class="col col--type px_2">
        <span
          class="sort"
          @click="sortCampaignsByProperty(isSort[1], 1)"
          :class="[
            isSort[1].asc === true || isSort[1].desc === true ? 'active' : ''
          ]"
        >Loại
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
			<div class="col col--account px_2">
        <span
          class="sort"
          @click="sortCampaignsByProperty(isSort[2], 2)"
          :class="[
            isSort[2].asc === true || isSort[2].desc === true ? 'active' : ''
          ]"
        >Tài khoản
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
		</div>
		<!-- End: Table Header -->
		<!-- Start: Table Body Empty Data-->
		<div
			class="item--body d_flex align_items_center justify_content_center px_3 py_2"
			v-if="postGroups.length === 0"
		>
			Không có dữ liệu.
		</div>
		<!-- End: Table Body Empty Data-->
		<!-- Start: Table Body -->
		<transition-group v-else name="list-transition">
			<div class="item--body d_flex align_items_center px_3 py_2"
			v-for="( item, index ) in postGroups"
			:key="`pgr-${index}`"
			>
				<div class="col col--checkbox px_2">
					<label class="custom--checkbox mb_0">
						<input type="checkbox"/>
					</label>
				</div>
				<div class="col col--name d_flex align_items_center px_2">
          <div class="avatar">
            <img :src="item.avatar" alt="avatar" width="30px" height="30px">
          </div>
					<span class="col col--name-text">
						{{ item.name }}
					</span>
				</div>
				<div class="col col--type pl_3 pr_2">
					{{ item.type }}
				</div>
				<div class="col col--account pl_3 pr_2">
					{{ item.account }}
				</div>
			</div>
		</transition-group>
		<!-- End: Table Body -->
    <!-- Start: Delete Campaign Popup -->
    <transition name="popup">
    </transition>
    <!-- End: Delete Campaign Popup -->
	</div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
