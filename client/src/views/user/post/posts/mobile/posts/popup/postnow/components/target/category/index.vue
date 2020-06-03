<template>
  <div class="group">
    <div class="title mt_3 mb_2">Chọn Group Facebook bạn muốn đăng</div>
    <div class="body">
      <div class="row--group">
        <div class="main">
          <multiselect
            label="name"
            placeholder="Chọn group facebook muốn đăng"
            v-model="postSchedule._groupId"
            :clearable="false"
            :options="fbGroups"
            @input="selectPostGroup"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["postSchedule"],
  data() {
    return {
      selectedPostGroup: []
    }
  },
  computed: {
    fbGroups(){
      return this.$store.getters.facebookGroups;
    }
  },
  async created(){
    await this.$store.dispatch("getFacebookGroups");
  },
  methods: {
    async selectPostGroup( value ) {
        await this.$emit( "openTimer", true );

      delete (this.postSchedule._facebookId);
      delete (this.postSchedule._fanpageId);
      this.$emit( "updatePostSchedule", this.postSchedule );
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
        width: 100%;
      }
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
