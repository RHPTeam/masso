<!--Left Sidebar Page Script Facebook Desktop-->
<template>
  <div class="sidebar-scripts group py_3" :data-theme="currentTheme" >
    <!-- Start Group Scripts -->
    <div class="group--scripts mb_3 mt_2" v-for="(groupBlock, index) in groupBlock" :key="`c-${index}`">
      <div class="title d_inline_flex">
        <div>
          <icon-base
            class="icon--sort-down"
            icon-name="IconSortDown"
            width="17"
            height="10"
            viewBox="0 0 10 10"
          >
            <icon-sort-down/>
          </icon-base>
        </div>
        <contenteditable
          class="name--scripts"
          tag="div"
          :contenteditable="true"
          :placeholder="$t('chat.scripts.sidebar.name.placeholder')"
          v-model="groupBlock.name"
          @keyup="upTypingText('groupblock', groupBlock)"
          @keydown="clear"
        />
        <option-group :groupId="groupBlock._id" />
      </div>
      <div class="content my_3">
        <div class="name group-scripts r m_0">
          <div class="group--items c_xl_6 c_lg_6 c_md_12 mb_3" v-for="(blockGroup, index) in groupBlock.blocks" :key="`e-${index}`">
            <div class="content--item position_relative">
              <div class="text_center name" @click="showInforBlockGroup(blockGroup._id)">
                {{ blockGroup.name }}
              </div>
              <div class="position_absolute icon--more-group-block">
                <option-group-block />
              </div>
            </div>
          </div>
          <div class="group--items c_xl_6 c_lg_6 c_md_12 mb_3" @click="createBlockInAGroup(groupBlock._id)">
            <div class="content--item position_relative">
              <div class="text_center">
                <icon-base
                  class="icon--add"
                  icon-name="plus"
                  width="16"
                  height="16"
                  viewBox="0 0 60 60"
                >
                  <icon-plus/>
                </icon-base>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Group Scripts -->

    <!-- Start sequence scripts  -->
    <div class="sequences--scripts" v-for="(sequence,index) in groupSequence" :key="index">
      <div class="title d_inline_flex mb_2">
        <div>
          <icon-base
            class="icon--sort-down"
            icon-name="IconSortDown"
            width="17"
            height="10"
            viewBox="0 0 10 10"
          >
            <icon-sort-down/>
          </icon-base>
        </div>
        <contenteditable
          class="name--sequence"
          tag="div"
          :contenteditable="true"
          :placeholder="$t('chat.scripts.sidebar.sequence.placeholder')"
          v-model="sequence.name"
          @keyup="upTypingText('groupfriend', sequence)"
          @keydown="clear"
        />
        <div @click="openSequenceDropdown(sequence._id)">
          <icon-base
            class="icon--more"
            icon-name="IconMore"
            width="23"
            height="23"
            viewBox="0 0 750 750"
          >
            <icon-more/>
          </icon-base>
        </div>
        <div
          class="click--icon dropdown--menu-content"
          v-if="showCopySequenceScripts === true && currentSequenceIndex === sequence._id"
          v-click-outside="closeCopySequenceScripts"
        >
          <div class="px_3 pt_3 pb_2 dropdown--menu-item mb_2">
            <div class="copy">{{ $t("chat.scripts.sidebar.sequence.copy.title") }}</div>
            <div>{{ $t("chat.scripts.sidebar.sequence.copy.desc") }}</div>
          </div>
          <div
            class="dropdown--menu-item mb_2 pl_3"
            @click="deleteASequence(sequence._id)"
          >{{ $t("chat.scripts.sidebar.sequence.copy.delete") }}</div>
        </div>
      </div>
      <div class="content">
        <div
          class="r m_0 group--items"
          v-for="(blockInSequence,index) in groupSequence[index].sequences"
          :key="`b-${index}`"
        >
          <div class="c_lg_4 c_xl_4 c_md_12 p_0 mb_3">
            <div class="content--item position_relative">              
              <after-day :sequenceId="sequence._id" :item="blockInSequence" />
            </div>
          </div>
          <div class="c_lg_8 c_xl_8 c_md_12 p_0 mb_3 position_relative">
            <div class="content--item" @click="showInforBlockSequence(blockInSequence._id)">
              <div class="text_center name-script">{{ blockInSequence._block.name }}</div>
            </div>
            <div class="option">
              <options-sequence class="options--sequence" :sequenceId="sequence._id" :item="blockInSequence" />
            </div>
          </div>
        </div>
        <div
          class="r m_0 group--items mb_3 position_relative"
          @click="createNewBlockInSequence(sequence._id)"
        >
          <div class="c_lg_12 c_xl_12 c_md_12 p_0">
            <div class="content--item">
              <div class="text_center name-script">
                <icon-base
                  class="icon--add"
                  icon-name="plus"
                  width="16"
                  height="16"
                  viewBox="0 0 60 60"
                >
                  <icon-plus/>
                </icon-base>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End sequence scripts  -->

    <!-- Start: Create Sequence or Group -->
    <div
      class="group--item add"
      @click="isAddTypeDropdown = !isAddTypeDropdown"
      v-click-outside="closeAddTypeDropdown"
    >
      <div class="group--item-name d_flex align_items_center">
        <icon-base class="icon--add" icon-name="plus" width="9" height="9" viewBox="0 0 60 60">
          <icon-plus/>
        </icon-base>
        <span class="ml_3">{{ $t("chat.scripts.sidebar.add.title") }}</span>
      </div>
      <div
        class="dropdown--menu dropdown--menu-left flipInY animated type"
        :class="{ show: isAddTypeDropdown }"
      >
        <span class="with--arrow">
          <span class="bg_light"></span>
        </span>
        <div class="dropdown--menu-content">
          <div
            class="dropdown--menu-item"
            @click="createSequence"
          >{{ $t("chat.scripts.sidebar.add.sequence") }}</div>
          <div
          class="dropdown--menu-item"
          @click="createGroupBlock"
          >{{ $t("chat.scripts.sidebar.add.group") }}</div>
        </div>
      </div>
    </div>
    <!--End: Create Sequence or Group-->
  </div>
</template>
<script src="./index.script.js"></script>
<style scoped lang="scss">
@import "./index.style";

.group--item {
  cursor: pointer;
  margin-top: 2rem;

  &:first-child {
    margin-top: 0;
  }

  .dropdown--menu {
    background-clip: padding-box;
    background-color: #fff;
    border: 0;
    border-radius: 2px;
    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.1);
    color: #3e5569;
    display: none;
    font-size: 0.875rem;
    margin: 0.125rem 0 0;
    position: absolute;
    text-align: left;
    top: 100%;
    z-index: 99;

    &.type {
      text-align: center;
      width: 150px;
    }

    &.show {
      display: block;
    }

    &.dropdown--menu-left {
      left: 20px;
      right: auto;
      top: 25px;

      .with--arrow {
        left: 0;

        > span {
          left: 20px;
          right: 0;
        }
      }
    }

    .with--arrow {
      height: 10px;
      position: absolute;
      top: -10px;
      width: 40px;

      > span {
        border-radius: 6px 0 0;
        content: "";
        height: 15px;
        position: absolute;
        transform: rotate(45deg);
        top: 3px;
        width: 15px;
      }
    }

    &-item {
      font-weight: 700;
      padding: 0.75rem 0;
      border-bottom: 1px solid #f2f1f1;
    }

    &-item:last-child {
      border-bottom: 0;
    }

    &-item:hover,
    &-item:focus,
    &-item:active {
      background-color: #f9f8f8;
    }

    &.animated {
      animation-duration: 1s;
      animation-fill-mode: both;
    }

    &.flipInY {
      backface-visibility: visible !important;
      animation-name: flipInY;
    }

    @keyframes flipInY {
      from {
        transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
        animation-timing-function: ease-in;
        opacity: 0;
      }
      40% {
        transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
        animation-timing-function: ease-in;
      }
      60% {
        transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
        opacity: 1;
      }
      80% {
        transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
      }
      to {
        transform: perspective(400px);
      }
    }
  }

  .action {
    display: none;
    position: relative;
    transition: 0.5s ease-in;

    &.active {
      display: block;
    }

    .action--item {
      left: 0;
      width: 250px;

      .dropdown--menu-item {
        padding: 0.75rem 1.25rem;
        text-transform: capitalize;

        &:first-child div:nth-child(2) {
          font-weight: 500;
          margin-top: 0.25rem;
          font-size: 0.75rem;
        }

        &:last-child {
          color: #f43c3c;
        }
      }
    }
  }
}

.group--item.add {
  margin-top: 2rem;
  position: relative;

  .group--item-name {
    > span {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
}

.script--item {
  .item--remove {
    position: absolute;
    top: 0.75rem;
    right: 0.5rem;
  }
}
.group--items {
  .name-script {
    text-overflow: ellipsis;
    cursor: pointer;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
