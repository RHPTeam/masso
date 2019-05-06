<template>
	<div class="postgroup--data my_3" :data-theme="currentTheme">
    <div class="loading--block"
      v-if="facebookGroupsStatus === 'loading' || facebookPagesStatus === 'loading' "
    >
      <loading-component class="loading"></loading-component>
    </div>
		<!-- Start: Table Body -->
		<transition-group v-else name="list-transition">
      <!-- Start: Pages Data -->
      <div class="item--body font_weight_bold d_flex align_items_center px_4 py_2"
           v-for="(v, i) in 1"
           :key="`fbp-header${i}`"
      >Trang</div>
			<div class="item--body d_flex align_items_center px_3 py_2"
			v-for="( item, index ) in facebookPages"
			:key="`fbg-${index}`"
			>
				<div class="col col--checkbox px_2">
					<label class="custom--checkbox mb_0">
						<input type="checkbox"/>
					</label>
				</div>
				<div class="col col--name d_flex align_items_center pl_3">
          <div class="avatar pr_2">
            <img :src="item.profile_picture" alt="avatar" width="30px" height="30px">
          </div>
					<span class="col col--name-text">
						{{ item.name }}
					</span>
				</div>
			</div>
      <!-- End: Pages Data -->
      <!-- Start: Groups Data -->
      <div class="item--body font_weight_bold d_flex align_items_center px_4 py_2"
           v-for="(x, j) in 1"
           :key="`fbg-header${j}`"
      >Nhóm</div>
      <div class="item--body d_flex align_items_center px_3 py_2"
           v-for="( item, index ) in facebookGroups"
           :key="`fbp-${index}`"
      >
        <div class="col col--checkbox px_2">
          <label class="custom--checkbox mb_0">
            <input type="checkbox"/>
          </label>
        </div>
        <div class="col col--name d_flex align_items_center pl_3">
          <div class="avatar pr_2">
            <img :src="item.profile_picture" alt="avatar" width="30px" height="30px">
          </div>
          <span class="col col--name-text">
						{{ item.name }}
					</span>
        </div>
      </div>
      <!-- End: Groups Data -->
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
