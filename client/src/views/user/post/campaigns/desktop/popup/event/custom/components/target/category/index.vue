<template>
  <div class="group">
    <div class="title mt_3 mb_2">Chọn nhóm bạn muốn đăng</div>
    <div class="body">
      <div class="row--group">
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
        <div class="desc mt_1 px_2">Bao gồm
          <span>{{ selectedGroups !== {} && selectedGroups._pages !== undefined ? selectedGroups._pages.length : 0  }} trang</span> và
          <span>{{ selectedGroups !== {} && selectedGroups._groups !== undefined ? selectedGroups._groups.length : 0  }} nhóm</span> được chọn.
        </div>
      </div>
      <div class="mt_3">
        <new-feed />
      </div>
    </div>
  </div>
</template>

<script>
import NewFeed from "../newfeed";
export default {
  components: {
    NewFeed
  },
  data() {
    return {
      postTargetCategory: [],
      selectedGroups: {}
    }
  },
  computed: {
    event() {
      return this.$store.getters.event;
    },
    allPostGroups(){
      return this.$store.getters.postGroups;
    }
  },
  async created() {
    if ( this.allPostGroups.length === 0 ) {
      await this.$store.dispatch( "getAllPostGroups" );
    }
  },
  methods: {
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
  .group {
    .body {
      width: 100%;
      .title  {
        color: #666;
      }
      .row--group {
        width: 50%;
      }
      .main {
        // border: 1px solid $border-color;
        border: 1px solid #484848;
        border-radius: calc(.5rem + 2px);
      }
      .desc {
        color: #999;
        font-size: .825rem;
        span {
          color: #F7F7F7;
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
