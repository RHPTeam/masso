<template>
  <div class="page">
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
              :value="event.target_custom.filter( target => target.typeTarget === 1 ).map( item => { if( item.target ) { return { pageId: item.target.pageId, name: item.target.name } } } )"
              :options="facePagePost"
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
              :value="event.target_custom.filter( target => target.typeTarget === 0 ).map( item => { if( item.target ) { return { groupId: item.target.groupId, name: item.target.name } } } )"
              :options="faceGroupPost"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      custom: []
    }
  },
  computed: {

    event () {
      return this.$store.getters.event;
    },
    faceGroupPost(){
      return this.$store.getters.facebookGroups;
    },
    facePagePost(){
      return this.$store.getters.facebookPages;
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
        value: pageListSelect
      } );
    }
  },
}
</script>

<style lang="scss" scoped>
.page {
  .item {
    .content {
      flex: 1;
      .main {
        border: 1px solid $border-color;
        border-radius: calc(.5rem + 2px);
      }
      .desc {
        color: #999;
        font-size: .825rem;
        span {
          color: #666;
          font-weight: 600;
        }
      }
    }
    .icon {
      width: 22px;
      svg {
        margin-top: 10px;
      }
      .icon--group {
        color: #666;
        stroke: #666;
        stroke-width: 8;
      }
      .icon--page {
        color: #6e6e6e;
        margin-left: 4px;
      }
    }
  }
  .bottom {
    .custom--checkbox {
      input[type="checkbox"] {
        border-radius: 6px;
        border: solid 1.5px #cccccc;
        cursor: pointer;
        height: 20px;
        outline: none;
        width: 20px;
        -webkit-appearance: none;
        -moz-appearance: none;
        &:checked {
          background-color: #ffb94a;
          border: solid 1px #ffb94a;

          &:before {
            border-bottom: 2px solid #fff;
            border-right: 2px solid #fff;
            content: "";
            display: block;
            height: 10px;
            position: relative;
            left: 50%;
            top: 42%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 7px;
          }
        }
      }
    }
  }
}
</style>
