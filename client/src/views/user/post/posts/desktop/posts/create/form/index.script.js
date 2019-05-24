import ColorPost from "./color/index";
import ImagePost from "./images/index";
import TagPost from "./tag/index";
import CheckinPost from "./checkin/index";
import ActivityPost from "./activity/index";

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
      isActiveImage: false
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
      return this.$store.getters.allCategories;
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
        let arr =  arrIcon.navigation(item => {
          if( item.uid == result ) return item.photo;
        });
        return arr[0].photo;
      }
    },*/
    // Get name item activity
    // activityFeelName() {
    //   let result = this.post.activity.typeActivity;
    //   let newStr = result.slice( 4 );
    //   let str = newStr.split(".");
    //   return str[0];
    // }
  },
  watch: {
    /**
     * check contetn of post using StringFunction get urls have in content
     * If length content > 200 character delete color of post
     */
    "post.content"( value ) {
      //check scrape
      // this.linkContent = StringFunction.detectUrl(value);
      // // this.$store.dispatch( "updatePost", this.post  );
      // // this.post.content = StringFunction.urlify(value);
      // if( value.length >= 200 ) {
      //   this.isShowColor = false;
      //   delete this.post.color;
      //   this.$store.dispatch( "updatePost", this.post );
      // } else {
      //   this.$store.dispatch( "updatePost", this.post );
      // }
    }
  },
  async created() {
    await this.$store.dispatch( "getPostById", this.$route.params.id );
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
    },
    // Update categories post
    updateCate( value ) {
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
      this.post.color = "";
      this.$store.dispatch( "updatePost", this.post );
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
      this.$router.push( { name: "posts" } );
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
