<template>
  <div class="page">
    <div class="mb_3">Tùy chọn đăng vào các nhóm và trang mà bạn có mặt trên facebook.</div>
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
              :value="selectedFbPages"
              :options="facebookPages"
              @input="selectFacebookPage"
            />
          </div>
          <div class="desc px_2 mt_1">Bao gồm
            <span>{{ selectedFbPages.length }} trang</span> được chọn.
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
              :value="selectedFbGroups"
              :options="facebookGroups"
              @input="selectFacebookGroup"
            />
          </div>
          <div class="desc px_2 mt_1">Bao gồm
            <span>{{ selectedFbGroups.length }} nhóm</span> được chọn.
          </div>
        </div>
      </div>
      <!-- End: Groups Selected -->
    </div>
    <div class="bottom mt_3">
      <timeline></timeline>
    </div>
  </div>
</template>

<script>
import Timeline from "../timline";

export default {
  components: {
    Timeline
  },
  data() {
    return {
      custom: [],
      selectedFbPages: [],
      selectedFbGroups: []
    }
  },
  computed: {
    facebookGroups(){
      return this.$store.getters.facebookGroups;
    },
    facebookPages(){
      return this.$store.getters.facebookPages;
    }
  },
  methods: {
    selectFacebookGroup( value ) {
      this.selectFacebookGroup = value;
    },
    selectFacebookPage( value ) {
      this.selectFacebookPage = value;
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
