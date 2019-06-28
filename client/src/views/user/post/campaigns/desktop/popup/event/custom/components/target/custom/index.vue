<template>
  <div class="page">
    <div class="title mb_3">Tùy chọn đăng vào các nhóm và trang mà bạn có mặt trên facebook.</div>
    <div class="body">
      <!-- Start: Pages Selected -->
      <div class="item d_flex mb_3">
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
            />
          </div>
          <div class="desc px_2 mt_1">Bao gồm
            <span>{{ event.target_custom.filter( target => target.typeTarget === 1 ).length }} trang</span> được chọn.
          </div>
        </div>
      </div>
      <!-- End: Pages Selected -->
      <!-- Start: Groups Selected -->
      <div class="item d_flex ">
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
            />
          </div>
          <div class="desc px_2 mt_1">Bao gồm
            <span>{{ event.target_custom.filter( target => target.typeTarget === 0 ).length }} nhóm</span> được chọn.
          </div>
        </div>
      </div>
      <!-- End: Groups Selected -->
    </div>
    <div class="bottom mt_3">
      <new-feed />
    </div>
  </div>
</template>

<script>
import NewFeed from "../newfeed"
export default {
  components: {
    NewFeed
  },
  data() {
    return {
      custom: []
    }
  },
  computed: {
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
    }
  },
  async created() {
    if ( this.facebookPages.length === 0 ) {
      await this.$store.dispatch( "getFacebookPages" );
    }
    if ( this.facebookGroups.length === 0 ) {
      await this.$store.dispatch( "getFacebookGroups" );
    }
  },
  methods: {
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
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
