<template>
  <div class="wrapper py_4 px_3" :data-theme="currentTheme">
    <div class="item mb_4">
      <span>Tên bài viết</span>
      <input type="text" class="input" placeholder="Nhập tên bài viết" v-model="name">
    </div>

    <div class="item mb_4">
      <span>Danh mục</span>
      <multiselect
        class="mt_3"
        multiple
        @input="update"
        v-model="listCategories"
        :options="nameCategories"
        :maxHeight="200"
        placeholder="Chọn danh mục"
      />
    </div>

      <div class="item mb_4">
        <span>Nội dung</span>
        <div class="wrap">
          <!--        Start: Create and show content-->
          <div class="content">
            <div v-if="openContentColor === false" class="p_2">
              <contenteditable
                tag="div"
                class="description"
                :contenteditable="true"
                v-model="content"
                placeholder="Cập nhật nội dung bài viết"
                @click="showOptionColor"
              />
            </div>

            <div v-if="openContentColor === true" id="content--special" class="content--special position_relative d_flex align_items_center justify_content_center p_4" :style="{ backgroundColor: 'red' }">
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
                v-model="contentColor"
                placeholder="Cập nhật nội dung bài viết color"
              />
            </div>
            <div class="mb_1 p_2">_ với Ai đó tại đâu đó</div>
            <!--          Start: Choose color text-->
            <color-post class="p_2" v-if="isShowColor === true" @turnOff="isShowColor = $event" @openContentColor="openContentColor = $event" />
            <!--          End: Choose color text-->
            <!--        Start:  show image when add-->
            <image-post v-if="isShowImage === true" />
            <!--        End:  show image when add-->
          </div>
          <!--        End: Create and show content-->
          <!--          Start: Tag-->
          <tag-post v-if="isShowTag === true" />
          <!--          End: Tag-->
          <!--          Start: Checkin-->
          <checkin-post v-if="isShowCheckIn === true" />
          <!--          End: Checkin-->
          <!--        Start: Show option-->
          <ul class="list d_flex align_items_center justify_content_between mb_0 pl_0 mt_2" v-if="isShowMoreOption === false">
            <li class="item d_flex align_items_center" @click="isShowImage = true">
              <icon-base
                class="ic--search"
                icon-name="upload-image"
                width="20"
                height="20"
                viewBox="0 0 21 21"
              >
                <icon-upload-image />
              </icon-base>
              <span>Đăng ảnh</span>
            </li>
            <li class="item d_flex align_items_center" @click="isShowCheckIn = true">
              <icon-base
                class="ic--search"
                icon-name="location"
                width="20"
                height="20"
                viewBox="0 0 60 60"
              >
                <icon-location />
              </icon-base>
              <span>Địa điểm</span>
            </li>
            <li class="item d_flex align_items_center" @click="isShowTag = true">
              <icon-base
                class="ic--search"
                icon-name="user"
                width="20"
                height="20"
                viewBox="0 0 23 23"
              >
                <icon-user />
              </icon-base>
              <span>Bạn bè</span>
            </li>
            <li class="item more d_flex align_items_center" @click="showOptionColor">
              <div class="d_flex align_items_center">
                <div class="dots"></div>
                <div class="dots"></div>
                <div class="dots"></div>
              </div>
            </li>
          </ul>
          <!--        End: show option-->
          <!--        Start: Show option-->
          <div v-if="isShowMoreOption === true">
            <div class="list show d_flex align_items_center mt_2">
              <div class="item d_flex align_items_center" @click="isShowImage = true">
                <icon-base
                  class="ic--search"
                  icon-name="upload-image"
                  width="20"
                  height="20"
                  viewBox="0 0 21 21"
                >
                  <icon-upload-image />
                </icon-base>
                <span>Đăng ảnh</span>
              </div>
              <div class="item d_flex align_items_center" @click="isShowCheckIn = true">
                <icon-base
                  class="ic--search"
                  icon-name="location"
                  width="20"
                  height="20"
                  viewBox="0 0 60 60"
                >
                  <icon-location />
                </icon-base>
                <span>Địa điểm</span>
              </div>
            </div>
            <div class="list show d_flex align_items_center mt_1">
              <div class="item d_flex align_items_center" @click="isShowTag = true">
                <icon-base
                  class="ic--search"
                  icon-name="user"
                  width="20"
                  height="20"
                  viewBox="0 0 23 23"
                >
                  <icon-user />
                </icon-base>
                <span>Bạn bè</span>
              </div>
              <div class="item d_flex align_items_center" @click="isShowTag = true">
                <icon-base
                  class="ic--search"
                  icon-name="feelings"
                  width="20"
                  height="20"
                  viewBox="0 0 28 28"
                >
                  <icon-smile />
                </icon-base>
                <span>Cảm xúc</span>
              </div>
            </div>
          </div>
          <!--        End: show option-->
        </div>
      </div>
    <div class="item">
      <button>Lưu</button>
    </div>
  </div>
</template>


<script>

import ColorPost from "./color";
import ImagePost from "./images";
import TagPost from "./tag";
import CheckinPost from "./checkin";
export default {
  data() {
    return {
      name: "",
      content: "",
      contentColor: "",
      openContentColor: false,
      listCategories: [],
      isShowColor: false,
      dataColor: [

      ],
      isShowImage: false,
      isShowTag: false,
      isShowCheckIn: false,
      isShowMoreOption: false
    };
  },
  async created() {
    await this.$store.dispatch( "getAllCategories" );
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    posts() {
      return this.$store.getters.post;
    },
    categories() {
      return this.$store.getters.categories;
    },
    nameCategories() {
      let result = [];

      this.categories.map( ( item ) => {
        if ( item.title !== "" ) {
          result.push( item.title );
        }
      } );
      return result;
    }
  },

  methods: {
    update() {
      // console.log( this.listCategories );
    },
    showOptionColor() {
      this.isShowColor = true;
      this.isShowMoreOption = true;
    },
    changeContentDefault() {
      this.openContentColor = false;
      this.content = this.contentColor;
    }
  },
  watch: {
    contentColor( value ) {
      if ( value.length >= 200 ) {
        this.openContentColor = false;
        this.content = this.contentColor;
      } else {
        this.openContentColor = true;
        this.contentColor = this.content;
      }
    }
  },
  components: {
    ColorPost,
    ImagePost,
    TagPost,
    CheckinPost
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
