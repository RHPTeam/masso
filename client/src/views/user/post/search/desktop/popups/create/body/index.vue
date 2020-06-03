<template>
  <div class="wrapper position_relative px_4" :data-theme="currentTheme">
    <div>
      <!-- Start: Post Title -->
      <div class="item mb_4">
        <span>Tên bài viết</span>
        <input type="text" class="input mt_2" placeholder="Nhập tên bài viết" v-model="post.title" @keydown="clear" />
      </div>
      <!-- End: Post Title -->
      <!-- Start: Post Categories -->
      <div class="item">
        <span>Danh mục</span>
        <div class="item--categories mt_2">
          <multiselect
            label="title"
            multiple
            v-model="post._categories"
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
                <span class="">
                  <span v-if="post.tags && post.tags.length > 0 ||
                              post.activity ||
                              post.place "
                  > — </span>
                  <!--Start: Show activity -->
                  <span class="pl_1">
                    <span v-if="post.activity === undefined || post.activity === ''"></span>
                    <span v-else class="">
                      <span>đang</span>
                      <img class="emoji" :src="post.activity.id.photo" alt>
                      <span class="feel">{{post.activity.typeActivity.text}} </span>
                      <span class="text_other"
                            @click="showOptionPostActivity"
                      >{{ post.activity.text }}</span>
                      <span v-if="post.tags && post.tags.length !== 0 "> cùng </span>
                    </span>
                  </span>
                  <!--End: Show activity -->
                  <!--Start: Show tag friends-->
                  <span>
                    <span v-if="post.tags && post.tags.length === 0"></span>
                    <span v-else>
                        <!--Start:  If tag 1 friends-->
                        <span class="result" v-if="post.tags && post.tags.length === 1">
                          <span>với </span>
                          <span class="text--orange"
                                v-if="post.tags"
                                @click="showOptionPostTagsFriend"
                          >
                            {{ post.tags[0].text }}
                          </span>
                        </span>
                      <!--End: If tag 1 friends-->
                      <!--Start: If tags over 1 friends-->
                        <span v-else class="result">
                          <span>với <span class="text--orange"
                                          v-if="post.tags"
                                          @click="showOptionPostTagsFriend"
                          >
                            {{ post.tags[0].text }}
                          </span></span>
                          <span class="more--other position_relative ml_1">
                            <span>và </span>
                            <span class="text--orange" v-if="post.tags">{{ post.tags.length - 1 }}</span>
                            <span> người khác</span>
                            <div class="more--friend position_absolute">
                              <div class="more--wrap">
                                <div class="more--item" v-for="(item, index) in moreFriend" :key="`f-${index}`"> {{ item.text }} </div>
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
                      <span>tại </span>
                      <span class="text--orange"
                            @click="showOptionPostCheckin"
                      >{{ post.place.text }}</span></span>
                  </span>
                  <!--End: Show check in -->
                </span>
              </div>
              <!--End: Show tag and check in-->
            </div>
            <!--End: Content Default-->
            <!--Start: Content Choose Color-->
            <div
              v-else
              :style="post.color.value"
              id="content--special"
            >
              <div class="content--special d_flex align_items_center justify_content_center p_4 position_relative">

                <div class="close position_absolute" @click="changeContentDefault">
                  <icon-base
                    class="ic--close"
                    icon-name="close"
                    width="20"
                    height="20"
                    viewBox="0 0 35 35"
                  >
                    <icon-close/>
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
                >
                </color-post>
              </div>
              <!--End: Choose color text-->
              <!--Start: Show tag and check in-->
              <div class="tagger--summary mb_1 p_2">
                <span class="">
                  <span v-if="post.tags && post.tags.length > 0 ||
                              post.activity ||
                              post.place "
                  > — </span>
                  <!--Start: Show activity -->
                  <span class="pl_1">
                    <span v-if="post.activity === undefined || post.activity === ''"></span>
                    <span v-else class="">
                      <span>đang</span>
                      <img class="emoji" :src="post.activity.id.photo" alt>
                      <span class="feel">{{post.activity.typeActivity.text}} </span>
                      <span class="text_other"
                            @click="showOptionPostActivity"
                      >{{ post.activity.text }}</span>
                      <span v-if="post.tags && post.tags.length !== 0 "> cùng </span>
                    </span>
                  </span>
                  <!--End: Show activity -->
                  <!--Start: Show tag friends-->
                  <span>
                    <span v-if="post.tags && post.tags.length === 0"></span>
                    <span v-else>
                        <!--Start:  If tag 1 friends-->
                        <span class="result" v-if="post.tags && post.tags.length === 1">
                          <span>với </span>
                          <span class="text--orange"
                                v-if="post.tags"
                                @click="showOptionPostTagsFriend"
                          >
                            {{ post.tags[0].text }}
                          </span>
                        </span>
                      <!--End: If tag 1 friends-->
                      <!--Start: If tags over 1 friends-->
                        <span v-else class="result">
                          <span>với <span class="text--orange"
                                          v-if="post.tags"
                                          @click="showOptionPostTagsFriend"
                          >
                            {{ post.tags[0].text }}
                          </span></span>
                          <span class="more--other position_relative ml_1">
                            <span>và </span>
                            <span class="text--orange" v-if="post.tags">{{ post.tags.length - 1 }}</span>
                            <span> người khác</span>
                            <div class="more--friend position_absolute">
                              <div class="more--wrap">
                                <div class="more--item" v-for="(item, index) in moreFriend" :key="`f-${index}`"> {{ item.text }} </div>
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
                      <span>tại </span>
                      <span class="text--orange"
                            @click="showOptionPostCheckin"
                      >{{ post.place.text }}</span></span>
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
              >
              </color-post>
            </div>
            <!--End: Choose Color Text-->
            <!--Start: Showing Image -->
            <div v-if="post.attachments && post.attachments.length > 0">
              <div v-if="this.$store.getters.errorPost === 'errors.js'" class="text_danger">
                Bạn không thể tải lên quá 20 ảnh trong một bài viết.
              </div>
              <div v-else>
                <image-post
                  :post="post"
                  @updatePostAttachments="post.attachments = $event"
                ></image-post>
              </div>
            </div>
            <!--End: Showing Image -->
          </div>
          <!-- End: Create and show content-->
          <!-- Start: Activity -->
          <activity-post v-if="isShowActivity === true" :post="post" @sendPhoto="photo = $event" @closeActivity="isShowActivity = $event"></activity-post>
          <!--End: Activity -->
          <!-- Start: Tag-->
          <tag-post
            v-if="isShowTag === true"
            :post="post"
            @updatePostTags="updatePostTags($event)"
          ></tag-post>
          <!--End: Tag-->
          <!-- Start: Checkin-->
          <checkin-post
            v-if="isShowCheckIn === true"
            :post="post"
            @closeCheckin="isShowCheckIn = $event"
            @updateCheckin="updateCheckin($event)"
          ></checkin-post>
          <!-- End: Checkin-->
          <!--Start: Show option-->
          <ul
            class="list d_flex align_items_center justify_content_between mb_0 pl_0 m_1"
            v-if="isShowMoreOption === false"
          >
            <li
              class="item d_flex align_items_center"
              @click="showOptionPostImages"
            >
              <label for="upload--images">
                <icon-base
                  class="icon--image"
                  icon-name="image"
                  width="18"
                  height="18"
                  viewBox="0 0 21 21"
                >
                  <icon-image/>
                </icon-base>
                <span>Hình ảnh</span>
              </label>
              <form enctype="multipart/form-data" @submit.prevent="sendFile">
                <input id="upload--images" hidden type="file"
                       ref="file"
                       @change="selectFile(post._id)"
                       accept="image/x-png,image/gif,image/jpeg" multiple />
              </form>
            </li>
            <li class="item d_flex align_items_center" @click="showOptionPostCheckin">
              <icon-base
                class="icon--location"
                icon-name="location"
                width="18"
                height="18"
                viewBox="0 0 60 60"
              >
                <icon-location/>
              </icon-base>
              <span>Địa điểm</span>
            </li>
            <li class="item d_flex align_items_center" @click="showOptionPostTagsFriend">
              <icon-base
                class="icon--friend-tag"
                icon-name="user"
                width="20"
                height="20"
                viewBox="0 0 530 530"
              >
                <icon-friend-tag/>
              </icon-base>
              <span>Gắn thẻ bạn bè</span>
            </li>
            <li class="item more d_flex align_items_center justify_content_between" @click="isShowMoreOption = true">
              <div class="d_flex align_items_center justify_content_center mx_auto">
                <div class="dots"></div>
                <div class="dots"></div>
                <div class="dots"></div>
              </div>
            </li>
          </ul>
          <!-- End: show option-->
          <!--Start: Show option when click-->
          <div v-if="isShowMoreOption === true" class="m_1">
            <div class="list show d_flex align_items_center">
              <div class="item d_flex align_items_center"
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
                    <icon-image/>
                  </icon-base>
                  <span>Hình ảnh</span>
                </label>
                <form enctype="multipart/form-data" @submit.prevent="sendFile">
                  <input id="upload" hidden type="file" ref="file" @change="selectFile(post._id)" accept="image/x-png,image/gif,image/jpeg" multiple />
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
                  <icon-location/>
                </icon-base>
                <span>Địa điểm</span>
              </div>
            </div>
            <div class="list show d_flex align_items_center">
              <div class="item d_flex align_items_center" @click="showOptionPostTagsFriend">
                <icon-base
                  class="icon--friend-tag"
                  icon-name="user"
                  width="20"
                  height="20"
                  viewBox="0 0 530 530"
                >
                  <icon-friend-tag/>
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
                  <icon-smile/>
                </icon-base>
                <span>Cảm xúc/Hoạt động</span>
              </div>
            </div>
          </div>
          <!--End: show option when click-->
        </div>
      </div>
      <!-- End: Post Content -->
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style";
</style>
