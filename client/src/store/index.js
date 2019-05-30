import Vue from "vue";
import Vuex from "vuex";
Vue.use( Vuex );

// Help Module
/**
 * Store Ganeral
 */
import DashBoard from "./modules/layout";
import AccountStore from "./modules/account.store";
import FacebookFriend from "./modules/friendfacebook.store";

/**
 * Store for Page Chat
 */
import AttributeStore from "./modules/chat/attribute.store";
<<<<<<< HEAD
import Block from "./modules/chat/block.store";
import FacebookCookie from "./modules/chat/facebookCookie.store";
import GroupFriend from "./modules/chat/groupfriend.store";
import SequenceFaceBook from "./modules/chat/sequence.store";
import Syntax from "./modules/chat/syntax.store";

/**
 * Store for Page Post
 */
import AccountFacebookStore from "./modules/post/accoutfacebook.store";
import AnalysisStore from "./modules/post/analytic.store";
=======
import BroadcastStore from "./modules/chat/broadcast.store";
>>>>>>> dev-yendt-vue
import CampaignsStore from "./modules/post/campaign.store";
import CategoriesStore from "./modules/post/category.store";
import EventsStore from "./modules/post/event.store";
import FeedStore from  "./modules/post/feed.store";
import FacebookStore from "./modules/post/facebook.store";
import GroupFacebook from "./modules/post/groupfacebook.store";
import PageFacebook from "./modules/post/pagefacebook.store";
import PostStore from "./modules/post/post.store";
import PostFacebookStore from "./modules/post/postfacebook.store";
import PostGroupStore from "./modules/post/postgroup.store";



export default new Vuex.Store( {
  modules: {
    /**
     * Store Ganeral
     */
    AccountStore,
    DashBoard,
    FacebookFriend,
    /**
     * Store for Page Chat
     */
    AttributeStore,
<<<<<<< HEAD
    Block,
    FacebookCookie,
    GroupFriend,
    SequenceFaceBook,
    Syntax,
    /**
     * Store for Page Post
     */
    AccountFacebookStore,
    AnalysisStore,
=======
    BroadcastStore,
>>>>>>> dev-yendt-vue
    CampaignsStore,
    CategoriesStore,
    EventsStore,
    FacebookStore,
    FeedStore,
    GroupFacebook,
    PageFacebook,
    PostStore,
    PostFacebookStore,
    PostGroupStore
  }
} );
