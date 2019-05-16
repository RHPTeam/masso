<template>
  <div class="wrapper py_4 px_3" :data-theme="currentTheme">
    <div v-if="post">
      <div class="item mb_4">
        <span>Tên bài viết</span>
        <input type="text" class="input mt_2" placeholder="Nhập tên bài viết" v-model="post.title" @keyup="updateTitlePost(post)" @keydown="clear" />
      </div>

      <div class="item mb_4">
        <span>Danh mục</span>
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

      <div class="item mb_4">
        <span>Nội dung</span>
        <div class="wrap mt_2">
          <!--Start: Create and show content-->
          <div class="content position_relative">
            <!--Start: Content Default-->
            <div v-if="post.color === undefined || post.color === ''" class="p_2">
              <contenteditable
                tag="div"
                class="description"
                :contenteditable="statusContentEditable"
                :noHTML="statusNoHTML"
                v-model="post.content"
                placeholder="Cập nhật nội dung bài viết"
                @click="showOptionColor"
              />

              <!--Start: Show tag and check in-->
              <div class="mb_1 p_2">
                <div class="d_flex align_items_center" v-if="nameFriend.length > 0">
                  <span> — </span>
                  <!--Start: Show activity -->
                  <div class="ml_1">
                    <div v-if="post.activity === undefined || post.activity === ''"></div>
                    <div v-else class="d_flex align_items_center">
                      Đang <div class="emoji" :style="{backgroundImage: 'url('+ photo +')'}"></div> {{activityFeelName}}  <span class="text_other mx_1">{{ post.activity.text }}</span> cùng
                    </div>
                  </div>
                  <!--End: Show activity -->
                  <!--Start: Show tag friend-->
                  <div class="ml_1">
                    <div v-if="post.tags.length === 0"></div>
                    <div v-else>
                        <!--Start:  If tag 1 friend-->
                        <div class="result" v-if="nameFriend.length === 1">với <span>{{ nameFriend[0] }}</span></div>
                        <!--End: If tag 1 friend-->
                        <!--Start: If tags over 1 friend-->
                        <div v-else class="result d_flex align_items_center">
                          <div>với <span>{{ nameFriend[0] }}</span></div>
                          <div class="more--other position_relative ml_1">
                            và <span> {{ nameFriend.length - 1 }} người khác</span>
                            <div class="more--friend position_absolute">
                              <div class="more--wrap">
                                <div class="more--item" v-for="(item, index) in moreFriend" :key="`f-${index}`"> {{ item }} </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--End: If tags over 1 friend-->
                    </div>
                  </div>
                  <!--End: Show tag friend-->

                  <!--Start: Show check in -->
                  <div class="ml_1">
                    <div v-if="post.place === '' || post.place === undefined"></div>
                    <div v-else class="result">tại <span>{{ post.place }}</span></div>
                  </div>
                  <!--End: Show check in -->
                </div>
              </div>
              <!--End: Show tag and check in-->
            </div>
            <!--End: Content Default-->

            <!--Start: Content Choose Color-->
            <div
              v-else
              :style="post.color"
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
              <div class="color">
                <color-post
                  class="px_2 py_1"
                  :randomColor="randomColor"
                  :colorFb="colorFb"
                  @changeBgColor="changeBgColor($event)"></color-post>
              </div>
              <!--End: Choose color text-->
              <!--Start: Show tag and check in-->
              <div class="d_flex align_items_center pb_3">
                <span> — </span>
                <!--Start: Show activity -->
                <div class="ml_1">
                  <div v-if="post.activity === undefined || post.activity === ''"></div>
                  <div v-else class="d_flex align_items_center">
                    Đang <div class="emoji" :style="{backgroundImage: 'url('+ photo +')'}"></div> {{activityFeelName}}  <span class="text_other mx_1">{{ post.activity.text }}</span> cùng
                  </div>
                </div>
                <!--End: Show activity -->
                <!--Start: Show tag friend-->
                <div class="ml_1" v-if="nameFriend.length > 0">
                  <div v-if="nameFriend.length === 0"></div>
                  <div v-else>
                    <!--Start:  If tag 1 friend-->
                    <div class="result" v-if="nameFriend.length === 1">với <span>{{ nameFriend[0] }}</span></div>
                    <!--End: If tag 1 friend-->
                    <!--Start: If tags over 1 friend-->
                    <div v-else class="result d_flex align_items_center">
                      <div>với <span>{{ nameFriend[0] }}</span></div>
                      <div class="more--other position_relative ml_1">
                        và <span> {{ nameFriend.length - 1 }} người khác</span>
                        <div class="more--friend position_absolute">
                          <div class="more--wrap">
                            <div class="more--item" v-for="(item, index) in moreFriend" :key="`f-${index}`"> {{ item }} </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--End: If tags over 1 friend-->
                  </div>
                </div>
                <!--End: Show tag friend-->

                <!--Start: Show check in -->
                <div class="ml_1">
                  <div v-if="post.place === '' || post.place === undefined"></div>
                  <div v-else class="result">tại <span>{{ post.place }}</span></div>
                </div>
                <!--End: Show check in -->
              </div>
              <!--End: Show tag and check in-->
            </div>
            <!--End: Content Choose Color-->

            <!--Start: Choose color text-->
            <div class="color" v-if="isShowColor === true">
              <color-post
                class="px_2 py_1"
                @turnOff="isShowColor = $event"
                @openContentColor="changeResultContentColor($event)"
                :randomColor="randomColor"
                :colorFb="colorFb"
                :post="post"
                @changeBgColor="changeBgColor($event)"></color-post>
            </div>
            <!--End: Choose color text-->
            <!--Start:  show image when add-->
            <div v-if="post.attachments && post.attachments.length > 0">
              <div v-if="this.$store.getters.errorPost === 'error'" class="text_danger">
                Bạn không thể tải lên quá 20 ảnh trong một bài viết.
              </div>
              <div v-else>
                <image-post :post="post"/>
              </div>
            </div>
            <!--End:  show image when add-->
          </div>
          <!-- End: Create and show content-->
          <!-- Start: Activity -->
          <activity-post v-if="isShowActivity === true" :post="post" @sendPhoto="photo = $event"></activity-post>
          <!--End: Activity -->
          <!-- Start: Tag-->
          <tag-post v-if="isShowTag === true" :post="post"></tag-post>
          <!--End: Tag-->
          <!-- Start: Checkin-->
          <checkin-post v-if="isShowCheckIn === true" :post="post"></checkin-post>
          <!-- End: Checkin-->
          <!--Start: Show option-->
          <ul
            class="list d_flex align_items_center justify_content_between mb_0 pl_0 mt_2"
            v-if="isShowMoreOption === false"
          >
            <li class="item d_flex align_items_center" @click="showOptionPostImages">
              <label for="upload--images">
                <icon-base
                  class="icon--upload-image"
                  icon-name="upload-image"
                  width="20"
                  height="20"
                  viewBox="0 0 21 21"
                >
                  <icon-upload-image/>
                </icon-base>
                <span>Hình ảnh</span>
              </label>
              <form enctype="multipart/form-data" @submit.prevent="sendFile">
                <input id="upload--images" hidden type="file" ref="file" @change="selectFile(post._id)" accept="image/x-png,image/gif,image/jpeg" multiple />
              </form>
            </li>
            <li class="item d_flex align_items_center" @click="showOptionPostCheckin">
              <icon-base
                class="icon--location"
                icon-name="location"
                width="20"
                height="20"
                viewBox="0 0 60 60"
              >
                <icon-location/>
              </icon-base>
              <span>Địa điểm</span>
            </li>
            <li class="item d_flex align_items_center" @click="showOptionPostTagsFriend">
              <icon-base
                class="icon--user"
                icon-name="user"
                width="20"
                height="20"
                viewBox="0 0 23 23"
              >
                <icon-user/>
              </icon-base>
              <span>Bạn bè</span>
            </li>
            <li class="item more d_flex align_items_center justify_content_between" @click="isShowMoreOption = true">
              <div class="d_flex align_items_center">
                <div class="dots"></div>
                <div class="dots"></div>
                <div class="dots"></div>
              </div>
            </li>
          </ul>
          <!-- End: show option-->
          <!--Start: Show option when click-->
          <div v-if="isShowMoreOption === true">
            <div class="list show d_flex align_items_center mt_2">
              <div class="item d_flex align_items_center" :class="isActiveImage === true ? 'aqua_hidden' : ''" @click="showOptionPostImages">
                <label for="upload">
                  <icon-base
                    class="ic--search"
                    icon-name="upload-image"
                    width="20"
                    height="20"
                    viewBox="0 0 21 21"
                  >
                    <icon-upload-image/>
                  </icon-base>
                  <span>Hình ảnh</span>
                </label>
                <form enctype="multipart/form-data" @submit.prevent="sendFile">
                  <input id="upload" hidden type="file" ref="file" @change="selectFile(post._id)" accept="image/x-png,image/gif,image/jpeg" multiple />
                </form>
              </div>
              <div class="item d_flex align_items_center" @click="showOptionPostCheckin">
                <icon-base
                  class="ic--search"
                  icon-name="location"
                  width="20"
                  height="20"
                  viewBox="0 0 60 60"
                >
                  <icon-location/>
                </icon-base>
                <span>Địa điểm</span>
              </div>
            </div>
            <div class="list show d_flex align_items_center mt_1">
              <div class="item d_flex align_items_center" @click="showOptionPostTagsFriend">
                <icon-base
                  class="ic--search"
                  icon-name="user"
                  width="20"
                  height="20"
                  viewBox="0 0 23 23"
                >
                  <icon-user/>
                </icon-base>
                <span>Bạn bè</span>
              </div>
              <div class="item d_flex align_items_center" @click="showOptionPostActivity">
                <icon-base
                  class="ic--search"
                  icon-name="feelings"
                  width="20"
                  height="20"
                  viewBox="0 0 28 28"
                >
                  <icon-smile/>
                </icon-base>
                <span>Cảm xúc</span>
              </div>
            </div>
          </div>
          <!--End: show option when click-->
        </div>
      </div>
      <!--Start: Show share link user used content -->
      <div>
        <div v-if="post.scrape === undefined"></div>
        <div v-else class="item mb_4">
          <span>Link chia sẻ đang sử dụng</span>
          <div class="mt_2">Bạn đang chia sẻ link dưới đây trong bài viết. </div>
          <div class="wrap p_2 mt_2">
            <div class="link d_flex align_items_center">
              <label class="link--name py_1">
                {{ post.scrape }}
              </label>
              <input type="radio" checked name="link" />
            </div>
          </div>
        </div>
      </div>
      <!--End: Show share link user used content -->

      <!--Start: if array link content dont undefined-->
      <div v-if="linkContent">
        <div v-if="linkContent.length > 0" class="item mb_4">
          <span>Link chia sẻ</span>
          <div class="mt_2">Bạn chỉ có thể sử dụng 1 link chia sẻ trong bài viết, hãy cân nhắc trước khi lựa chọn. </div>
          <div class="wrap p_2 mt_2">
            <div class="link d_flex align_items_center" v-for="(item, index) in linkContent" :key="`l-${index}`">
              <label class="link--name py_1" for="radio1">
                {{ item }}
              </label>
              <input type="radio" id="radio1" name="link" @click="chooseLinkContent(item)" />
            </div>
          </div>
        </div>
      </div>
      <!--End: if array link content dont undefined-->
      <div class="item" @click="savePost">
        <button>Lưu</button>
      </div>
    </div>
  </div>
</template>


<script src="./index.script.js">

</script>

<style lang="scss" scoped>
@import "./index.style";
.aqua_hidden {
  opacity: .5;
}
.emoji {
  min-width: 0;
  max-width: 25px;
  height: 25px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 4px;
}
.result {
  span {
    color: $orange !important;
    cursor: pointer;
  }
  .more--other {
    color: #000;
    &:hover, &:focus, &:active, &:visited {
      >.more--friend {
        display: block;
      }
    }
  }
  .more--friend {
    background-color: $blackLight;
    border: 1px solid $border-color;
    border-radius: 6px;
    color: $grayLight;
    display: none;
    top: 100%;
    right: 0;
    width: 150px;
    z-index: 99;
    .more--item {
      padding: 4px 8px;
    }
  }
}
#content--special {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
