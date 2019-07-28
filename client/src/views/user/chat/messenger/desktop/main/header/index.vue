<template>
  <div class="header" role="main" :data-theme="currentTheme">
    <!-- Start: If create new chat-->
    <div class="top d_flex align_items_center" v-if="variableControl.new === true">
      <div class="" role="to">Đến:</div>
      <div role="right" aria-label="option friends">
        <multiselect
          class="style-chooser"
          label="fullName"
          placeholder="Nhập tên của một người hoặc nhóm"
        />
      </div>
    </div>
    <!-- End: If create new chat-->
    <div class="bottom d_flex align_items_center justify_content_between" v-else>
      <div class="left d_flex align_items_center">
        <div role="image" :style="{ backgroundImage: 'url('+ srcTest +')' }"></div>
        <div role="name">Chat zinbee</div>
      </div>
      <div class="right d_flex align_items_center">
        <div class="icon mr_3" @click="toggleRightSidebar">
          <icon-base
            icon-name="menu"
            width="24"
            height="24"
            viewBox="0 0 18 18"
          >
            <icon-info />
          </icon-base>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [ "status", "currentTheme" ],
  data() {
    return {
      srcTest: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg"
    }
  },
  computed: {
    variableControl(){
      return this.$store.getters.caseControl;
    }
  },
  methods: {
    toggleRightSidebar() {
      if(this.status === false) {
        this.$emit("toggleRightSidebar", true);
      } else {
        this.$emit("toggleRightSidebar", false);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.header[role="main"] {
  box-sizing: border-box;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  position: relative;
  text-align: center;
  z-index: 201;
  align-items: center;
  border-bottom: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .10);
  display: flex;
  height: 60px;
  justify-content: space-between;
  .top {
    width: 100%;
    div[role="to"] {

    }
    div[role="right"] {
      width: 40%;
    }
  }
  .bottom {
    width: 100%;
    .left {
      > div[role="image"] {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 50%;
        height: 40px;
        margin-right: .5rem;
        width: 40px;
      }
      div[role="name"] {
        font-weight: 700;
      }
    }
    .right {
      .icon {
        cursor: pointer;
        svg {
          color: #0099ff;
        }
      }
    }
  }
}
.style-chooser .vs__dropdown-toggle .vs__actions {
  display: none !important;
}
  .header[data-theme="dark"] {
    background-color: #2F3136;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
    color: #fff;
    .bottom {
      .right{
        .icon {
          svg {
            color: #ffb94a;
          }
        }
      }
    }
  }
</style>
