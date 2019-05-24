<template>
  <div class="users--table mt_3" :data-theme="currentTheme">
    <!-- User Table Header -->
    <div class="user--table-item header">
      <div class="checkbox">
        <span class="checkbox--control">
          <input
            type="checkbox"
            class="checkbox--control-input"
            v-model="selectAll"
          />
          <span class="checkbox--control-checkmark"></span>
        </span>
      </div>
      <div class="name">
        <span
          class="sort"
          >Tên
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
          >
            <icon-arrow-up />
          </icon-base>
        </span>
      </div>
      <div class="gender">
        <span
          class="sort"
          >Giới tính
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
          >
            <icon-arrow-up />
          </icon-base>
        </span>
      </div>
      <div class="pronoun">
        <span
          class="sort"
          >Danh xưng
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
          >
            <icon-arrow-up />
          </icon-base>
        </span>
      </div>
      <div class="updated-date d_none">
        <span
          class="sort"
          >Xem lần cuối
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
          <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
          >
            <icon-arrow-up />
          </icon-base>
        </span>
      </div>
      <div class="attributes d_none">
        <span class="sort"
          >Thuộc tính
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
        </span>
      </div>
      <div class="status d_none">
        <span class="sort"
          >Trạng thái
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
        </span>
      </div>
    </div>
    <!-- End User Table Header -->

    <!--Start: Loading Component-->
    <div v-if="resultsDefault === true">
      <loading-component
        class="friend text_center pt_3"
      />
      <!--End: Loading Component-->

      <div>
        <!-- Start : User Table Items Of Group -->
        <div v-if="groupSelected === true">
          <loading-component
          />
          <div>
            <div class="none--data">
              Không có dữ liệu
            </div>
            <div
              class="user--table-item record"
            >
              <div class="checkbox">
                <span class="checkbox--control">
                  <input
                    type="checkbox"
                    class="checkbox--control-input"
                  />
                  <span class="checkbox--control-checkmark"></span>
                </span>
              </div>
              <div class="name">
                <div class="name--avatar mr_2">
                  <img
                    alt="ảnh đại diện"
                    width="32px"
                    height="32px"
                  />
                </div>
                <div class="name--text">
                  <span class="btn--action"> user.fullName }}</span>
                </div>
              </div>
              <div class="gender">
                <span class="btn--action">dddd</span>
              </div>
              <div class="pronoun">
                <span
                  class="btn--action"
                >
                  user.vocate | upperCaseFirstLetter }}
                </span>
                <span
                  class="btn--action"
                >
                  Chọn để thiết lập
                </span>
              </div>
              <div class="updated-date d_none">
                <span class="btn--action">
                  user.updated_at | covertDateUpdatedAt
                }}</span>
              </div>
              <div class="attributes d_none">
                <span class="btn--action">None</span>
              </div>
              <div class="status d_none">
                <span class="btn--action">None</span>
              </div>
            </div>
          </div>
          <!--End: User Table Items of Group -->
        </div>

        <!--Start: Show all info user in table-->
        <div>
          <div class="none--data">
            Không có dữ liệu
          </div>
          <div
            class="user--table-item record"
          >
            <div class="checkbox">
              <span class="checkbox--control">
                <input
                  type="checkbox"
                  class="checkbox--control-input"
                />
                <span class="checkbox--control-checkmark"></span>
              </span>
            </div>
            <div class="name">
              <div class="name--avatar mr_2">
                <img
                  alt="ảnh đại diện"
                  width="32px"
                  height="32px"
                />
              </div>
              <div class="name--text">
                <span class="btn--action">user.fullName }}</span>
              </div>
            </div>
            <div class="gender">
              <span class="btn--action">fzfxfx}</span>
            </div>
            <div class="pronoun">
              <span
                class="btn--action"
              >
                user.vocate | upperCaseFirstLetter }}
              </span>
              <span
                class="btn--action"
              >
                Chọn để thiết lập
              </span>
            </div>
            <div class="updated-date d_none">
              <span class="btn--action">
                user.updated_at | covertDateUpdatedAt
              }}</span>
            </div>
            <div class="attributes d_none">
              <span class="btn--action">None</span>
            </div>
            <div class="status d_none">
              <span class="btn--action">None</span>
            </div>
          </div>
        </div>
        <!--End: Show all info user in table-->
      </div>
    </div>

    <!--Start: show info user filter-->
    <div>
      <div class="none--data">
        Không có dữ liệu
      </div>
      <div
        class="user--table-item record"
      >
        <div class="checkbox">
          <span class="checkbox--control">
            <input
              type="checkbox"
              class="checkbox--control-input"
            />
            <span class="checkbox--control-checkmark"></span>
          </span>
        </div>
        <div class="name">
          <div class="name--avatar mr_2">
            <img
              alt="ảnh đại diện"
              width="32px"
              height="32px"
            />
          </div>
          <div class="name--text">
            <span class="btn--action">user.fullName }}</span>
          </div>
        </div>
        <div class="gender">
          <span class="btn--action">showGender(user.gender) }}</span>
        </div>
        <div class="pronoun">
          <span
            class="btn--action"
          >
           user.vocate | upperCaseFirstLetter }}
          </span>
          <span class="btn--action">
            Chọn để thiết lập
          </span>
        </div>
        <div class="updated-date d_none">
          <span class="btn--action">
            user.updated_at | covertDateUpdatedAt
          }}</span>
        </div>
        <div class="attributes d_none">
          <span class="btn--action">None</span>
        </div>
        <div class="status d_none">
          <span class="btn--action">None</span>
        </div>
      </div>
    </div>
    <!--End: show info user filter-->

    <!--Start: Paginate Component Search-->
    <div
      class="user--pagination d_flex justify_content_end"
    >
      <!-- <pagination
        prevText="Trước"
        nextText="Tiếp"
      /> -->
    </div>
    <!--End: Paginate Component Search-->

    <!--Start: Paginate Component-->
    <div
      class="user--pagination d_flex justify_content_end"
    >
      <!-- <pagination
        prevText="Trước"
        nextText="Tiếp"
      /> -->
    </div>
    <!--End: Paginate Component-->

    <!--*********** POPUP *************-->
    <!-- <transition name="popup">
      <pronoun-popup
        v-if="isShowPronounPopup === true"
        :data-theme="currentTheme"
        :isShowPronounPopup="isShowPronounPopup"
        :userID="userID"
        @closeAddPopup="isShowPronounPopup = $event"
      ></pronoun-popup>
    </transition> -->
  </div>
  <!--  -->
</template>

<script src="./users-table.script.js"></script>

<style lang="scss" scoped>
@import "./users-table.style";
</style>
