<template>
  <div class="option p_4">
    <div  v-if="caseEvent.post === 0">
      <div class="desc mb_3">
        Dễ dàng hơn khi bạn lựa chọn 1 trong 2 cách thức đăng bài dưới đây
      </div>
      <div class="r body d_flex align_items_end justify_content_between mb_3">
        <div class="c_6 item" @click="selectPostType( 1 )">
          <div class="card d_flex flex_column align_items_center p_3">
            <div class="icon">
              <icon-base
                class="icon--group"
                height="50"
                width="50"
                viewBox="0 0 500 500"
              >
                <icon-group></icon-group>
              </icon-base>
            </div>
            <div>Đăng bài tự động từ kho danh mục bạn đã lưu trữ, hệ thống sẽ giúp bạn chọn lựa bài viết phù hợp</div>
          </div>
        </div>
        <div class="c_6 item" @click="selectPostType( 2 )">
          <div class="card d_flex flex_column align_items_center p_3">
            <div class="icon">
              <icon-base
                class="icon--group"
                height="50"
                width="50"
                viewBox="0 0 500 500"
              >
                <icon-group></icon-group>
              </icon-base>
            </div>
            <div>Tùy chỉnh chọn lựa các bài viết cụ thể nhằm tối ưu cũng như chính xác hơn theo mong muốn của bạn</div>
          </div>
        </div>
      </div>
    </div>

    <post-category
      v-if="caseEvent.post === 1"
    />
    <post-custom
      v-if="caseEvent.post === 2"
    />

    <post-location />
  </div>

</template>

<script>
import PostCategory from "../category";
import PostCustom from "../select";
import PostLocation from "../postlocation";
export default {
  components: {
    PostCategory,
    PostCustom,
    PostLocation
  },
  // props: {
  //   event: Object
  // },
  data() {
    return {
      isActive: true,
      isOption: false
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    caseEvent() {
      return this.$store.getters.caseEvent;
    }
  },
  methods: {
    selectPostType( value ) {
      if(value === 1) {
        this.isOption = false;
        this.isActive = true;
      } else if (value === 2) {
        this.isOption = true;
        this.isActive = false;
        this.$store.dispatch( "setEventRemove", "post_category" );
      }
      this.$store.dispatch( "setCaseEvent", {
        key: "post",
        value: value
      } );
    }
  },
}
</script>

<style lang="scss" scoped>
.option {
  .item {
    cursor: pointer;
  }
  .card {
    background-color: #2f3136;
    border: 1px solid #2f3136;
  }
}
</style>
