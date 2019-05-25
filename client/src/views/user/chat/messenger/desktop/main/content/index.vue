<template>
  <div class="d_flex flex_column" role="chat">
    <vue-perfect-scrollbar class="p_2" :style="{ height: contentMessengerHeight + 'px' }">
      <!-- Start: Info friend-->
      <div class="info d_flex align_items_center p_3" role="above">
        <div class="avatar mr_3" :style="{backgroundImage: 'url('+srcTest+')'}"></div>
        <div role="infomation">
          <h3 class="m_0">Liu Lang</h3>
          <p class="m_0">Các bạn là bạn bè trên  đâu đó</p>
          <p class="m_0">Đã từng làm việc tại đâu đó</p>
          <p class="m_0">Từng học chung tại đâu đó</p>
          <p class="m_0"> Sống chung tại đâu đó</p>
        </div>
      </div>
      <!-- End: Info friend-->

      <!-- Start: chat content-->
      <div class="inside py_2">
        <div class="time text_center">19:00</div>

        <!-- Start: if it's first chat -->
        <div class="first--chat mb_3">
          <div class="d_flex align_items_center justify_content_center">
            <div class="round av_y" aria-label="your avatar" :style="{backgroundImage: 'url('+srcTest+')'}"></div>
            <div class="round av_f" aria-label="avatar of friend" :style="{backgroundImage: 'url('+srcTest2+')'}"></div>
          </div>
          <div class="text_center mt_2" role="welcome">Hãy gửi lời chào đến thành viên nào đó</div>
        </div>
        <!-- End: if it's first chat -->
        <!-- Start: receiver-->
        <div class="receiver position_relative mb_3">
          <div class="mr_2 position_absolute" role="receiver" :style="{backgroundImage:'url('+srcTest2+')'}"></div>
          <div class="wrap">
            <div class="receiver--content d_flex flex_column">
              <span class="ms rcv_m">Lorem ipsum dolor sit amet, consectetur. </span>
              <span class="ms rcv_m">Lorem ipsum dolor sit amet, consectetur.</span>
              <span class="ms rcv_m">Lorem ipsum dolor sit amet, consectetur.</span>
            </div>
            <!--Start: If have images-->
            <div class="gallery">
              <div class="gallery--item rcv" :style="{ backgroundImage: 'url('+ srcTest2 +')' }">
              </div>
            </div>
            <!--End: If have images-->
          </div>
        </div>
        <!-- End: receiver-->

        <!-- Start: sender -->
        <div class="right d_flex align_items_center justify_content_between mb_3">
          <div role="empty"></div>
          <div class="sender">
            <div class="receiver--content">
              <span class="d_block ms sd_m">Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur. </span>
              <span class="d_block ms sd_m">Lorem ipsum dolor sit amet, consectetur.</span>
              <span class="d_block ms sd_m">Lorem ipsum dolor sit amet, consectetur.</span>
            </div>
            <!--Start: If have images-->
            <div class="gallery d_flex">
              <div class="gallery--item ml_auto sdr" :style="{ backgroundImage: 'url('+ srcTest2 +')' }">
              </div>
            </div>
            <!--End: If have images-->
          </div>
        </div>
        <!-- End: sender -->
      </div>
      <!-- End: Chat content-->
    </vue-perfect-scrollbar>

    <!-- Start: Create message-->
    <div class="mess" ref="inputMessenger">
      <form @submit.prevent="sendMessage">
        <div class="d_flex align_items_center p_3">
          <div class="message">
            <contenteditable tag="div" :contenteditable="true" placeholder="Nhập tin nhắn..." @input="getContentMessengerHeight" @keydown="enterPressed" />
          </div>
          <div class="icon--mess d_flex align_items_center justify_content_between ml_2" role="icon">
            <div class="icon mr_2" @click.prevent="$refs.imageFile.click()">
              <icon-base
                icon-name="menu"
                width="24"
                height="24"
                viewBox="0 0 21 21"
              >
                <icon-upload-image />
              </icon-base>
            </div>
            <div class="icon mr_2">
              <icon-base
                icon-name="menu"
                width="24"
                height="24"
                viewBox="0 0 26 26"
              >
                <icon-smile />
              </icon-base>
            </div>
            <div class="icon mr_2" @click="sendMessage">
              <icon-base
                icon-name="menu"
                width="24"
                height="24"
                viewBox="0 0 500 500"
              >
                <icon-send />
              </icon-base>
            </div>
          </div>
        </div>
      </form>
      <form
        id="formUploadImage"
        enctype="multipart/form-data"
      >
        <input
          class="d_none"
          type="file"
          accept="image/*"
          ref="imageFile"
        />
      </form>
      </div>
    <!-- End: Create message-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentMessengerHeight: 0,
      srcTest: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
      srcTest2: "https://scontent.fhan5-2.fna.fbcdn.net/v/t1.15752-9/61319608_2065780287057450_3340204763407974400_n.jpg?_nc_cat=110&_nc_ht=scontent.fhan5-2.fna&oh=567549ea1537e3a19cca75b90cfebac3&oe=5D9B850E",
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
      this.contentMessengerHeight = document.documentElement.clientHeight - 60 - this.$refs.inputMessenger.clientHeight;
    },
    enterPressed(e) {
      if (e.keyCode === 13 && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        this.sendMessage();
      }
    },
    sendMessage(){
      console.log("hello");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
