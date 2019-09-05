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
 * Store for Page Post
 */
import AnalysisStore from "./modules/post/analytic.store";
import CampaignsStore from "./modules/post/campaign.store";
import CampaignDefaultStore from "./modules/post/campaigndefault.store";
import CategoriesStore from "./modules/post/category.store";
import CategoriesDefaultStore from "./modules/post/categorydefault.store";
import EventsStore from "./modules/post/event.store";
import FeedStore from  "./modules/post/feed.store";
import FacebookStore from "./modules/post/facebook.store";
import GroupFacebook from "./modules/post/groupfacebook.store";
import PageFacebook from "./modules/post/pagefacebook.store";
import PostStore from "./modules/post/post.store";
import PostSchedule from "./modules/post/postschedule.store";
import PostFacebookStore from "./modules/post/postfacebook.store";
import PostGroupStore from "./modules/post/postgroup.store";
import HelpStore from "./modules/post/help.store";
import WizardStore from "./modules/post/wizard.store";

// ------ Action cursor Store for post in mobile
import ActionCursorStore from "./modules/post/cursor.store";

/**
 * Store for Agency
 */
import AgencyStore from "./modules/agency.store";
import ExpireCodeStore from "./modules/code.store";

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
     * Store for Page Post
     */
    AnalysisStore,
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
    WizardStore,
    /**
     * Store for Agency
     */
    AgencyStore,
    ExpireCodeStore
    //  ---------- POST
  }
} );
