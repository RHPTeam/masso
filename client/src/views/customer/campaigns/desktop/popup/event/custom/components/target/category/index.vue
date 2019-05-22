<template>
  <div class="group mb_2">
    <div class="body">
      <div class="title mb_2">Chọn nhóm bạn muốn đăng</div>
      <div class="main">
        <multiselect
          label="title"
          :value="event.target_category"
          :clearable="false"
          :options="groupPost"
          @input="selectGroupPost"
        />
      </div>
      <div class="bottom d_flex align_items_center mt_2">
        <label class="custom--checkbox mr_2">
          <input type="checkbox" />
        </label>
        <span>Chọn đăng lên trang cá nhân của bạn</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    event() {
      return this.$store.getters.event;
    },
    groupPost(){
      return this.$store.getters.postGroups;
    }
  },
  methods: {
    selectGroupPost( value ) {
      this.$store.dispatch( "setEvent", {
        key: "target_category",
        value: value._id
      } );
    }
  },
}
</script>

<style lang="scss" scoped>
  .group {
    .body {
      width: 50%;
      .title  {}
      .main {
        border: 1px solid $border-color;
        border-radius: calc(.5rem + 2px);
      }
      .desc {}
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
