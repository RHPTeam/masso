<template>
  <div class="section mt_4">
    <div class="section--header d_flex align_items_center">
      <div class="icon mr_2">
        <icon-base
          class="icon--target"
          icon--name="Nơi đăng"
          height="20px"
          width="20px"
          viewBox="0 0 500 500"
        >
          <icon-target></icon-target>
        </icon-base>
      </div>
      <div class="title">Nơi đăng</div>
    </div>
    <div class="alert--text mt_1" v-if="errorPostLocation === true">Vui lòng chọn nơi đăng!</div>
    <div class="section--body">
      <!-- Start: Timeline -->
      <div class="items">
        <div class="title mt_3 mb_2 d_flex justify_content_between">
          <span class="text--bold">Trang cá nhân</span>
        </div>
        <div class="item d_flex align_items_start mb_3">
          <div class="content">
            <div class="main">
              <multiselect
                multiple
                label="name"
                placeholder="Chọn trang cá nhân muốn đăng"
                :value="event.timeline"
                :options="allAccountFB"
                @input="selectFacebookAccount"
              >
                <template slot="option" slot-scope="option">
                  <div class="d_flex align_items_center">
                    <div
                      style="height: 30px;width: 30px;border-radius: 50%;background-position: center;background-repeat: no-repeat;background-size: cover"
                      :style="{ backgroundImage: 'url(' + option.thumbSrc + ')' }"
                    ></div>
                    <div style="font-weight: 600; margin-left: .5rem;">{{ option.name }}</div>
                  </div>
                </template>
              </multiselect>
            </div>
          </div>
        </div>
      </div>
      <!-- End: Timeline -->
      <!-- Start: Post Group -->
      <div class="items">
        <div class="title mt_3 mb_2 d_flex justify_content_between">
          <span class="text--bold">Nhóm đã lưu</span>
        </div>
        <div class="item d_flex align_items_start mb_3">
          <div class="content">
            <div class="main">
              <multiselect
                label="title"
                placeholder="Chọn nhóm muốn đăng"
                :value="event.target_category"
                :clearable="false"
                :options="allPostGroups"
                @input="selectFacebookGroup"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Start: Post Group -->
      <!-- Start: Pages -->
      <div class="items">
        <div class="title mt_2 mb_2 d_flex justify_content_between">
          <span class="text--bold">Trang Facebook</span>
        </div>
        <div class="item d_flex align_items_start">
          <div class="content">
            <div class="main">
              <multiselect
                multiple
                label="name"
                placeholder="Chọn trang muốn đăng"
                :value="convertTargetCustomPages"
                :options="facebookPages"
                @input="selectPageFacebook"
              >
                <template slot="option" slot-scope="option">
                  <div class="d_flex align_items_center">
                    <div
                      style="height: 30px;width: 30px;border-radius: 50%;background-position: center;background-repeat: no-repeat;background-size: cover"
                      :style="{ backgroundImage: 'url(' + option.profile_picture + ')' }"
                    ></div>
                    <div style="font-weight: 600; margin-left: .5rem;">{{ option.name }}</div>
                  </div>
                </template>
              </multiselect>
            </div>
          </div>
        </div>
      </div>
      <!-- End: Pages -->
      <!-- Start: Groups -->
      <div class="items">
        <div class="title mt_2 mb_2 d_flex justify_content_between">
          <span class="text--bold">Nhóm Facebook</span>
        </div>
        <div class="item d_flex align_items_start">
          <div class="content">
            <div class="main">
              <multiselect
                multiple
                label="name"
                placeholder="Chọn nhóm muốn đăng"
                :value="convertTargetCustomGroups"
                :options="facebookGroups"
                @input="selectGroupFacebook"
              >
                <template slot="option" slot-scope="option">
                  <div class="d_flex align_items_center">
                    <div
                      style="height: 30px;width: 30px;border-radius: 50%;background-position: center;background-repeat: no-repeat;background-size: cover"
                      :style="{ backgroundImage: 'url(' + option.profile_picture + ')' }"
                    ></div>
                    <div style="font-weight: 600; margin-left: .5rem;">{{ option.name }}</div>
                  </div>
                </template>
              </multiselect>
            </div>
          </div>
        </div>
      </div>
      <!-- Enđ: Groups -->
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
