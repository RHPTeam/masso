<template>
  <div class="location mt_4">
    <div class="top font_weight_bold">
      Bạn có thể lựa chọn các tùy chỉnh dưới đây để đăng lên facebook
    </div>
    <div class="body">
      <div class="r">
        <div class="c_6">
          <div class="title mt_3 mb_2 font_weight_bold"> Chọn trang cá nhân bạn muốn đăng</div>
          <div class="item d_flex align_items_center mb_3">
            <div class="icon mr_2">
              <icon-base
                class="icon--page"
                height="20px"
                width="20px"
                viewBox="0 0 500 500"
              >
                <icon-page></icon-page>
              </icon-base>
            </div>
            <div class="content">
              <div class="main">
                <multiselect
                  class="tag--multi"
                  multiple
                  label="name"
                  placeholder="Chọn tài khoản cá nhân muốn đăng"
                  :clearable="false"
                  :value="convertNameFacebookAccount"
                  :options="allAccountFB"
                  @input="selectFacebookAccount"
                >
                  <template slot="option" slot-scope="option">
                    <div class="d_flex align_items_center">
                      <div style="height: 30px;width: 30px;border-radius: 50%;background-position: center;background-repeat: no-repeat;background-size: cover" :style="{ backgroundImage: 'url(' + option.userInfo.thumbSrc + ')' }"></div>
                      <div style="font-weight: 600; margin-left: .5rem;">{{ option.userInfo.name }}</div>
                    </div>
                  </template>
                </multiselect>
              </div>
            </div>
          </div>
          <div class="desc text_right mt_1 px_2">Bao gồm
            <span>{{ selectedGroups !== undefined && selectedGroups._groups !== undefined ? selectedGroups._groups.length : 0  }} tài khoản</span> được chọn.
          </div>
        </div>
        <div class="c_6">
          <div class="title mt_3 mb_2 font_weight_bold">Chọn nhóm đã lưu của</div>
          <div class="item d_flex align_items_center mb_3">
            <div class="icon mr_2">
              <icon-base
                class="icon--page"
                height="20px"
                width="20px"
                viewBox="0 0 500 500"
              >
                <icon-page></icon-page>
              </icon-base>
            </div>
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
          <div class="desc text_right mt_1 px_2">Bao gồm
            <span>{{ selectedGroups !== undefined && selectedGroups._pages !== undefined ? selectedGroups._pages.length : 0  }} trang</span> và
            <span>{{ selectedGroups !== undefined && selectedGroups._groups !== undefined ? selectedGroups._groups.length : 0  }} nhóm</span> được chọn.
          </div>
        </div>
      </div>
      <div class="r">
        <div class="c_6">
          <div class="title mt_3 mb_2 font_weight_bold">Chọn trang bạn muốn đăng</div>
          <div class="item d_flex align_items_center mb_3">
            <div class="icon mr_2">
              <icon-base
                class="icon--page"
                height="20px"
                width="20px"
                viewBox="0 0 500 500"
              >
                <icon-page></icon-page>
              </icon-base>
            </div>
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
          <div class="desc text_right px_2 mt_1">Bao gồm
            <span>{{ event.target_custom.filter( target => target.typeTarget === 1 ).length }} trang</span> được chọn.
          </div>
        </div>
        <div class="c_6">
          <div class="title mt_3 mb_2 font_weight_bold">Chọn nhóm bạn muốn đăng</div>
          <div class="item d_flex align_items_center mb_3">
            <div class="icon mr_2">
              <icon-base
                class="icon--group"
                height="22px"
                width="22px"
                viewBox="0 0 500 500"
              >
                <icon-group></icon-group>
              </icon-base>
            </div>
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
          <div class="desc text_right px_2 mt_1">Bao gồm
            <span>{{ event.target_custom.filter( target => target.typeTarget === 0 ).length }} nhóm</span> được chọn.
          </div>
        </div>
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
      return this.$store.getters.accountsFB;
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
    convertNameFacebookAccount(){
      return this.event.timeline.map( item => {
        if ( item ) {
          return {
            name: item.userInfo.name,
            id: item._id }
        }
      } );
    }
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
  },
  methods: {
    selectFacebookAccount(value){
      this.$store.dispatch("setEvent", {
        key: "timeline",
        value: value
      })
    },
    selectGroupFacebook( value ) {
      const groupListSelect = value.map( group => {
        return {
          typeTarget: 0,
          target: {
            groupId: group.groupId,
            name: group.name
          }
        };
      } );

      this.$store.dispatch( "setEventSpecial", {
        key: "target_custom",
        typeTarget: 0,
        value: groupListSelect
      } )
    },
    selectPageFacebook( value ) {
      const pageListSelect = value.map( page => {
        return {
          typeTarget: 1,
          target: {
            pageId: page.pageId,
            name: page.name
          }
        };
      } );

      this.$store.dispatch( "setEventSpecial", {
        key: "target_custom",
        typeTarget: 1,
        value: pageListSelect
      } );
    },
    selectFacebookGroup( value ) {
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
  .top {
  }
  .body {
    .item {
      width: 100%;
      .icon {
        width: 6%;
      }
      .content {
        width: 94%;
      }
    }
    .main {
      width: 100%;
      border: 1px solid #e4e4e4;
      border-radius: .625rem;
    }
  }
}
</style>
