<template>
  <div class="option">
    <div class="icon-more" @click="showOptionsSequence">
      <icon-base
        class="icon--more"
        icon-name="IconMore"
        width="22"
        height="22"
        viewBox="0 0 760 760"
      >
        <icon-more />
      </icon-base>
    </div>
    <div
      class="infor position_absolute"
      v-if="isOptionsSequence === true"
      v-click-outside="closeOptionsSequence"
    >
      <ul>
        <li @click="closeOptionsSequence" class="disable">
          <div class="pb_1 copy">{{ $t("chat.scripts.sidebar.name.copy.title") }}</div>
          <div class="desc--copy">{{ $t("chat.scripts.sidebar.name.copy.desc") }}</div>
        </li>
        <li @click="isDeletedTarget = true" class="delete">Xóa</li>
      </ul>
    </div>
    <transition name="popup">
      <delete-popup
        v-if="isDeletedTarget === true"
        :data-theme="currentTheme"
        title="Delete Scripts"
        @closePopup="isDeletedTarget = $event"
        @isDeletedTarget="$emit('isDeletedTarget', $event)"
        storeActionName="deleteBlock"
        :targetData="selectedBlock"
        typeName="Scripts"
      >
      </delete-popup>
    </transition>
  </div>
</template>

<script>
import DeletePopup from "@/components/popups/delete";

export default {
  // props: {
  //   sequenceId: String,
  //   item: Object,
  // },
  props: ['selectedBlock'],
  components: {
    DeletePopup
  },
  data() {
    return {
      isOptionsSequence: false,
      isDeletedTarget: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    // block() {
    //   return this.$store.getters.block;
    // }
  },
  watch:{

  },
  methods: {
    showOptionsSequence() {
      this.isOptionsSequence = true;
    },
    closeOptionsSequence() {
      this.isOptionsSequence = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.option{
  display: block;
  width: 25px;
  height:25px;
}

.icon-more {
  float: right;
}
.infor {
  cursor: pointer;
  top: 30px;
  right: -97px;
  z-index: 11;
  width: 250px;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 0px 1px rgba(16, 16, 16, 0.08);
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    border-bottom: 1px dotted rgba(16, 16, 16, 0.08);
    text-align: left;
    background: #fff;
    color: #333;
    padding: 0.75rem;
    transition: 0.3s;
  }
  li:last-child {
    color: #f43c3c;
    border-bottom: 0;
  }
  & li:hover {
    background: #ffb94a;
    color: #fff;
  }
  .disable {
    cursor: not-allowed;
    .copy {
      font-weight: bold;
    }
    .desc--copy {
      font-size: 0.8125rem;
    }
  }
  .delete {
    font-weight: bold;
  }
}
</style>
