<template>
  <div class="wrapper" :data-theme="currentTheme">
    <div class="content mb_3">
      <vue-perfect-scrollbar class="modal--scroll-edit mb_3">
        <!-- Start: Modal Header -->
        <div class="modal--header d_flex align_items_center mb_3">
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
          <div class="title m_auto">Thêm bài viết</div>
          <div class="edit mr_3" @click="savePost">Tạo</div>
        </div>
        <!-- End: Modal Header -->
        <div class="modal--main px_3">
          <!-- Start: Post Title -->
          <div class="item mb_4">
            <span>Tên bài viết</span>
            <div class="error my_1" v-if="isShowAlertTitle === true">Tiêu đề không được bỏ trống</div>
            <input
              type="text"
              class="input mt_2"
              placeholder="Nhập tên bài viết"
              v-model="post.title"
              @keydown="clear"
            />
          </div>
          <!-- End: Post Title -->
          <!-- Start: Post Categories -->
          <div class="item">
            <span>Danh mục</span>
            <div class="error my_1" v-if="isShowAlertCategory === true">Danh mục không được bỏ trống</div>
            <div class="item--categories mt_2">
              <multiselect
                label="title"
                multiple
                v-model="post._categories"
                @input="updateCate"
                :options="categories"
                placeholder="Chọn danh mục"
              >
                <template slot="option" slot-scope="option">
                  <span>{{ option.title }}</span>
                </template>
              </multiselect>
            </div>
          </div>
          <!-- End: Post Categories -->
          <!-- Start: Post Content -->
          <div class="item mt_4">
            <span>Nội dung</span>
            <div class="my_1 error" v-if="isShowAlertContent === true">Nội dung không được bỏ trống!</div>
            <div class="wrap mt_2">
              <!--Start: Create and show content-->
              <div class="content position_relative">
                <!--Start: Content Default-->
                <div v-if="checkColor" class="p_2">
                  <contenteditable
                    tag="div"
                    class="description"
                    :contenteditable="statusContentEditable"
                    v-model="post.content"
                    placeholder="Cập nhật nội dung bài viết"
                    @click="showOptionColor"
                  />

                  <!--Start: Show tag and check in-->
                  <div class="tagger--summary mb_1 p_2">
                    <span class>
                      <span
                        v-if="post.tags && post.tags.length > 0 ||
                              post.activity ||
                              post.place "
                      >—</span>
                      <!--Start: Show activity -->
                      <span class="pl_1">
                        <span v-if="post.activity === undefined || post.activity === ''"></span>
                        <span v-else class>
                          <span>đang</span>
                          <img class="emoji" :src="post.activity.id.photo" alt />
                          <span class="feel">{{post.activity.typeActivity.text}}</span>
                          <span
                            class="text_other"
                            @click="showOptionPostActivity"
                          >{{ post.activity.text }}</span>
                          <span v-if="post.tags && post.tags.length !== 0 ">cùng</span>
                        </span>
                      </span>
                      <!--End: Show activity -->
                      <!--Start: Show tag friends-->
                      <span>
                        <span v-if="post.tags && post.tags.length === 0"></span>
                        <span v-else>
                          <!--Start:  If tag 1 friends-->
                          <span class="result" v-if="post.tags && post.tags.length === 1">
                            <span>với</span>
                            <span
                              class="text--orange"
                              v-if="post.tags"
                              @click="showOptionPostTagsFriend"
                            >{{ post.tags[0].text }}</span>
                          </span>
                          <!--End: If tag 1 friends-->
                          <!--Start: If tags over 1 friends-->
                          <span v-else class="result">
                            <span>
                              với
                              <span
                                class="text--orange"
                                v-if="post.tags"
                                @click="showOptionPostTagsFriend"
                              >{{ post.tags[0].text }}</span>
                            </span>
                            <span class="more--other position_relative ml_1">
                              <span>và</span>
                              <span class="text--orange" v-if="post.tags">{{ post.tags.length - 1 }}</span>
                              <span>người khác</span>
                              <div class="more--friend position_absolute">
                                <div class="more--wrap">
                                  <div
                                    class="more--item"
                                    v-for="(item, index) in moreFriend"
                                    :key="`f-${index}`"
                                  >{{ item.text }}</div>
                                </div>
                              </div>
                            </span>
                          </span>
                          <!--End: If tags over 1 friends-->
                        </span>
                      </span>
                      <!--End: Show tag friends-->

                      <!--Start: Show check in -->
                      <span class="ml_1">
                        <span v-if="post.place === '' || post.place === undefined"></span>
                        <span v-else class="result">
                          <span>tại</span>
                          <span
                            class="text--orange"
                            @click="showOptionPostCheckin"
                          >{{ post.place.text }}</span>
                        </span>
                      </span>
                      <!--End: Show check in -->
                    </span>
                  </div>
                  <!--End: Show tag and check in-->
                </div>
                <!--End: Content Default-->
                <!--Start: Content Choose Color-->
                <div v-else :style="post.color.value" id="content--special">
                  <div
                    class="content--special d_flex align_items_center justify_content_center p_4 position_relative"
                  >
                    <div class="close position_absolute" @click="changeContentDefault">
                      <icon-base
                        class="ic--close"
                        icon-name="close"
                        width="20"
                        height="20"
                        viewBox="0 0 35 35"
                      >
                        <icon-close />
                      </icon-base>
                    </div>

                    <contenteditable
                      tag="div"
                      class="description"
                      :contenteditable="true"
                      v-model="post.content"
                      placeholder="Cập nhật nội dung bài viết color"
                    />
                  </div>
                  <!--Start: Choose color text-->
                  <div class="color pl_3">
                    <color-post
                      @turnOff="isShowColor = $event"
                      @openContentColor="changeResultContentColor($event)"
                      :randomColor="randomColor"
                      :colorFb="colorFb"
                      :post="post"
                      @changeBgColor="changeBgColor($event)"
                    ></color-post>
                  </div>
                  <!--End: Choose color text-->
                  <!--Start: Show tag and check in-->
                  <div class="tagger--summary mb_1 p_2">
                    <span class>
                      <span
                        v-if="post.tags && post.tags.length > 0 ||
                              post.activity ||
                              post.place "
                      >—</span>
                      <!--Start: Show activity -->
                      <span class="pl_1">
                        <span v-if="post.activity === undefined || post.activity === ''"></span>
                        <span v-else class>
                          <span>đang</span>
                          <img class="emoji" :src="post.activity.id.photo" alt />
                          <span class="feel">{{post.activity.typeActivity.text}}</span>
                          <span
                            class="text_other"
                            @click="showOptionPostActivity"
                          >{{ post.activity.text }}</span>
                          <span v-if="post.tags && post.tags.length !== 0 ">cùng</span>
                        </span>
                      </span>
                      <!--End: Show activity -->
                      <!--Start: Show tag friends-->
                      <span>
                        <span v-if="post.tags && post.tags.length === 0"></span>
                        <span v-else>
                          <!--Start:  If tag 1 friends-->
                          <span class="result" v-if="post.tags && post.tags.length === 1">
                            <span>với</span>
                            <span
                              class="text--orange"
                              v-if="post.tags"
                              @click="showOptionPostTagsFriend"
                            >{{ post.tags[0].text }}</span>
                          </span>
                          <!--End: If tag 1 friends-->
                          <!--Start: If tags over 1 friends-->
                          <span v-else class="result">
                            <span>
                              với
                              <span
                                class="text--orange"
                                v-if="post.tags"
                                @click="showOptionPostTagsFriend"
                              >{{ post.tags[0].text }}</span>
                            </span>
                            <span class="more--other position_relative ml_1">
                              <span>và</span>
                              <span class="text--orange" v-if="post.tags">{{ post.tags.length - 1 }}</span>
                              <span>người khác</span>
                              <div class="more--friend position_absolute">
                                <div class="more--wrap">
                                  <div
                                    class="more--item"
                                    v-for="(item, index) in moreFriend"
                                    :key="`f-${index}`"
                                  >{{ item.text }}</div>
                                </div>
                              </div>
                            </span>
                          </span>
                          <!--End: If tags over 1 friends-->
                        </span>
                      </span>
                      <!--End: Show tag friends-->

                      <!--Start: Show check in -->
                      <span class="ml_1">
                        <span v-if="post.place === '' || post.place === undefined"></span>
                        <span v-else class="result">
                          <span>tại</span>
                          <span
                            class="text--orange"
                            @click="showOptionPostCheckin"
                          >{{ post.place.text }}</span>
                        </span>
                      </span>
                      <!--End: Show check in -->
                    </span>
                  </div>
                  <!--End: Show tag and check in-->
                </div>
                <!--End: Content Choose Color-->
                <!--Start: Choose Color Text-->
                <div class="color" v-if="isShowColor === true && post.attachments.length === 0">
                  <color-post
                    class="px_2 py_1"
                    @turnOff="isShowColor = $event"
                    @openContentColor="changeResultContentColor($event)"
                    :randomColor="randomColor"
                    :colorFb="colorFb"
                    :post="post"
                    @changeBgColor="changeBgColor($event)"
                  ></color-post>
                </div>
                <!--End: Choose Color Text-->
                <!--Start: Showing Image -->
                <div v-if="post.attachments && post.attachments.length > 0">
                  <div
                    v-if="this.$store.getters.errorPost === 'errors.js'"
                    class="text_danger"
                  >Bạn không thể tải lên quá 20 ảnh trong một bài viết.</div>
                  <div v-else>
                    <image-post :post="post"></image-post>
                  </div>
                </div>
                <!--End: Showing Image -->
              </div>
              <!-- End: Create and show content-->
              <!--Start: Show option-->
              <div
                class="d_flex align_items_center m_1 more py_2"
                @click="isShowMoreOption = !isShowMoreOption"
              >
                Thêm vào bài viết của bạn
                <div class="ml_auto">
                  <icon-base
                    class="icon--image mr_2"
                    icon-name="image"
                    width="18"
                    height="18"
                    viewBox="0 0 21 21"
                  >
                    <icon-image />
                  </icon-base>
                  <icon-base
                    class="icon--location mr_2"
                    icon-name="location"
                    width="18"
                    height="18"
                    viewBox="0 0 60 60"
                  >
                    <icon-location />
                  </icon-base>
                  <icon-base
                    class="icon--friend-tag"
                    icon-name="user"
                    width="20"
                    height="20"
                    viewBox="0 0 480 480"
                  >
                    <icon-friend-tag />
                  </icon-base>
                </div>
              </div>
              <!-- End: show option-->
              <transition name="popup--list">
                <!--Start: Show option when click-->
                <div v-if="isShowMoreOption === true" class="list" v-click-outside="closeMoreOption">
                  <div
                    class="item d_flex align_items_center"
                    :class="isActiveImage === true ? 'aqua_hidden' : ''"
                    @click="showOptionPostImages"
                  >
                    <label for="upload">
                      <icon-base
                        class="icon--image"
                        icon-name="image"
                        width="18"
                        height="18"
                        viewBox="0 0 21 21"
                      >
                        <icon-image />
                      </icon-base>
                      <span>Hình ảnh</span>
                    </label>
                    <form enctype="multipart/form-data" @submit.prevent="sendFile">
                      <input
                        id="upload"
                        hidden
                        type="file"
                        ref="file"
                        @change="selectFile(post._id)"
                        accept="image/x-png, image/gif, image/jpeg"
                        multiple
                      />
                    </form>
                  </div>
                  <div class="item d_flex align_items_center" @click="showOptionPostCheckin">
                    <icon-base
                      class="icon--location"
                      icon-name="location"
                      width="18"
                      height="18"
                      viewBox="0 0 60 60"
                    >
                      <icon-location />
                    </icon-base>
                    <span>Địa điểm</span>
                  </div>
                  <div class="item d_flex align_items_center" @click="showOptionPostTagsFriend">
                    <icon-base
                      class="icon--friend-tag"
                      icon-name="user"
                      width="20"
                      height="20"
                      viewBox="0 0 530 530"
                    >
                      <icon-friend-tag />
                    </icon-base>
                    <span>Gắn thẻ bạn bè</span>
                  </div>
                  <div class="item d_flex align_items_center" @click="showOptionPostActivity">
                    <icon-base
                      class="icon--smile"
                      icon-name="feelings"
                      width="20"
                      height="20"
                      viewBox="0 0 28 28"
                    >
                      <icon-smile />
                    </icon-base>
                    <span>Cảm xúc/Hoạt động</span>
                  </div>
                </div>
                <!--End: show option when click-->
              </transition>
            </div>
          </div>
          <!-- End: Post Content -->
        </div>
        <!-- Start: Transition -->
        <transition name="popup">
          <!-- Start: Activity -->
          <activity-post
            v-if="isShowActivity === true"
            :post="post"
            @sendPhoto="photo = $event"
            @closeActivity="isShowActivity = $event"
          ></activity-post>
          <!--End: Activity -->
          <!-- Start: Tag-->
          <tag-post
            v-if="isShowTag === true"
            :post="post"
            @updatePostTags="updatePostTags($event)"
            @closeTag="isShowTag = $event"
          ></tag-post>
          <!--End: Tag-->
          <!-- Start: Checkin-->
          <checkin-post
            v-if="isShowCheckIn === true"
            :post="post"
            @closeAddress="isShowCheckIn = $event"
            @updateCheckin="updateCheckin($event)"
          ></checkin-post>
          <!-- End: Checkin-->
        </transition>
        <!-- End: Transition -->
      </vue-perfect-scrollbar>
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
// @import "../index.style";
.wrapper {
  height: 100vh;
  width: 100vw;
  background-color: rgba(153, 153, 153, 0.4);
  bottom: 0;
  font-family: "Open Sans", sans-serif;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
  .content {
    height: 100%;
  }
  .modal--header {
    border-bottom: 1px solid #444;
    padding: 0.625rem 0;
    .arrow-down {
      transform: rotate(90deg);
      margin-left: 0.5rem;
    }
    .title {
      font-size: 1rem;
      margin: auto;
      font-weight: 600;
      text-align: center;
    }
  }
  .modal--scroll-edit {
    max-height: 97vh;
  }
}
</style>
