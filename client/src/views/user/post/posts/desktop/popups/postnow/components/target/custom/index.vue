<template>
  <div class="page">
    <div class="mb_3">Chọn Fanpage Facebook bạn muốn đăng</div>
    <div class="body">
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
              label="name"
              placeholder="Chọn Fanpage Facebook muốn đăng"
              :clearable="false"
              v-model="postSchedule._fanpageId"
              :options="facebookPages"
              @input="selectFacebookPage"
            />
          </div>
        </div>
      </div>
      <!-- End: Groups Selected -->
    </div>
  </div>
</template>

<script>
import Timeline from "../timline";

export default {
  props: ["postSchedule"],
  data() {
    return {
      custom: [],
      selectedFbPages: []
    }
  },
  computed: {
    facebookPages(){
      return this.$store.getters.facebookPages;
    }
  },
  async created(){
    await this.$store.dispatch( "getFacebookPages" );
  },
  methods: {
    async selectFacebookPage() {
      await this.$emit( "openTimer", true );
      delete (this.postSchedule._facebookId);
      delete (this.postSchedule._groupId);
      this.$emit( "updatePostSchedule", this.postSchedule );
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
