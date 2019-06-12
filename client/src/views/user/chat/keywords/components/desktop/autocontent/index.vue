<template>
  <div class="auto--main-content text_left" :data-theme="currentTheme">
    <div class="r mb_4">
      <div class="c_md_12 c_xl_6 mb_3">
        <div class="divide--title mb_2 d_flex">
          <div>{{ $t("chat.keywords.content.keyword.title") }}</div>
          <div class="ml_auto position_relative">
            <div class="icon--infor">
              <icon-base
                class="icon--info"
                icon-name="info"
                width="14"
                height="14"
                viewBox="0 0 18 18"
              >
                <icon-info/>
              </icon-base>
            </div>
            <div class="position_absolute infor">keywords as</div>
          </div>
        </div>
        <taggle
          :placeholder="$t('chat.keywords.content.keyword.placeholder')"
          type="syntax"
          v-model="syntax.name"
          @input="updateSyntax"
        />
      </div>
      <div class="c_md_12 c_xl_6">
        <div class="auto--answer">
          <div class="divide--title mb_2 d_flex">
            <div>{{ $t("chat.keywords.content.reply.title") }}</div>
            <div class="ml_auto position_relative">
              <div class="icon--infor">
                <icon-base
                  class="icon--info"
                  icon-name="info"
                  width="14"
                  height="14"
                  viewBox="0 0 18 18"
                >
                  <icon-info/>
                </icon-base>
              </div>
              <div class="position_absolute infor">Reply</div>
            </div>
          </div>
          <div class="auto--answer-add">
            <div class="block">
              <!-- Start: Add Block or Text Component -->
              <div class="block--body">
                <div class="block--body-item" 
                  v-for="(item, index) in syntax.content"
                  :key="index">
                  <contenteditable
                    v-if="item.typeContent === 'text'"
                    class="editable"
                    tag="div"
                    :placeholder="$t('chat.keywords.content.reply.placeholderText')"
                    :contenteditable="true"
                    v-model="item.valueContent"
                    @keyup="upTypingText('itemsyntax', item)"
                    @keydown="clear"
                  />
                  <multiselect
                    :placeholder="$t('chat.keywords.content.reply.placeholderGroup')"
                    v-if="item.typeContent === 'block'"
                    @option="groupBlock"
                    multiple
                  ></multiselect>
                  <div class="action" @click.prevent="removeItem(index)">
                    <icon-base
                      class="icon--remove"
                      icon-name="remove"
                      width="26"
                      height="26"
                      viewBox="0 0 18 18"
                    >
                      <icon-remove/>
                    </icon-base>
                  </div>
                </div>
              </div>
              <!--End: Add Block or Text Component-->
            </div>
            <div class="block--footer">
              {{ $t("chat.keywords.content.reply.add") }}
              <span @click.prevent="createItem('block')">{{ $t("chat.keywords.content.reply.group") }}</span>
              {{ $t("chat.keywords.content.reply.or") }}
              <span @click.prevent="createItem('text')">{{ $t("chat.keywords.content.reply.text") }}</span>
            </div>
            <!--End: Footer Component-->
          </div>
        </div>
      </div>
    </div>
    <div class="r">
      <div class="form_group c_12">
        <div class="divide--title mb_3 d_flex">
          <div>{{ $t("chat.keywords.content.accountUse.title") }}</div>
          <div class="ml_auto position_relative">
            <div class="icon--infor">
              <icon-base
                class="icon--info"
                icon-name="info"
                width="14"
                height="14"
                viewBox="0 0 18 18"
              >
                <icon-info/>
              </icon-base>
            </div>
            <div class="position_absolute infor">Click something</div>
          </div>
        </div>
        <ul
          class="list--user"
          v-if="!accountFacebookList || accountFacebookList.length === 0"
        >
          <li class="no--account">Bạn chưa thêm tài khoản facebook nào!</li>
        </ul>
        <ul v-else class="list--user">
          <!--Selected class-->
          <li
            class="list--user-item"
            :class="[
              syntax._facebook.includes(account._id) === true ? 'selected' : ''
            ]"
            v-for="(account, index) in accountFacebookList"
            :key="index"
            @click.prevent="toggleUser(account._id)"
          >
            <div class="d_flex">
              <div class="images--avatar mr_2">
                <img :src="account.userInfo.thumbSrc" alt="" />
              </div>
              <div>{{ account.userInfo.name }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- Start: Delete Item Popup-->
    <transition name="popup">
      <delete-campaign-popup
        v-if="isDeleteItemBlock === true"
        :data-theme="currentTheme"
        title="Delete Property"
        @closePopup="isDeleteItemBlock = $event"
        storeActionName="deleteProperty"
        typeName="Property"
      ></delete-campaign-popup>
    </transition>
    <!-- End: Delete Item Popup -->
  </div>
</template>
<script>
let typingTimer;
import DeleteCampaignPopup from "@/components/popups/delete";
export default {
  components: {
    DeleteCampaignPopup
  },
  data() {
    return {
      isOpenDocument: false,
      isOpenScript: false,
      currentIndexOfUser: null,
      isDeleteItemBlock: false
    };
  },
  computed: {
    accountFacebookList() {
      return this.$store.getters.accountsFB;
    },
    groupBlock() {
      console.log("this.$store.getters.groups;");
      console.log(this.$store.getters.groups);
      return this.$store.getters.groups;
    },
    sequences() {
      return this.$store.getters.groupSqc;
    },
    syntax() {
      return this.$store.getters.syntax;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  async created() {
    await this.$store.dispatch("getAccountsFB");
    await this.$store.dispatch("getGroupBlock");
    // await this.$store.dispatch("getSequence");
  },
  methods: {
    createItem(type) {
      this.syntax.content.push({
        typeContent: type,
        valueContent: ""
      });
      this.$store.dispatch("updateSyntax", this.syntax);
    },
    removeItem(index) {
      this.syntax.content.splice(index, 1);
      this.$store.dispatch("updateSyntax", this.syntax);
    },
    toggleUser(userId) {
      if (this.syntax._facebook.includes(userId) === true) {
        this.syntax._facebook = this.syntax._facebook.filter(item => {
          if (item === userId) return;
          return true;
        });
        this.$store.dispatch("updateSyntax", this.syntax);
      } else {
        this.syntax._facebook.push(userId);
        this.$store.dispatch("updateSyntax", this.syntax);
      }
    },
    upTypingText(type, item) {
      clearTimeout(typingTimer);
      if (type === "itemsyntax") {
        typingTimer = setTimeout(this.updateSyntax(item), 800);
      }
    },
    clear() {
      clearTimeout(typingTimer);
    },
    updateSyntax() {
      this.$store.dispatch("updateSyntax", this.$store.getters.syntax);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../index.style";

// Answer item or text
.divide--title {
  .icon--infor,
  .icon--info {
    cursor: pointer;
  }
  .icon--infor:hover + {
    .infor {
      display: block;
    }
  }
  .infor {
    display: none;
    background: #fff;
    box-shadow: 0 0 0px 1px rgba(16, 16, 16, 0.08);
    width: 150px;
    z-index: 5;
    top: 100%;
    right: 0;
    padding: 0.625rem;
    font-weight: 400;
    font-size: 0.825rem;
    border-radius: 0.3125rem;
    color: #666;
  }
}
.block {
  &--body,
  &--footer {
    padding: 0.5rem 0.75rem;
  }
  &--body {
    padding-top: 0;
    padding-bottom: 0;
    &-item {
      line-height: 36px;
      padding: 0.75rem 0;
      position: relative;
      margin-right: 27px;
      .choose--group {
      }
      .editable {
        border: 1px solid transparent;
      }
      &:last-child {
        border-bottom: 0;
      }
      &:hover {
        .action {
          display: flex;
        }
      }
      .action {
        align-items: center;
        cursor: pointer;
        // display: none;
        position: absolute;
        top: 54%;
        transform: translateY(-50%);
        right: -30px;
        transition: all 0.4s ease;
        height: 24px;
        &:hover {
          color: #ffb94a !important;
        }
      }
      .editable {
        padding-right: 30px;
      }
    }
  }
  &--footer {
    color: #787878;
    font-size: 15px;
    line-height: 1.33;
    margin: 0.75rem 0;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
    span {
      color: #ffba3c;
      cursor: pointer;
      border-bottom: 1px dotted #ffba3c;
    }
  }
}
.list--user {
  .no--account {
    font-style: italic;
    font-size: 0.875rem;
  }
}

// *************** CHANGE THEME **************

// DARK
.auto--main-content[data-theme="dark"] {
  .images--avatar {
    color: #fff;
  }
  .block--body-item {
    .editable {
      border: 1px solid #484848;
    }
  }
}

// LIGHT
.auto--main-content[data-theme="light"] {
  .images--avatar {
    color: #666;
  }
}
</style>
