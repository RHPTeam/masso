<template>
  <div class="wrapper py_4 px_3" :data-theme="currentTheme">
    <div></div>
    <div>
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
            <div v-if="openContentColor === false" class="p_2">
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
                <!-- <div v-if="nameFriend.length === 0"></div>-->
                <div class="d_flex align_items_center">
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
              v-if="openContentColor === true"
              :style="bgColorActive"
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
                  v-model="contentColor"
                  placeholder="Cập nhật nội dung bài viết color"
                />

              </div>
              <!--Start: Choose color text-->
              <div class="color">
                <color-post
                  class="px_2 py_1"
                  :randomColor="randomColor"
                  :colorFb="colorFb"
                  @changeBgColor="changeBgColor($event)"
                />
              </div>
              <!--End: Choose color text-->
              <!--Start: Show tag and check in-->
              <div class="d_flex align_items_center mb_1 p_2">
                <div class="result">_ với <span>Ai đó</span></div>
                <div class="result">_ tại <span>đâu đó</span></div>
              </div>
              <!--End: Show tag and check in-->
            </div>
            <!--End: Content Choose Color-->

            <!--Start: Choose color text-->
            <div class="color" v-if="isShowColor === true">
              <color-post
                class="px_2 py_1"
                @turnOff="isShowColor = $event"
                @openContentColor="openContentColor = $event"
                :randomColor="randomColor"
                :colorFb="colorFb"
                :post="post"
                @changeBgColor="changeBgColor($event)"
              />
            </div>
            <!--End: Choose color text-->
            <!--Start:  show image when add-->
            <div v-if="post.attachments.length > 0">
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
          <tag-post v-if="isShowTag === true" :post="post"/>
          <!--End: Tag-->
          <!-- Start: Checkin-->
          <checkin-post v-if="isShowCheckIn === true" :post="post"/>
          <!-- End: Checkin-->
          <!--Start: Show option-->
          <ul
            class="list d_flex align_items_center justify_content_between mb_0 pl_0 mt_2"
            v-if="isShowMoreOption === false"
          >
            <li class="item d_flex align_items_center" @click="isShowImage = true">
              <label for="upload--images">
                <icon-base
                  class="ic--search"
                  icon-name="upload-image"
                  width="20"
                  height="20"
                  viewBox="0 0 21 21"
                >
                  <icon-upload-image/>
                </icon-base>
                <span>Đăng ảnh</span>
              </label>
              <form enctype="multipart/form-data" @submit.prevent="sendFile">
                <input id="upload--images" hidden type="file" ref="file" @change="selectFile(post._id)" accept="image/x-png,image/gif,image/jpeg" multiple />
              </form>
            </li>
            <li class="item d_flex align_items_center" @click="isShowCheckIn = true">
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
            </li>
            <li class="item d_flex align_items_center" @click="isShowTag = true">
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
            </li>
            <li class="item more d_flex align_items_center" @click="showOptionColor">
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
              <div class="item d_flex align_items_center" @click="isShowImage = true">
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
                  <span>Đăng ảnh</span>
                </label>
                <form enctype="multipart/form-data" @submit.prevent="sendFile">
                  <input id="upload" hidden type="file" ref="file" @change="selectFile(post._id)" accept="image/x-png,image/gif,image/jpeg" multiple />
                </form>
              </div>
              <div class="item d_flex align_items_center" @click="isShowCheckIn = true">
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
              <div class="item d_flex align_items_center" @click="isShowTag = true">
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
              <div class="item d_flex align_items_center" @click="isShowActivity = true">
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
      <div>
        <div v-if="linkContent.length === 0"></div>
        <div v-else class="item mb_4">
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


<script>
import ColorPost from "./color";
import ImagePost from "./images";
import TagPost from "./tag";
import CheckinPost from "./checkin";
import ActivityPost from "./activity";

import StringFunction from "@/utils/string.util";

let typingTimer;

export default {
  components: {
    ColorPost,
    ImagePost,
    TagPost,
    CheckinPost,
    ActivityPost
  },
  data() {
    return {
      statusContentEditable: true,
      statusNoHTML: false,
      name: "",
      linkContent: [],
      contentColor: "",
      openContentColor: false,
      bgColorActive: "background-color: #ff0000",
      listCategories: [],
      file: "",
      photo: null,
      isShowColorControl: false,
      isShowColor: false,
      isShowImage: false,
      isShowTag: false,
      isShowCheckIn: false,
      isShowActivity: false,
      isShowMoreOption: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    //Get background from Facebook
    colorFb() {
      return this.$store.getters.colorFb;
    },
    // Get Post by Id
    post() {
      if(Object.entries(this.$store.getters.post).length === 0 && this.$store.getters.post.constructor === Object) return;
      return this.$store.getters.post;
    },
    //Get Categories
    categories() {
      if(Object.entries(this.$store.getters.categories).length === 0 && this.$store.getters.categories.constructor === Object) return;
      return this.$store.getters.categories;
    },
    //Get friend Facebook
    friendFb() {
      if(Object.entries(this.$store.getters.allFriend).length === 0 && this.$store.getters.allFriend.constructor === Object) return;
      return this.$store.getters.allFriend;
    },
    // Get 12 first item from more color
    randomColor() {
      return this.colorFb[2].textFormats.slice(0, 11);
    },
    // Get name friend from uid item tags of post
    nameFriend(){
      let result = this.post.tags;
      if( result === undefined || result === "" ) {
        return result = [];
      } else {
        const results = [];
        let arrOther = this.friendFb;
        result.map( uid => {
          return arrOther.map( item => {
            if( item.uid == uid ) results.push( item.text );
          } );
        } );
        return results;
      }
    },
    // Get friend from item 1 to end
    moreFriend(){
      return this.nameFriend.slice(1);
    },
    /*listIconActivity() {
      if ( this.$store.getters.listActivity === undefined ) return;
      return this.$store.getters.listActivity;
    },
    iconActivity() {
      let result = this.post.activity.id;
      let arrIcon = this.listIconActivity;
      if (arrIcon === undefined) {
        return;
      } else {
        let arr =  arrIcon.filter(item => {
          if( item.uid == result ) return item.photo;
        });
        return arr[0].photo;
      }
    },*/
    // Get name item activity
    activityFeelName() {
      let result = this.post.activity.typeActivity;
      // console.log(result);
      let newStr = result.slice( 4 );
      // console.log(newStr);
      let str = newStr.split(".");
      return str[0];
    }
  },
  watch: {
    "post.content"( value ) {
      //check scrape
      this.linkContent = StringFunction.detectUrl(value);
      // this.$store.dispatch( "updatePost", this.post  );
      // this.post.content = StringFunction.urlify(value);
      if( value.length >= 200 ) {
        this.isShowColor = false;
        this.post.color = "";
        this.$store.dispatch( "updatePost", this.post );
      } else {
        console.log(1);
      }
    },
    contentColor( value ) {
      if ( value.length >= 200 ) {
        this.openContentColor = false;
        this.content = this.contentColor;
        this.post.color = "";
        this.$store.dispatch( "updatePost", this.post );
      }
    }
  },
  async created() {
    await this.$store.dispatch( "getColorFromFb" );
  },

  methods: {
    chooseLinkContent( val ){
      this.post.scrape = val;
      this.$store.dispatch( "updatePost", this.post );
    },
    // Update categories post
    updateCate( value ) {
      console.log( value );
      this.$store.dispatch( "updatePost", this.post );
    },
    updateTitlePost( value ){
      clearTimeout( typingTimer );
      typingTimer = setTimeout(this.updateTitle( value ), 8000);
    },
    clear(){
      clearTimeout( typingTimer );
    },
    // Update title post
    updateTitle( value ){
      this.$store.dispatch( "updatePost", value );
    },
    showOptionColor() {
      this.isShowColor = true;
      this.isShowMoreOption = true;
    },
    changeContentDefault() {
      this.openContentColor = false;
      this.content = this.contentColor;
    },
    // Change background when choose background from component colors
    changeBgColor ( ev ) {
      this.bgColorActive = ev;
    },
    // Update post when click button Save
    savePost(){
      this.$store.dispatch( "updatePost", this.post );
    },
    // Select file images
    selectFile( id ) {
      this.file = this.$refs.file.files;
      this.sendFile( id );
    },
    // Update file images to post
    sendFile() {
      const formData = new FormData();
      Array.from( this.file ).forEach(( f ) => {
        formData.append( "attachments", f )
      });
      const objSender = {
        id: this.post._id,
        formData: formData
      };
      if( objSender.formData.length > 20  ) {
        this.$store.dispatch( "sendErrorUpdate" );
      } else {
        this.$store.dispatch( "updateAttachmentPost", objSender );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
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
