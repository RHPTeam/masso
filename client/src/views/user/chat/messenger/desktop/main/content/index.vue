<template>
  <div class="d_flex flex_column position_relative" role="chat" :data-theme="currentTheme">
    <vue-perfect-scrollbar class="p_2" :style="{ height: contentMessengerHeight + 'px' }">
      <!-- Start: Info friends-->
      <div class="info d_flex align_items_center p_3" role="above">
        <div class="avatar mr_3" :style="{backgroundImage: 'url('+srcTest+')'}"></div>
        <div role="infomation">
          <h3 class="m_0">Liu Lang</h3>
          <p class="m_0">Các bạn là bạn bè kết nối trên zinbee</p>
        </div>
      </div>
      <!-- End: Info friends-->

      <!-- Start: chat content-->
      <div class="inside py_2">
        <div class="time text_center">19:00</div>

        <!-- Start: if it's first chat -->
        <div class="first--chat mb_3">
          <div class="d_flex align_items_center justify_content_center">
            <div class="round av_y" aria-label="your avatar" :style="{backgroundImage: 'url('+srcTest+')'}"></div>
            <div class="round av_f" aria-label="avatar of friend" :style="{backgroundImage: 'url('+srcTest+')'}"></div>
          </div>
          <div class="text_center mt_2" role="welcome">Hãy gửi lời chào đến thành viên nào đó</div>
        </div>
        <!-- End: if it's first chat -->
        <!-- Start: receiver-->
        <div class="left d_flex align_items_start justify_content_start position_relative mb_3">
          <div class="mr_2 position_absolute" role="receiver" :style="{backgroundImage:'url('+srcTest+')'}"></div>
          <div class="receiver">
            <div class="content d_flex flex_column">
              <span class="ms rcv_m position_relative">
                Lorem ipsum dolor sit amet, consectetur.
                <span class="time position_absolute">Chủ nhật 13:00 Chiều</span>
              </span>
            </div>
            <!--Start: If have images-->
            <div class="gallery">
              <div
                class="gallery--item rcv position_relative"
                :style="{ backgroundImage: 'url('+ srcTest +')' }"
                @click="isShowGallery = true"
              >
                <span class="time position_absolute">Chủ nhật 13:00 Chiều</span>
              </div>
            </div>
            <!--End: If have images-->
          </div>
          <div role="empty"></div>
        </div>
        <!-- End: receiver-->

        <!-- Start: sender -->
        <div class="right d_flex justify_content_end align_items_end mb_3">
          <div role="empty"></div>
          <div class="sender">
            <div class="content d_flex flex_column">
              <span class="ms sd_m ml_auto position_relative">
                Lorem ipsum dolor sit amet, consectetur.
                <span class="time position_absolute">Chủ nhật 13:00 Chiều</span>
              </span>
            </div>
            <!--Start: If have images-->
            <div class="gallery d_flex">
              <div
                class="gallery--item ml_auto sdr position_relative"
                :style="{ backgroundImage: 'url('+ srcTest +')' }"
                @click="isShowGallery = true"
              >
                <span class="time position_absolute">Chủ nhật 13:00 Chiều</span>
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
    <div class="mess position_relative" ref="inputMessenger">
      <form @submit.prevent="sendMessage">
        <div class="d_flex align_items_center p_3">
          <div class="message">
            <contenteditable tag="div" :contenteditable="true" placeholder="Nhập tin nhắn..." @input="getContentMessengerHeight" @keydown="enterPressed" />
          </div>
          <div class="icon--mess d_flex align_items_center justify_content_between ml_2" role="icon">
            <div class="icon mr_2" @click.prevent="$refs.imageFile.click()">
              <icon-base
                icon-name="menu"
                width="23"
                height="23"
                viewBox="0 0 21 21"
              >
                <icon-image />
              </icon-base>
            </div>
            <div class="icon mr_2" @click="isShowEmoji = !isShowEmoji">
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
      <!-- Start: PopUp Show Option Emoji -->
      <app-emoji v-if="isShowEmoji === true" />
      <!-- End: PopUp Show Option Emoji -->
    </div>
    <!-- End: Create message-->

    <!-- Start: Gallery -->
    <slides
      v-if="isShowGallery === true"
      :message="item"
      @closeGallery="isShowGallery = $event"
    />
    <!-- End: Gallery -->

    <!-- Start: Search messenger -->
    <app-search
      v-if="variableControlSearch.messenger === true"
      :currentTheme="currentTheme"
    />
    <!-- End: Search messenger -->

    <!--Start: Change Color messenger-->
    <app-select-color
      v-if="variableControlSearch.color === true"
      :currentTheme="currentTheme"
    />
    <!--End: Change Color messenger -->
  </div>
</template>

<script>
import AppEmoji from "./components/emoji";
import AppSearch from "./components/search";
import AppSelectColor from "./components/changecolor";
import Slides from "./components/gallery";
export default {
  components: {
    AppEmoji,
    AppSearch,
    AppSelectColor,
    Slides
  },
  props: {
    currentTheme: {
      type: String,
      default: "dark"
    }
  },
  data() {
    return {
      isShowGallery: false,
      isShowEmoji: false,
      contentMessengerHeight: 0,
      item: {
        typeContent: "image",
        valueContent: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg"
      },
      srcTest: "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg",
      srcTest2: "https://scontent.fhan5-2.fna.fbcdn.net/v/t1.15752-9/61319608_2065780287057450_3340204763407974400_n.jpg?_nc_cat=110&_nc_ht=scontent.fhan5-2.fna&oh=567549ea1537e3a19cca75b90cfebac3&oe=5D9B850E",
    }
  },
  computed: {
    variableControlSearch(){
      return this.$store.getters.caseControl;
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
