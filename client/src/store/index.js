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
import AccountFacebook from "./modules/accountfacebook.store";

/**
 * Store for Page Chat
 */
import AttributeStore from "./modules/chat/attribute.store";
import BlockStore from "./modules/chat/block.store";
import GroupFriend from "./modules/chat/groupfriend.store";
import MessengerStore from "./modules/chat/messenger.store";
import SequenceFaceBook from "./modules/chat/sequence.store";
import Syntax from "./modules/chat/syntax.store";
import VocateStore from "./modules/chat/vocate.store";

/**
 * Store for Page Post
 */
import AnalysisStore from "./modules/post/analytic.store";
import BroadcastStore from "./modules/chat/broadcast.store";
import CampaignsStore from "./modules/post/campaign.store";
import CampaignDefaultStore from "./modules/post/campaigndefault.store";
import CategoriesStore from "./modules/post/category.store";
import CategoriesDefaultStore from "./modules/post/categorydefault.store";
import EventsStore from "./modules/post/event.store";
import FeedStore from  "./modules/post/feed.store";
import FacebookStore from "./modules/post/facebook.store";
// import GroupBlock from "./modules/chat/groupblock.store"; // Disable GroupBlock Store due to duplicate of function in Block Store
import GroupFacebook from "./modules/post/groupfacebook.store";
import PageFacebook from "./modules/post/pagefacebook.store";
import PostStore from "./modules/post/post.store";
import PostSchedule from "./modules/post/postschedule.store";
import PostFacebookStore from "./modules/post/postfacebook.store";
import PostGroupStore from "./modules/post/postgroup.store";
import HelpStore from "./modules/post/help.store";

// ------ Action cursor Store for post in mobile
import ActionCursorStore from "./modules/post/cursor.store";

/**
 * Store for Agency
 */
import AgencyStore from "./modules/agency.store";

      //  ---------- POST



export default new Vuex.Store( {
  modules: {
    /**
     * Store Ganeral
     */
    AccountStore,
    DashBoard,
    FacebookFriend,
    AccountFacebook,
    /**
     * Store for Page Chat
     */
    AttributeStore,
    BlockStore,
    GroupFriend,
    MessengerStore,
    SequenceFaceBook,
    Syntax,
    VocateStore,
    /**
     * Store for Page Post
     */
    AnalysisStore,
    BroadcastStore,
    CampaignsStore,
    CampaignDefaultStore,
    CategoriesStore,
    CategoriesDefaultStore,
    EventsStore,
    FacebookStore,
    FeedStore,
    GroupFacebook,
    PageFacebook,
    PostStore,
    PostSchedule,
    PostFacebookStore,
    PostGroupStore,
    // GroupBlock,
    ActionCursorStore,
    HelpStore,
    /**
     * Store for Agency
     */
    AgencyStore
    //  ---------- POST
  }
} );
