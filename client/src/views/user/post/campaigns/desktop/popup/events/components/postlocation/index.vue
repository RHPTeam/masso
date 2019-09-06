<template>
  <div class="section mt--5">
    <div class="section--header d_flex align_items_center">
      <div class="icon mr_4">
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
    <div class="section--body">
      <div class="r">
        <!-- Start: Timeline -->
        <div class="c_6">
          <div class="title mt_3 mb_2 d_flex justify_content_between">
            <span class="text--bold">Trang cá nhân</span>
          </div>
          <div class="item d_flex align_items_start mb_3">
            <div class="content">
              <div class="main">
                <r-select
                  :multiple="true"
                  label="name"
                  track-by="name"
                  placeholder="Chọn trang cá nhân"
                  :value="event.timeline"
                  :options="allAccountFB"
                  :show-labels="false"
                  :close-on-select="false"
                  @input="selectFacebookAccount"
                >
                  <template slot="tag-name" slot-scope="props">
                    <div class="d_flex align_items_center" :title="props.option.name">
                      <div
                        v-if="props.option.thumbSrc"
                        style="height: 20px; width: 20px; border-radius: 50%; background-position: center; background-repeat: no-repeat; background-size: cover; margin-right: .5rem;"
                        :style="{ backgroundImage: 'url(' + props.option.thumbSrc + ')' }"
                      ></div>
                      <div style="flex: 1; font-weight: 600; white-space: nowrap; overflow: hidden; max-width: 100%; text-overflow: ellipsis;">{{ props.option.name }}</div>
                    </div>
                  </template>
                  <template slot="option" slot-scope="props">
                    <div class="d_flex align_items_center" :title="props.option.name">
                      <div
                        style="height: 20px; width: 20px; border-radius: 50%; background-position: center; background-repeat: no-repeat; background-size: cover; margin-right: .5rem;"
                        :style="{ backgroundImage: 'url(' + props.option.thumbSrc + ')' }"
                      ></div>
                      <div style="flex: 1; font-weight: 600; white-space: nowrap; overflow: hidden; max-width: 100%; text-overflow: ellipsis;">{{ props.option.name }}</div>
                    </div>
                  </template>
                </r-select>
              </div>
            </div>
          </div>
        </div>
        <!-- End: Timeline -->
        <!-- Start: Post Group -->
        <div class="c_6">
          <div class="title mt_3 mb_2 d_flex justify_content_between">
            <span class="text--bold">Nhóm đã lưu</span>
          </div>
          <div class="item d_flex align_items_start mb_3">
            <div class="content">
              <div class="main">
                <r-select
                  label="title"
                  track-by="title"
                  placeholder="Chọn nhóm đã lưu"
                  v-model="event.target_category"
                  :options="allPostGroups"
                  :show-labels="false"
                  @input="selectFacebookGroup"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Start: Post Group -->
      </div>
      <div class="r">
        <!-- Start: Pages -->
        <div class="c_6">
          <div class="title mt_2 mb_2 d_flex justify_content_between">
            <span class="text--bold">Trang Facebook</span>
          </div>
          <div class="item d_flex align_items_start">
            <div class="content">
              <div class="main">
                <r-select
                  :multiple="true"
                  label="name"
                  track-by="name"
                  placeholder="Chọn trang"
                  :value="convertTargetCustomPages"
                  :options="facebookPages"
                  :show-labels="false"
                  :close-on-select="false"
                  @input="selectPageFacebook"
                >
                  <template slot="tag-name" slot-scope="props">
                    <div class="d_flex align_items_center" :title="props.option.name">
                      <div
                        v-if="props.option.profile_picture"
                        style="height: 20px; width: 20px; border-radius: 50%; background-position: center; background-repeat: no-repeat; background-size: cover; margin-right: .5rem;"
                        :style="{ backgroundImage: 'url(' + props.option.profile_picture + ')' }"
                      ></div>
                      <div style="flex: 1;font-weight: 600; white-space: nowrap; overflow: hidden; max-width: 100%; text-overflow: ellipsis;">{{ props.option.name }}</div>
                    </div>
                  </template>
                  <template slot="option" slot-scope="props">
                    <div class="d_flex align_items_center" :title="props.option.name">
                      <div
                        style="height: 20px; width: 20px; border-radius: 50%; background-position: center; background-repeat: no-repeat; background-size: cover; margin-right: .5rem;"
                        :style="{ backgroundImage: 'url(' + props.option.profile_picture + ')' }"
                      ></div>
                      <div style="flex: 1;font-weight: 600; white-space: nowrap; overflow: hidden; max-width: 100%; text-overflow: ellipsis;">{{ props.option.name }}</div>
                    </div>
                  </template>
                </r-select>
              </div>
            </div>
          </div>
        </div>
        <!-- End: Pages -->
        <!-- Start: Groups -->
        <div class="c_6">
          <div class="title mt_2 mb_2 d_flex justify_content_between">
            <span class="text--bold">Nhóm Facebook</span>
          </div>
          <div class="item d_flex align_items_start">
            <div class="content">
              <div class="main">
                <r-select
                  :multiple="true"
                  label="name"
                  track-by="name"
                  placeholder="Chọn nhóm"
                  :value="convertTargetCustomGroups"
                  :options="facebookGroups"
                  :show-labels="false"
                  :close-on-select="false"
                  @input="selectGroupFacebook"
                >
                  <template slot="tag-name" slot-scope="props">
                    <div class="d_flex align_items_center" :title="props.option.name">
                      <div
                        v-if="props.option.profile_picture"
                        style="height: 20px; width: 20px; border-radius: 50%; background-position: center; background-repeat: no-repeat; background-size: cover; margin-right: .5rem;"
                        :style="{ backgroundImage: 'url(' + props.option.profile_picture + ')' }"
                      ></div>
                      <div style="flex: 1;font-weight: 600; white-space: nowrap; overflow: hidden; max-width: 100%; text-overflow: ellipsis;">{{ props.option.name }}</div>
                    </div>
                  </template>
                  <template slot="option" slot-scope="props">
                    <div class="d_flex align_items_center" :title="props.option.name">
                      <div
                        style="height: 20px; width: 20px; border-radius: 50%; background-position: center; background-repeat: no-repeat; background-size: cover; margin-right: .5rem;"
                        :style="{ backgroundImage: 'url(' + props.option.profile_picture + ')' }"
                      ></div>
                      <div style="flex: 1; font-weight: 600; white-space: nowrap; overflow: hidden; max-width: 100%; text-overflow: ellipsis;">{{ props.option.name }}</div>
                    </div>
                  </template>
                </r-select>
              </div>
            </div>
          </div>
        </div>
        <!-- Enđ: Groups -->
      </div>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
