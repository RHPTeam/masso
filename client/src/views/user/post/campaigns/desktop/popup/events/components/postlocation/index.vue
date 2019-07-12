<template>
  <div class="location mt_4">
    <div class="body">
      <div class="r">
        <!-- Start: Timeline -->
        <div class="c_6">
          <div class="title mt_3 mb_2 d_flex justify_content_between">
            <span class="text--bold">Chọn trang cá nhân</span>
            <span class="small">đã chọn {{ event.timeline.length }} tài khoản</span>
          </div>
          <div class="item d_flex align_items_start mb_3">
            <!--<div class="icon mr_3">
              <icon-base
                class="icon--timeline"
                height="28px"
                width="28px"
                viewBox="0 0 440 440"
              >
                <icon-timeline></icon-timeline>
              </icon-base>
            </div>-->
            <div class="content">
              <div class="main">
                <multiselect
                  multiple
                  label="name"
                  placeholder="Chọn trang cá nhân muốn đăng"
                  :value="event.timeline"
                  :options="allAccountFB"
                  @input="selectFacebookAccount"
                >
                  <template slot="option" slot-scope="option">
                    <div class="d_flex align_items_center">
                      <div style="height: 30px;width: 30px;border-radius: 50%;background-position: center;background-repeat: no-repeat;background-size: cover" :style="{ backgroundImage: 'url(' + option.thumbSrc + ')' }"></div>
                      <div style="font-weight: 600; margin-left: .5rem;">{{ option.name }}</div>
                    </div>
                  </template>
                </multiselect>
              </div>
            </div>
          </div>
        </div>
        <!-- End: Timeline -->
        <!-- Start: Post Group -->
        <div class="c_6">
          <div class="title mt_3 mb_2 d_flex justify_content_between">
            <span class="text--bold">Chọn nhóm đã lưu</span>
            <span class="small">đã chọn {{ selectedGroups !== undefined && selectedGroups._pages !== undefined ? selectedGroups._pages.length : 0  }} trang và
            {{ selectedGroups !== undefined && selectedGroups._groups !== undefined ? selectedGroups._groups.length : 0  }} nhóm</span>
          </div>
          <div class="item d_flex align_items_start mb_3">
            <!--<div class="icon mr_3">
              <icon-base
                class="icon--page"
                height="28px"
                width="28px"
                viewBox="0 0 24 24"
              >
                <icon-friend></icon-friend>
              </icon-base>
            </div>-->
            <div class="content">
              <div class="main">
                <multiselect
                  label="title"
                  placeholder="Chọn nhóm muốn đăng"
                  :value="event.target_category"
                  :clearable="false"
                  :options="allPostGroups"
                  @input="selectFacebookGroup"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Start: Post Group -->
      </div>
      <div class="r">
        <!-- Start: Pages -->
        <div class="c_6">
          <div class="title mt_3 mb_2 d_flex justify_content_between">
            <span class="text--bold">Chọn trang</span>
            <span class="small">đã chọn {{ event.target_custom.filter( target => target.typeTarget === 1 ).length }} trang</span>
          </div>
          <div class="item d_flex align_items_start mb_3">
            <!--<div class="icon mr_3">
              <icon-base
                class="icon--page"
                height="28px"
                width="28px"
                viewBox="0 0 500 500"
              >
                <icon-page></icon-page>
              </icon-base>
            </div>-->
            <div class="content">
              <div class="main">
                <multiselect
                  multiple
                  label="name"
                  placeholder="Chọn trang muốn đăng"
                  :value="convertTargetCustomPages"
                  :options="facebookPages"
                  @input="selectPageFacebook"
                >
                  <template slot="option" slot-scope="option">
                    <div class="d_flex align_items_center">
                      <div style="height: 30px;width: 30px;border-radius: 50%;background-position: center;background-repeat: no-repeat;background-size: cover" :style="{ backgroundImage: 'url(' + option.profile_picture + ')' }"></div>
                      <div style="font-weight: 600; margin-left: .5rem;">{{ option.name }}</div>
                    </div>
                  </template>
                </multiselect>
              </div>
            </div>
          </div>
        </div>
        <!-- End: Pages -->
        <!-- Start: Groups -->
        <div class="c_6">
          <div class="title mt_3 mb_2 d_flex justify_content_between">
            <span class="text--bold">Chọn nhóm trên facebook</span>
            <span class="small">đã chọn {{ event.target_custom.filter( target => target.typeTarget === 0 ).length }} nhóm </span>
          </div>
          <div class="item d_flex align_items_start mb_3">
            <!--<div class="icon mr_3">
              <icon-base
                class="icon--group"
                height="28px"
                width="28px"
                viewBox="0 0 500 500"
              >
                <icon-group></icon-group>
              </icon-base>
            </div>-->
            <div class="content">
              <div class="main">
                <multiselect
                  multiple
                  label="name"
                  placeholder="Chọn nhóm muốn đăng"
                  :value="convertTargetCustomGroups"
                  :options="facebookGroups"
                  @input="selectGroupFacebook"
                >
                  <template slot="option" slot-scope="option">
                    <div class="d_flex align_items_center">
                      <div style="height: 30px;width: 30px;border-radius: 50%;background-position: center;background-repeat: no-repeat;background-size: cover" :style="{ backgroundImage: 'url(' + option.profile_picture + ')' }"></div>
                      <div style="font-weight: 600; margin-left: .5rem;">{{ option.name }}</div>
                    </div>
                  </template>
                </multiselect>
              </div>
            </div>
          </div>
        </div>
        <!-- Enđ: Groups -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      custom: [],
      postTargetCategory: [],
      selectedGroups: {}
    }
  },
  computed: {
    allPostGroups(){
      return this.$store.getters.postGroups;
    },
    allAccountFB() {
      return this.$store.getters.facebookAccountMultiSelect;
    },
    event () {
      return this.$store.getters.event;
    },
    facebookGroups(){
      return this.$store.getters.facebookGroups;
    },
    facebookPages(){
      return this.$store.getters.facebookPages;
    },
    convertTargetCustomGroups() {
      return this.event.target_custom.filter(
        target => target.typeTarget === 0
      ).map( item => {
        if ( item.target ) {
          return {
            groupId: item.target.groupId,
            name: item.target.name }
        }
      } );
    },
    convertTargetCustomPages() {
      return this.event.target_custom.filter(
        target => target.typeTarget === 1
      ).map( item => {
        if ( item.target ) {
          return {
            pageId: item.target.pageId,
            name: item.target.name
          }
        }
      } );
    },
  },
  async created() {
    if ( this.facebookPages.length === 0 ) {
      await this.$store.dispatch( "getFacebookPages" );
    }
    if ( this.facebookGroups.length === 0 ) {
      await this.$store.dispatch( "getFacebookGroups" );
    }
    if ( this.allPostGroups.length === 0 ) {
      await this.$store.dispatch( "getAllPostGroups" );
    }
    if ( this.allAccountFB.length === 0 ) {
      await this.$store.dispatch( "getAccountsFB" );
    }

    // convert fb accounts in timeline
    const fbAcounts = this.event.timeline.map( ( account ) => {
      return {
        "_id": account._id,
        "name": account.userInfo.name,
        "thumbSrc": account.userInfo.thumbSrc
      };
    } );

    await this.$store.dispatch("setEvent", {
      key: "timeline",
      value: fbAcounts
    })
  },
  methods: {
    selectFacebookAccount(value){
      if(value) {
        this.$emit("setErrorLocation", false);
      }
      this.$store.dispatch("setEvent", {
        key: "timeline",
        value: value
      })
    },
    selectGroupFacebook( value ) {
      if(value) {
        this.$emit("setErrorLocation", false);
      }
      const groupListSelect = value.map( group => {
        return {
          typeTarget: 0,
          target: {
            groupId: group.groupId,
            name: group.name
          }
        };
      } );
      console.log(groupListSelect);
      this.$store.dispatch( "setEventSpecial", {
        key: "target_custom",
        typeTarget: 0,
        value: groupListSelect
      } )
    },
    selectPageFacebook( value ) {
      if(value) {
        this.$emit("setErrorLocation", false);
      }
      const pageListSelect = value.map( page => {
        return {
          typeTarget: 1,
          target: {
            pageId: page.pageId,
            name: page.name
          }
        };
      } );
      console.log(pageListSelect);
      this.$store.dispatch( "setEventSpecial", {
        key: "target_custom",
        typeTarget: 1,
        value: pageListSelect
      } );
    },
    selectFacebookGroup( value ) {
      if(value) {
        this.$emit("setErrorLocation", false);
      }
      this.selectedGroups = value;
      this.$store.dispatch( "setEvent", {
        key: "target_category",
        value: {
          _id: value._id,
          title: value.title
        }
      } );
    }
  },
}
</script>

<style lang="scss" scoped>
.location {
  .text--bold {
    color: #ccc;
    font-weight: 600;
  }
  .top {
  }
  .body {
    .item {
      width: 100%;
      .content {
        width: 100%;
      }
    }
    .main {
      width: 100%;
      border: 1px solid #444;
      border-radius: .625rem;
    }
  }
  .title {
    span.small {
      font-size: 12px;
    }
  }
}
</style>
