import ColorPost from "./components/color/index";
import ImagePost from "./components/images/index";
import TagPost from "./components/tag/index";
import CheckinPost from "./components/checkin/index";
import ActivityPost from "./components/activity/index";

import StringFunction from "@/utils/functions/string";

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
      bgColorActive: "background-color: #ff0000",
      contentColor: "",
      file: "",
      linkContent: [],
      listCategories: [],
      name: "",
      openContentColor: false,
      photo: null,
      statusContentEditable: true,
      statusNoHTML: false,
      isShowColorControl: false,
      isShowColor: false,
      isShowImage: false,
      isShowTag: false,
      isShowCheckIn: false,
      isShowActivity: false,
      isShowMoreOption: false,
      isActiveImage: false,
      isShowChangeScrape: false,
      isShowPostNowPopup: false,
      isShowAlertContent: false,
      isShowAlertTitle: false,
      isShowAlertCategory: false
    };
  },
  computed: {
    activity() {
      return this.$store.getters.activity;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    //Get background from Facebook
    colorFb() {
      return this.$store.getters.colorFb;
    },
    placesPopular() {
      return this.$store.getters.places;
    },
    postAttachmentsUpload() {
      return this.$store.getters.postAttachmentsUpload;
    },
    //Get Categories
    categories() {
      return this.$store.getters.allCategories;
    },
    //Get friends Facebook
    friendFb() {
      if (Object.entries(this.$store.getters.allFriend).length === 0 && this.$store.getters.allFriend.constructor === Object) return;
      return this.$store.getters.allFriend;
    },
    // Get 12 first item from more color
    randomColor() {
      if (this.colorFb && this.colorFb.length > 0) {
        return this.colorFb[2].textFormats.slice(0, 11);
      }
    },
    // Get friends from item 1 to end
    moreFriend() {
      if (this.post && this.post.tags && this.post.tags.length > 0) {
        return this.post.tags.slice(1);
      }
    },
    checkColor: function () {
      return this.post.color === undefined || this.post.color.length === 0;
    },
    post() {
      return this.$store.getters.post;
    }
  },
  async created() {
    // Get Data
    await this.$store.dispatch("getAllFriendFb");
    await this.$store.dispatch("getPlaceFromFb");
    await this.$store.dispatch("getAllCategories");
    await this.$store.dispatch("getActivityFb");
    await this.$store.dispatch("getColorFromFb");
  },
  watch: {
    "post.content"(value) {
      if (value.length > 0) {
        this.isShowAlertContent = false;
      }
    },
    "post.title"(value) {
      if (value.length > 0) {
        this.isShowAlertTitle = false;
      }
    }
  },
  methods: {
    // Change background when choose background from component colors
    changeBgColor(ev) {
      this.bgColorActive = ev;
    },
    changeContentDefault() {
      this.post.color = "";
    },
    clear() {
      clearTimeout(typingTimer);
    },
    closePopup() {
      this.$emit("closePopup", false);
      const dataSender = {
        size: 25,
        page: 1
      };
      this.$store.dispatch("getPostsByPage", dataSender);
    },
    /**
     * [changeResultContentColor description]
     * @param  {[Boolean]} val [true]
     * @description attach content to contetn color and open modules content color then hidden choose option images for post.
     */
    changeResultContentColor(val) {
      this.isActiveImage = val;
    },
    chooseLinkContent(val) {
      this.post.scrape = val;
      this.$store.dispatch("updatePost", this.post);
      this.isShowChangeScrape = false
    },
    closeMoreOption() {
      this.isShowMoreOption = false;
    },
    showOptionColor() {
      this.isShowColor = true;
    },
    showOptionPostCheckin() {
      this.isShowTag = false;
      this.isShowActivity = false;
      this.isShowCheckIn = true;
      this.isShowMoreOption = false;
    },
    showOptionPostTagsFriend() {
      this.isShowActivity = false;
      this.isShowCheckIn = false;
      this.isShowTag = true;
      this.isShowMoreOption = false;
    },
    savePost() {
      if (this.post.content.trim().length === 0) {
        this.isShowAlertContent = true;
      } else if (this.post.title.trim().length === 0) {
        this.isShowAlertTitle = true;
      } else if (this.post._categories.length === 0) {
        this.isShowAlertCategory = true;
      } else {
        if (this.linkContent.length > 0) {
          this.post.scrape = this.linkContent[0];
        }
        this.$store.dispatch("updatePost", this.post);
        // this.$store.dispatch("setPostCateDefault", 0);
        this.closePopup();
      }
    },
    showOptionPostActivity() {
      this.isShowTag = false;
      this.isShowCheckIn = false;
      this.isShowActivity = true;
      this.isShowMoreOption = false;
    },
    showOptionPostImages() {
      this.isShowColor = false;
      delete this.post.color;
      this.isShowImage = true;
    },
    // Select file images
    selectFile() {
      this.file = this.$refs.file.files;
      this.sendFile();

      // reset ref
      const input = this.$refs.file;
      input.type = 'text';
      input.type = 'file';

      this.post.color = "";
    },
    // Upload image
    async sendFile() {
      this.isShowMoreOption = false;
      const formData = new FormData();
      Array.from(this.file).forEach((f) => {
        formData.append("attachments", f)
      });

      await this.$store.dispatch("uploadPostAttachments", formData);
      const uploadFiles = this.postAttachmentsUpload.map((item) => {
        return {
          link: item,
          typeAttachment: 1
        }
      });
      this.post.attachments = this.post.attachments.concat(uploadFiles);
    },
    // Update categories post
    updateCate() {
      this.$store.dispatch("updatePost", this.post);
    },
    updateTitlePost(value) {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(this.updateTitle(value), 8000);
    },
    // Update title post
    updateTitle(value) {
      this.$store.dispatch("updatePost", value);
    },
    updateCheckin(val) {
      this.post.place = val;
    },
    updatePostTags(val) {
      const tags = val.map((item) => {
        return {
          uid: item.uid,
          text: item.text
        }
      });
      this.post.tags = tags;
    }
    /**
     * [showOptionPostActivity description]
     * @return {[type]} [description]
     */

  }
};
