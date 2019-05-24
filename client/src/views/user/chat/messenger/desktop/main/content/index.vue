<template>
  <div class="d_flex flex_column" role="chat">
    <vue-perfect-scrollbar :style="{ height: contentMessengerHeight + 'px' }">
      <!-- Start: Info friend-->
      <div class="info d_flex align_items_center" role="above">
        <div class="avatar"></div>
        <div role="infomation">
          <h3>Liu Lang</h3>
          <p>Các bạn là bạn bè trên  đâu đó</p>
          <p>Đã từng làm việc tại đâu đó</p>
          <p>Từng học chung tại đâu đó</p>
          <p> Sống chung tại đâu đó</p>
          <h3>Liu Lang</h3>
          <p>Các bạn là bạn bè trên  đâu đó</p>
          <p>Đã từng làm việc tại đâu đó</p>
          <p>Từng học chung tại đâu đó</p>
          <p> Sống chung tại đâu đó</p>
          <h3>Liu Lang</h3>
          <p>Các bạn là bạn bè trên  đâu đó</p>
          <p>Đã từng làm việc tại đâu đó</p>
          <p>Từng học chung tại đâu đó</p>
          <p> Sống chung tại đâu đó</p>
          <h3>Liu Lang</h3>
          <p>Các bạn là bạn bè trên  đâu đó</p>
          <p>Đã từng làm việc tại đâu đó</p>
          <p>Từng học chung tại đâu đó</p>
          <p> Sống chung tại đâu đó</p>
          <h3>Liu Lang</h3>
          <p>Các bạn là bạn bè trên  đâu đó</p>
          <p>Đã từng làm việc tại đâu đó</p>
          <p>Từng học chung tại đâu đó</p>
          <p> Sống chung tại đâu đó</p>
          <h3>Liu Lang</h3>
          <p>Các bạn là bạn bè trên  đâu đó</p>
          <p>Đã từng làm việc tại đâu đó</p>
          <p>Từng học chung tại đâu đó</p>
          <p> Sống chung tại đâu đó</p>
          <h3>Liu Lang</h3>
          <p>Các bạn là bạn bè trên  đâu đó</p>
          <p>Đã từng làm việc tại đâu đó</p>
          <p>Từng học chung tại đâu đó</p>
          <p> Sống chung tại đâu đó</p>
          <h3>Liu Lang</h3>
          <p>Các bạn là bạn bè trên  đâu đó</p>
          <p>Đã từng làm việc tại đâu đó</p>
          <p>Từng học chung tại đâu đó</p>
          <p> Sống chung tại đâu đó</p>
          <h3>Liu Lang</h3>
          <p>Các bạn là bạn bè trên  đâu đó</p>
          <p>Đã từng làm việc tại đâu đó</p>
          <p>Từng học chung tại đâu đó</p>
          <p> Sống chung tại đâu đó</p>
          <h3>Liu Lang</h3>
          <p>Các bạn là bạn bè trên  đâu đó</p>
          <p>Đã từng làm việc tại đâu đó</p>
          <p>Từng học chung tại đâu đó</p>
          <p> Sống chung tại đâu đó</p>
          <h3>Liu Lang</h3>
          <p>Các bạn là bạn bè trên  đâu đó</p>
          <p>Đã từng làm việc tại đâu đó</p>
          <p>Từng học chung tại đâu đó</p>
          <p> Sống chung tại đâu đó</p>
          <h3>Liu Lang</h3>
          <p>Các bạn là bạn bè trên  đâu đó</p>
          <p>Đã từng làm việc tại đâu đó</p>
          <p>Từng học chung tại đâu đó</p>
          <p> Sống chung tại đâu đó</p>
        </div>
      </div>
      <!-- End: Info friend-->

      <!-- Start: chat content-->
      <div class="inside">
        <div class="time text_center">19:00</div>

      </div>
      <!-- End: Chat content-->
    </vue-perfect-scrollbar>

    <!-- Start: Create message-->
    <div class="mess" ref="inputMessenger">
        <div class="d_flex align_items_center p_3">
          <div class="message">
            <contenteditable tag="div" :contenteditable="true" placeholder="Nhập tin nhắn..." @input="getContentMessengerHeight" />
          </div>
          <div class="icon" role="icon">
            icon
          </div>
        </div>
      </div>
    <!-- End: Create message-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentMessengerHeight: 0
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getContentMessengerHeight);

      this.getContentMessengerHeight();
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getContentMessengerHeight);
  },
  methods: {
    getContentMessengerHeight(event) {
      console.log(document.documentElement.clientHeight);
      console.log(this.$refs.inputMessenger.clientHeight);
      this.contentMessengerHeight = document.documentElement.clientHeight - 60 - this.$refs.inputMessenger.clientHeight;
    }
  }
}
</script>

<style lang="scss" scoped>
div[role="chat"] {
  flex: 2 0 0%;
  overflow: hidden;
  position: relative;
  .top {
    background: yellow;
    flex: 1 0 0%;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .mess {
    background: green;
    display: flex;
    flex-direction: column;
    .message {
      width: 60%;
      [contenteditable="true"]:empty:before {
        content: attr(placeholder);
        color: #999;
        display: block; /* For Firefox */
      }
    }
    .div[role="icon"] {
      width: 40%;
    }
  }
}
</style>
