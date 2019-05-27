<template>
  <div class="auto--main-content text_left">
    <div class="r mb_4">
      <div class="c_md_12 c_xl_6 mb_3">
        <div class="divide--title mb_2">Từ khóa</div>
        <taggle placeholder="Nhập từ khóa..." type="syntax"/>
      </div>
      <div class="c_md_12 c_xl_6">
        <div class="auto--answer">
          <div class="divide--title mb_2">Trả lời</div>
          <div class="auto--answer-add">
            <div class="block">
              <!-- Start: Add Block or Text Component -->
              <div class="block--body">
                <div class="block--body-item">
                  <contenteditable
                    class="editable"
                    tag="div"
                    placeholder="Nhập văn bản..."
                    :contenteditable="true"
                    v-model="title"
                  />
                  <span class="action">
                    <icon-base
                      class="icon--remove"
                      icon-name="remove"
                      width="26"
                      height="26"
                      viewBox="0 0 18 18"
                    >
                      <icon-remove/>
                    </icon-base>
                  </span>
                </div>
              </div>
              <!--End: Add Block or Text Component-->
            </div>
            <div class="block">
              <!-- Start: Add Block or Text Component -->
              <div class="block--body">
                <div class="block--body-item">
                  <multiselect
                    placeholder="Chọn nhóm..."
                    type="itemSyntax"
                    v-model="title"
                    class="choose--group"
                  ></multiselect>
                  <span class="action" @click="isDeleteItemBlock = true">
                    <icon-base
                      class="icon--remove"
                      icon-name="remove"
                      width="26"
                      height="26"
                      viewBox="0 0 18 18"
                    >
                      <icon-remove/>
                    </icon-base>
                  </span>
                </div>
              </div>
              <!--End: Add Block or Text Component-->
            </div>
            <div class="block">
              <!-- Start: Add Block or Text Component -->
              <div class="block--body">
                <div class="block--body-item">
                  <contenteditable
                    class="editable"
                    tag="div"
                    placeholder="Nhập văn bản..."
                    :contenteditable="true"
                    v-model="title"
                  />
                  <span class="action">
                    <icon-base
                      class="icon--remove"
                      icon-name="remove"
                      width="26"
                      height="26"
                      viewBox="0 0 18 18"
                    >
                      <icon-remove/>
                    </icon-base>
                  </span>
                </div>
              </div>
              <!--End: Add Block or Text Component-->
            </div>
            <div class="block">
              <!-- Start: Add Block or Text Component -->
              <div class="block--body">
                <div class="block--body-item">
                  <multiselect
                    placeholder="Chọn nhóm..."
                    type="itemSyntax"
                    v-model="title"
                    class="choose--group"
                  ></multiselect>
                  <span class="action">
                    <icon-base
                      class="icon--remove"
                      icon-name="remove"
                      width="26"
                      height="26"
                      viewBox="0 0 18 18"
                    >
                      <icon-remove/>
                    </icon-base>
                  </span>
                </div>
              </div>
              <!--End: Add Block or Text Component-->
            </div>
            <!-- Start: Footer  Component -->
            <div class="block--footer">
              Thêm
              <span>nhóm</span> hoặc
              <span>văn bản</span>
            </div>
            <!--End: Footer Component-->
          </div>
        </div>
      </div>
    </div>
    <div class="r">
      <div class="form_group c_12">
        <div class="divide--title mb_3">Tài khoản áp dụng</div>
        <ul class="list--user">
          <li>Bạn chưa thêm tài khoản facebook nào!</li>
        </ul>
        <ul class="list--user">
          <!--Selected class-->
          <li class>
            <div class="d_inline_flex user px_2 py_1">
              <div class="images--avatar mr_2">
                <img src="@/assets/images/register--logo.png">
              </div>
              <div class="name--user">Ahihi</div>
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
  data() {
    return {
      isOpenDocument: false,
      isOpenScript: false,
      currentIndexOfUser: null,
      title: "AAAA",
      isDeleteItemBlock: false
    };
  },
  async created() {
    // await this.$store.dispatch("getAccountsFB");
    // await this.$store.dispatch("getGroupBlock");
    // await this.$store.dispatch("getSequence");
  },
  computed: {
    // accountFacebookList() {
    //   return this.$store.getters.accountsFB;
    // },
    // groupBlock() {
    //   return this.$store.getters.groups;
    // },
    // sequences() {
    //   return this.$store.getters.groupSqc;
    // },
    // syntax() {
    //   return this.$store.getters.syntax;
    // }
  },
  methods: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
    // createItem(type) {
    //   this.syntax.content.push({
    //     typeContent: type,
    //     valueContent: ""
    //   });
    //   this.$store.dispatch("updateSyntax", this.syntax);
    // },
    // removeItem(index) {
    //   this.syntax.content.splice(index, 1);
    //   this.$store.dispatch("updateSyntax", this.syntax);
    // },
    // toggleUser(userId) {
    //   if (this.syntax._facebook.includes(userId) === true) {
    //     this.syntax._facebook = this.syntax._facebook.filter(item => {
    //       if (item === userId) return;
    //       return true;
    //     });
    //     this.$store.dispatch("updateSyntax", this.syntax);
    //   } else {
    //     this.syntax._facebook.push(userId);

    //     this.$store.dispatch("updateSyntax", this.syntax);
    //   }
    // },
    // upTypingText(type, group) {
    //   clearTimeout(typingTimer);
    //   if (type === "itemsyntax") {
    //     typingTimer = setTimeout(this.updateSyntax(group), 800);
    //   }
    // },
    // clear() {
    //   clearTimeout(typingTimer);
    // },
    // updateSyntax() {
    //   this.$store.dispatch("updateSyntax", this.$store.getters.syntax);
    // }
  },
  components: {
    DeleteCampaignPopup
  }
};
</script>
<style lang="scss" scoped>
@import "../../../index.style";

// Answer group or text
.auto--answer {
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
        display: none;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        transition: all 0.4s ease;
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

// *************** CHANGE THEME **************

// DARK
.auto--main-content[data-theme="dark"] {
  .images--avatar {
    color: #fff;
  }
}

// LIGHT
.auto--main-content[data-theme="light"] {
  .images--avatar {
    color: #666;
  }
}
</style>
