<template>
  <div class="section mt--5">
    <div class="section--header d_flex align_items_start justify_content_between">
      <div class="left d_flex">
        <div class="icon mr_4">
          <icon-base
            class="icon--mix"
            icon-name="Nội dung nâng cao"
            height="20px"
            width="20px"
            viewBox="0 0 540 540"
          >
            <icon-mix></icon-mix>
          </icon-base>
        </div>
        <div class="title">Nội dung nâng cao</div>
      </div>
      <div class="right position_relative">
        <div class="btn--detail"
             @click="showDeletePopup"
        >Xóa
        </div>
        <transition name="popup">
          <delete-popup
            v-if="isShowDeletePopup"
            title="nội dung nâng cao?"
            description="Các thiết lập nội dung nâng cao sẽ bị xóa bỏ và không thể hoàn tác."
            @closePopup="isShowDeletePopup = $event"
          ></delete-popup>
        </transition>
      </div>
    </div>
    <div class="section--body">
      <div class="r">
        <!-- Start: Beginning -->
        <div class="c_6">
          <div class="title mt_2 mb_2 d_flex justify_content_between">
            <span class="title">Mở bài</span>
          </div>
          <div class="item d_flex align_items_start">
            <div class="content">
              <div class="main">
                <r-select
                  label="title"
                  track-by="title"
                  placeholder="Chọn danh mục mở bài"
                  :maxHeight="240"
                  v-model="event.plugins.mix.open"
                  :options="convertMixCategories"
                  @input="updateMixOpen( $event )"
                >
                </r-select>
              </div>
            </div>
          </div>
        </div>
        <!-- End: Beginning -->
        <!-- Start: Ending-->
        <div class="c_6">
          <div class="title mt_2 mb_2 d_flex justify_content_between">
            <span class="title">Kết bài</span>
          </div>
          <div class="item d_flex align_items_start">
            <div class="content">
              <div class="main">
                <r-select
                  label="title"
                  track-by="title"
                  placeholder="Chọn danh mục kết bài"
                  :maxHeight="240"
                  v-model="event.plugins.mix.close"
                  :options="convertMixCategories"
                  @input="updateMixClose( $event )"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Start: Ending -->
      </div>
      <div class="text--error mt_2" v-if="errorMixStatus">{{ errorMixText }}</div>
    </div>
  </div>
</template>

<script>
import DeletePopup from "../../popup/remove";

export default {
  components: {
    DeletePopup
  },
  props: [ "errorMixStatus", "errorMixText" ],
  data() {
    return {
      isShowDeletePopup: false,
    }
  },
  computed: {
    event() {
      return this.$store.getters.event;
    },
    mixCategories() {
      return this.$store.getters.mixCategories;
    },
    convertMixCategories() {
      return this.mixCategories.map( ( category ) => {
        return {
          _id: category._id,
          title: category.title
        }
      } );
    }
  },
  watch: {
    "event.plugins.mix.open"( value ) {
      if ( value && this.event.plugins.mix.close ) {
        if ( value._id === this.event.plugins.mix.close._id ) {
          this.updateErrorMixStatus( true );
          this.updateErrorMixText( "Danh mục mở bài và kết bài trùng nhau!" );
        } else {
          this.updateErrorMixStatus( false );
          this.updateErrorMixText( "" );
        }
      } else {
        this.updateErrorMixStatus( false );
        this.updateErrorMixText( "" );
      }
    },
    "event.plugins.mix.close"( value ) {
      if ( value && this.event.plugins.mix.open ) {
        if ( value._id === this.event.plugins.mix.open._id ) {
          this.updateErrorMixStatus( true );
          this.updateErrorMixText( "Danh mục mở bài và kết bài trùng nhau!" );
        } else {
          this.updateErrorMixStatus( false );
          this.updateErrorMixText( "" );
        }
      } else {
        this.updateErrorMixStatus( false );
        this.updateErrorMixText( "" );
      }
    }
  },
  created() {
    this.$store.dispatch( "getMixCategories" );
  },
  methods: {
    updateErrorMixStatus( value ) {
      this.$emit( "updateErrorMixStatus", value );
    },
    updateErrorMixText( value) {
      this.$emit( "updateErrorMixText", value );
    },
    async updateMixOpen( value ) {
      await this.$store.dispatch( "setEvent", {
        key: "plugins",
        value: {
          mix: {
            open: value,
            close: this.event.plugins.mix.close
          }
        }
      } );
    },
    async updateMixClose( value ) {
      await this.$store.dispatch( "setEvent", {
        key: "plugins",
        value: {
          mix: {
            open: this.event.plugins.mix.open,
            close: value
          }
        }
      } );
    },
    showDeletePopup() {
      this.isShowDeletePopup = true;
    }
  }
}
</script>

<style scoped lang="scss">
@import "./index.style.scss";
</style>
