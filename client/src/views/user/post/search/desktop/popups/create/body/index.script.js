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
  props: [ "fbPost" ],
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
      return this.$store.getters.defaultPost;
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
    // Get Data
    await this.$store.dispatch( "getAllFriendFb" );
    await this.$store.dispatch( "getPlaceFromFb" );
    await this.$store.dispatch( "getAllCategories" );
    await this.$store.dispatch( "getActivityFb" );
    await this.$store.dispatch( "getColorFromFb" );
  },
  watch: {
    /**
     * Check content of post using StringFunction get urls have in content
     * If length content > 200 character delete color of post
     */
    "post.content"( value ) {
      //check scrape
      this.linkContent = StringFunction.detectUrl(value);
      // this.$store.dispatch( "updatePost", this.post  );
      // this.post.content = StringFunction.urlify(value);
      if( value.length >= 200 ) {
        this.isShowColor = false;
        delete this.post.color;
        this.$store.dispatch( "updatePost", this.post );
      } else {
        this.$store.dispatch( "updatePost", this.post );
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
    // updateCate( value ) {
    //   this.$store.dispatch( "updatePost", this.post );
    // },
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
    updateCheckin( val ) {
      this.post.place = val;
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
