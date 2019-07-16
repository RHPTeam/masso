<template>
  <div class="section mt--5">
    <div class="section--header d_flex align_items_start justify_content_between">
      <div class="left d_flex">
        <div class="icon mr_4">
          <icon-base
            class="icon--activity"
            icon--name="Nơi đăng"
            height="20px"
            width="20px"
            viewBox="0 0 480 480"
          >
            <icon-activity></icon-activity>
          </icon-base>
        </div>
        <div class="title">Nội dung nâng cao</div>
      </div>
      <div class="right">
        <div class="btn--detail"
        >Xóa
        </div>
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
                <multiselect
                  label="title"
                  placeholder="Chọn danh mục mở bài"
                  :value="event.plugins.mix.open"
                  :options="mixCategories"
                  @input="updateMixOpen( $event )"
                >
                </multiselect>
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
                <multiselect
                  label="title"
                  placeholder="Chọn danh mục kết bài"
                  :value="event.plugins.mix.close"
                  :options="mixCategories"
                  @input="updateMixClose( $event )"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Start: Ending -->
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
    mixCategories() {
      return this.$store.getters.mixCategories;
    }
  },
  created() {
    this.$store.dispatch( "getMixCategories" );
  },
  methods: {
    async updateMixOpen( value ) {
      console.log( value );
      await this.$store.dispatch( "setEvent", {
        key: "plugins",
        value: {
          mix: {
            open: {
              _id: value._id,
              title: value.title
            },
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
            close: {
              _id: value._id,
              title: value.title
            }
          }
        }
      } );
    }
  }
}
</script>

<style scoped lang="scss">
@import "./index.style.scss";
</style>
