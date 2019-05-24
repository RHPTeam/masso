<template>
  <div class="page mb_2">
    <div class="body d_flex align_items_center">
      <div class="item mr_2">
        <!--<div class="title mb_2">Chọn nhóm bạn muốn đăng</div>-->
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
      <div class="item ml_2">
        <!--<div class="title mb_2">Chọn trang bạn muốn đăng</div>-->
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
      console.log( value );
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
    width: 50%;
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
