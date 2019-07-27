<template>
  <div class="input textarea cf mb_0" :data-theme="currentTheme">
    <multiselect
      label="name"
      multiple
      @input="updateSubscrible"
      :options="groupSequence"
      v-model="convertNameSequence"
      placeholder="Chọn để đăng ký chuỗi kịch bản"
    >
      <template slot="option" slot-scope="option">
        <span>{{ option.name }}</span>
      </template>
    </multiselect>
  </div>
</template>

<script>

export default {
  props: {
    sequence: Object,
    block: Object
  },
  data() {
    return {
      value: null
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    groupSequence() {
      return this.$store.getters.allSequenceScript;
    },
    subscribleDefault(){
      return this.$store.getters.dataPreviewUpdate;
    },
    convertNameSequence(){
      const arr = this.sequence.valueText.split(",");
      const nameArr = [];
      arr.map(id => {
        this.groupSequence.filter( item => {
          if(item._id == id) nameArr.push(item.name);
        })
      });
      return nameArr;
    }
  },
  async created() {
    await this.$store.dispatch("getAllSequenceScript");
  },
  methods: {
    async updateSubscrible(val){
      await this.updateValueSubscrible(val);
      const objSender = {
        block: this.block,
        itemId: this.sequence._id,
        valueText: this.subscribleDefault
      };
      this.$store.dispatch("updateItemBlock", objSender);
    },
    updateValueSubscrible( val ){
      if(val === undefined) return;
      const dataSender = val.map(item => {
        return item._id;
      });
      const lastId = dataSender.splice(-1);
      this.$store.dispatch("pushPreviewUpdateItemSubcribe", lastId);
    }
  }
};
</script>

<style lang="scss" scoped>
.textarea {
  border: 1px solid #e4e4e4;
  border-radius: 10px;
  box-shadow: none;
  cursor: text;
  margin-bottom: 2em;
  min-height: 60px;
  padding: 4px;
  position: relative;
  transition: all 0.25s;
  &.input {
    height: auto;
    min-height: 47px;
    // padding-bottom: 0;
  }
  &.cf:before,
  &.cf:after {
    clear: both;
    content: "";
    display: block;
    line-height: 0;
  }
  .list {
    float: left;
    list-style-image: none;
    list-style-position: outside;
    margin: 0;
    padding-left: 0;
    width: 100%;
    li {
      display: inline-block;
      float: left;
      font-weight: 500;
      margin-bottom: 5px;
      white-space: nowrap;
      .item {
        animation-duration: 1s;
        animation-fill-mode: both;
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;
        height: 30px;
        line-height: 1.2;
        margin-right: 8px;
        padding: 7.5px 10px;
        position: relative;
        transition: all 0.3s;
        &:hover,
        &:focus,
        &:active,
        &:visited {
          > .remove {
            display: block;
            transition: all 1s ease;
          }
        }
        .remove {
          display: none;
          top: -5px;
          right: -0.5rem;
        }
      }
      .item--input {
        background-color: transparent;
        border: none;
        font-size: 14px;
        font-weight: 300;
        outline: none;
        padding: 8px;
        float: left;
        height: 40px;
        margin-top: -5px;
        width: 200px;
        max-width: 100%;
        text-transform: lowercase;
        span {
          opacity: 0.6;
        }
      }
    }
    .suggest--sequence {
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      border-radius: 6px;
      box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.16);
      top: 115%;
      z-index: 99;
      .item--suggest {
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        padding: 0 1rem;
        text-transform: lowercase;
        &:hover {
          background-color: #ffb94a;
          color: #ffffff;
        }
      }
    }
  }
}

/* ChangeColor */

// Light
.textarea[data-theme="light"] {
  background: #ffffff;
  color: #444;
  input {
    color: #444;
  }
  .item {
    background: #e2e1df;
  }
}

//Dark
.textarea[data-theme="dark"] {
  background: #2f3136;
  color: #ffffff;
  input {
    color: #f7f7f7;
  }
  .item {
    background: #27292d;
  }
  .suggest--sequence {
    background-color: #27292d;
  }
  .item--suggest {
    color: #ffffff;
    &:hover,
    &:active,
    &:focus,
    &:visited {
      background-color: #2f3136;
    }
    &:first-child {
      &:hover,
      &:active,
      &:focus,
      &:visited {
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
      }
    }
    &:last-child {
      &:hover,
      &:active,
      &:focus,
      &:visited {
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
      }
    }
  }
}
</style>
