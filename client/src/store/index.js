import Vue from "vue";
import Vuex from "vuex";
Vue.use( Vuex );

// Help Module
import AccountStore from "./modules/account.store";
import AccountFacebookStore from "./modules/post/accoutfacebook.store";
import AttributeStore from "./modules/chat/attribute.store";
import CampaignsStore from "./modules/post/campaign.store";
import CategoriesStore from "./modules/post/category.store";
import DashBoard from "./modules/layout";
import EventsStore from "./modules/post/event.store";
import FeedStore from  "./modules/post/feed.store";
import FacebookCookie from "./modules/chat/facebookCookie.store";
import FacebookFriend from "./modules/post/friendfacebook.store";
import FacebookStore from "./modules/post/facebook.store";
import GroupFacebook from "./modules/post/groupfacebook.store";
import GroupFriend from "./modules/chat/groupfriend.store";
import PageFacebook from "./modules/post/pagefacebook.store";
import PostStore from "./modules/post/post.store";
import PostGroupStore from "./modules/post/postgroup.store";
import AnalysisStore from "./modules/post/analytic.store";
import SequenceFaceBook from "./modules/chat/sequence.store";
import Block from "./modules/chat/block.store";
import Syntax from "./modules/chat/syntax.store";

export default new Vuex.Store( {
  modules: {
    AccountStore,
    AccountFacebookStore,
    AttributeStore,
    CampaignsStore,
    CategoriesStore,
    DashBoard,
    EventsStore,
    FacebookCookie,
    FacebookFriend,
    FacebookStore,
    FeedStore,
    GroupFacebook,
    PageFacebook,
    PostStore,
    PostGroupStore,
    AnalysisStore,
    SequenceFaceBook,
    Block,
    Syntax,
    GroupFriend
  }
} );
