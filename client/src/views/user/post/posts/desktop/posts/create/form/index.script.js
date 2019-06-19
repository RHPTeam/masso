import ColorPost from "./color/index";
import ImagePost from "./images/index";
import TagPost from "./tag/index";
import CheckinPost from "./checkin/index";
import ActivityPost from "./activity/index";
import PostNowPopup from "../../../popups/postnow";

import StringFunction from "@/utils/functions/string";

let typingTimer;

export default {
  components: {
    ColorPost,
    ImagePost,
    TagPost,
    CheckinPost,
    ActivityPost,
    PostNowPopup
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
      isShowMoreOption: false,
      isActiveImage: false,
      isShowChangeScrape: false,
      isShowPostNowPopup: false
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
    // Get Post by Id
    post() {
      if(Object.entries(this.$store.getters.post).length === 0 && this.$store.getters.post.constructor === Object) return;
      return this.$store.getters.post;
    },
    placesPopular(){
      return this.$store.getters.places;
    },
    //Get Categories
    categories() {
      return this.$store.getters.allCategories;
    },
    //Get friends Facebook
    friendFb() {
      if(Object.entries(this.$store.getters.allFriend).length === 0 && this.$store.getters.allFriend.constructor === Object) return;
      return this.$store.getters.allFriend;
    },
    // Get 12 first item from more color
    randomColor() {
      if(this.colorFb && this.colorFb.length > 0) {
        return this.colorFb[2].textFormats.slice(0, 11);
      }
    },
    // Get friends from item 1 to end
    moreFriend(){
      if(this.post && this.post.tags && this.post.tags.length > 0) {
        return this.post.tags.slice(1);
      }
    },
    checkColor: function () {
      return this.post.color === undefined || this.post.color.length === 0;
    }

  },
  async created (){
    const infoStatus = this.$store.getters.statusOnePost;
    const infoCateDefault = this.$store.getters.infoPostCateDefault;
    const statusCateDefault = this.$store.getters.statusPostCateDefault;
    if (infoCateDefault === 0 && infoStatus !== 'success') {
      await this.$store.dispatch( "getPostById", this.$route.params.id );
    } else if(infoCateDefault === 1 && statusCateDefault !== "success") {
      await this.$store.dispatch( "showPostDuplicate", this.$route.params.id );
    }

    await this.$store.dispatch( "getAllFriendFb" );
    await this.$store.dispatch( "getPlaceFromFb" );
    await this.$store.dispatch( "getAllCategories" );
    await this.$store.dispatch( "getActivityFb" );
    await this.$store.dispatch( "getColorFromFb" );
    },
  watch: {
    /**
     * check contetn of post using StringFunction get urls have in content
     * If length content > 200 character delete color of post
     */
    "post.content"( value ) {
      //check scrape
      this.linkContent = StringFunction.detectUrl(value);
      // this.$store.dispatch( "updatePost", this.post  );
      // this.post.content = StringFunction.urlify(value);
      if( this.post.color && this.post.color.value !== '' && value.length >= 200 ) {
        this.isShowColor = false;
        delete this.post.color;
        this.$store.dispatch( "updatePostColor", this.post );
        // this.$store.dispatch( "updatePost", this.post );
      } else {
        // this.$store.dispatch( "updatePost", this.post );
      }
    }
  },
  methods: {
    /**
     * [changeResultContentColor description]
     * @param  {[Boolean]} val [true]
     * @description attach content to contetn color and open modules content color then hidden choose option images for post.
     */
    changeResultContentColor( val ){
      this.isActiveImage = val;
    },
    chooseLinkContent( val ){
      this.post.scrape = val;
      this.$store.dispatch( "updatePost", this.post );
      this.isShowChangeScrape = false
    },
    // Update categories post
    updateCate() {
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
    },
    showOptionPostCheckin(){
      this.isShowTag = false;
      this.isShowActivity = false;
      this.isShowCheckIn = true;
    },
    showOptionPostTagsFriend(){
      this.isShowActivity = false;
      this.isShowCheckIn = false;
      this.isShowTag = true;
    },
    /**
     * [showOptionPostActivity description]
     * @return {[type]} [description]
     */
    showOptionPostActivity(){
      this.isShowTag = false;
      this.isShowCheckIn = false;
      this.isShowActivity = true;
    },
    changeContentDefault() {
      this.$store.dispatch("setPostDefault", {
        key: "color",
        value: ""
      });
      this.$store.dispatch( "updatePostColor", this.post );
    },
    showOptionPostImages(){
      this.isShowColor = false;
      delete this.post.color;
      this.isShowImage = true;
    },
    // Change background when choose background from component colors
    changeBgColor ( ev ) {
      this.bgColorActive = ev;
    },
    // Update post when click button Save
    savePost(){
      this.$store.dispatch( "updatePost", this.post );
      this.$router.push( { name: "post_posts" } );
      this.$store.dispatch("setPostCateDefault", 0);
    },
    //update post and post now
    async saveAndPostNow(){
      await this.$store.dispatch( "updatePost", this.post );
      this.isShowPostNowPopup = true;
    },
    // Select file images
    selectFile( id ) {
      this.file = this.$refs.file.files;
      this.sendFile( id );

      // reset ref
      const input = this.$refs.file;
      input.type = 'text';
      input.type = 'file';

      this.$store.dispatch("setPostDefault", {
        key: "color",
        value: ""
      });
      this.$store.dispatch( "updatePostColor", this.post );
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
