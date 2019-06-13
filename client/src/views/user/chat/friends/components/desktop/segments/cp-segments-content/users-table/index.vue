<template>
  <div class="users--table mt_3" :data-theme="currentTheme">
    <!-- User Table Header -->
    <div class="user--table-item header">
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
        <span
          class="sort"
          >{{ $t("chat.friends.table.main.name") }}
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
          <!-- <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
          >
            <icon-arrow-up />
          </icon-base> -->
        </span>
      </div>
      <div class="gender">
        <span
          class="sort"
          >{{ $t("chat.friends.table.main.gender") }}
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
          <!-- <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
          >
            <icon-arrow-up />
          </icon-base> -->
        </span>
      </div>
      <div class="pronoun pl_3">
        <span
          class="sort"
          >{{ $t("chat.friends.table.main.nickname") }}
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
          <!-- <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
          >
            <icon-arrow-up />
          </icon-base> -->
        </span>
      </div>
      <div class="updated-date">
        <span
          class="sort"
        >Nhóm
          <icon-base
            class="icon--arrow-down ml_1"
            icon-name="icon-arrow-down"
            width="12"
            height="12"
            viewBox="0 0 160 160"
          >
            <icon-arrow-down />
          </icon-base>
          <!-- <icon-base
            class="icon--arrow-up ml_1"
            icon-name="icon-arrow-up"
            width="12"
            height="12"
            viewBox="0 0 26 26"
          >
            <icon-arrow-up />
          </icon-base> -->
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
      <!-- GO MESSAGER -->
      <div class="go--mess">

      </div>
    </div>
    <!-- End User Table Header -->
    <!--Start: Loading Component-->
    <vue-perfect-scrollbar class="infinite" @ps-y-reach-end="loadMore">
<!--      <loading-component-->
<!--        class="friends text_center pt_3"-->
<!--      />-->
      <!--End: Loading Component-->

      <div v-if="resultsDefault === true">
        <!-- Start : User Table Items Of Group -->
        <div v-if="groupSelected === false">
<!--          <div v-if="this.$store.getters.frStatus ==='loading'">-->
<!--            <loading-component />-->
<!--          </div>-->
          <div>
            <div v-if="listFriendDefault && listFriendDefault.length > 0">
              <div
                class="user--table-item record"
                v-for="(user, index) in listFriendDefault"
                :key="index"
              >
                <div class="checkbox">
                <span class="checkbox--control">
                  <input
                    type="checkbox"
                    class="checkbox--control-input"
                    v-model="selectedUIDs"
                    :value="user"
                  />
                  <span class="checkbox--control-checkmark"></span>
                </span>
                </div>

                <div class="name">
                  <div class="name--avatar mr_2">
                    <img
                      :src="user.profilePicture"
                      alt="ảnh đại diện"
                      width="32px"
                      height="32px"
                    />
                  </div>
                  <div class="name--text">
                    <span class="btn--action"> {{user.fullName }}</span>
                  </div>
                </div>

                <div class="gender">
                  <span class="btn--action">{{user.gender === 'female_singular' ? 'Nữ' : 'Nam'}}</span>
                </div>

                <div class="pronoun">
                  <span
                    class="btn--action"
                    @click="showPronounPopup(user.userID)"
                  >
                    {{user.vocate}}
                  </span>
                </div>

                <div class="updated-date">
                  <span class="btn--action">0</span>
                </div>
                <div class="go--mess">
                  <icon-base
                    class="icon--mess"
                    icon-name="icon-mess"
                    width="25"
                    height="20"
                    viewBox="0 0 12 12"
                  >
                    <icon-messenger />
                  </icon-base>
                </div>
              </div>
            </div>
            <div v-else class="none--data">
              {{ $t("chat.friends.table.main.loading") }}
            </div>
          </div>
          <!--End: User Table Items of Group -->
        </div>

        <!--Start: Show all info user in table-->
        <div v-if="groupSelected === true">
          <div v-if="listFriendOfGroup && listFriendOfGroup.length > 0">

            <div
              class="user--table-item record"
              v-for="(user, index) in listFriendOfGroup[0]._friends"
              :key="`g-${index}`"
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
                    :src="user.profilePicture"
                    width="32px"
                    height="32px"
                  />
                </div>
                <div class="name--text">
                  <span class="btn--action">{{user.fullName}}</span>
                </div>
              </div>

              <div class="updated-date">
                <span class="btn--action">Chưa thiết lập</span>
              </div>

              <div class="gender">
                <span class="btn--action">{{user.gender}}</span>
              </div>
              <div class="pronoun">
                <span
                  class="btn--action"
                  @click="showPronounPopup(user.userID)"
                >
                  {{ $t("chat.friends.table.main.setup") }}
                </span>
              </div>

              <div class="attributes d_none">
                <span class="btn--action">None</span>
              </div>
              <div class="status d_none">
                <span class="btn--action">None</span>
              </div>
            </div>
          </div>
          <div v-else class="none--data">
            {{ $t("chat.friends.table.main.loading") }}
          </div>
        </div>
        <!--End: Show all info user in table-->
      </div>

      <!--Start: show info user filter-->
      <div v-if="resultsDefault === false">
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
                width="32px"
                height="32px"
              />
            </div>
            <div class="name--text">
              <span class="btn--action">FullName</span>
            </div>
          </div>
          <div class="gender">
            <span class="btn--action">Gender</span>
          </div>
          <div class="pronoun">
            <!-- <span
              class="btn--action"
            >
             Danh xung ne
            </span> -->
            <span class="btn--action" @click="isShowPronounPopup = true">
            Chọn để thiết lập
          </span>
          </div>
          <!-- <div class="updated-date d_none">
            <span class="btn--action">
              user.updated_at | covertDateUpdatedAt
            }}</span>
          </div> -->
          <div class="attributes d_none">
            <span class="btn--action">None</span>
          </div>
          <div class="status d_none">
            <span class="btn--action">None</span>
          </div>
        </div>
      </div>
      <!--End: show info user filter-->
    </vue-perfect-scrollbar>

    <!--*********** POPUP *************-->
    <transition name="popup-enter-active">
      <pronoun-popup
        v-if="isShowPronounPopup === true"
        :data-theme="currentTheme"
        @closeAddPopup="isShowPronounPopup = $event"
      ></pronoun-popup>
    </transition>
  </div>
  <!--  -->
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
