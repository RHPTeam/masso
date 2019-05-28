<template>
  <div class="sidebar">
    <!-- Start: Header Left Sidebar -->
    <app-header/>
    <!-- Start: Header Left Sidebar -->
    <vue-perfect-scrollbar :style="{ height: windowHeight + 'px' }">
      <!-- Start: Search Left Sidebar -->
      <app-search
        @changeStatus="isShowDefault = $event"
      />
      <!-- Start: Search Left Sidebar -->

      <!-- Start:Result  Search Left Sidebar -->
      <div v-if="isShowDefault === false"
      >
        <result-search
          @backDefault="isShowDefault = $event"
        />
      </div>
      <!-- Start:Result Search Left Sidebar -->

      <!-- Start: List User Left Sidebar -->
      <div v-if="isShowDefault === true">
        <div v-if="!listChat"></div>
        <app-user
          v-else
          v-for="(item, index) in listChat"
          :key="`u-${index}`"
          :mess="item"
        />
      </div>
      <!-- Start: List User Left Sidebar -->
    </vue-perfect-scrollbar>

  </div>
</template>

<script>
import AppHeader from "./header";
import AppSearch from "./search";
import AppUser from "./user";
import ResultSearch from "./friend";

export default {
  components: {
    AppHeader,
    AppSearch,
    AppUser,
    ResultSearch
  },
  data() {
    return {
      isShowDefault: true,
      windowHeight: 0,
      listChat: [
        {
          name: "Đặng Yến",
          avatar: "https://a.wattpad.com/cover/120584330-352-k556620.jpg",
          content: "Trên đời này có tồn tại công bằng hay không",
          time: "19:00",
          status: false
        },
        {
          name: "Lê Khang",
          avatar: "http://static.gamehub.vn/img/files/2015/09/19/GameHub-Tokyo-Ghoul-Game-theo-chan-Manga-huyen-thoai-danh-tieng-Mobile-3.jpg",
          content: "Tất cả mọi người đều có 24 tiếng/ngày. Và đó là sự công bằng.",
          time: "19:00",
          status: true
        },
        {
          name: "Phạm Văn Học",
          avatar: "https://images-na.ssl-images-amazon.com/images/I/51UfgHEbgiL.jpg?scale.width=450",
          content: "Nếu mình nghèo, đừng đổ lỗi cho thế giới vì mình cũng có 24 tiếng để làm giàu",
          time: "19:00",
          status: true
        },
        {
          name: "Nguyễn Công Khanh",
          avatar: "https://www.xemgame.com/data/pictures/images/2015/11/16/Anime_2.jpg",
          content: "Nếu mình kém, đừng đổ lỗi cho thế giới vì mình cũng có 24 tiếng để học hỏi",
          time: "19:00",
          status: false
        },
        {
          name: "Trần Toản",
          content: "Nếu mình ốm, đừng đổ lỗi cho thế giới vì mình cũng có 24 tiếng để xây dựng sức khoẻ",
          avatar: "https://i.a4vn.com/2018/4/3/neu-kaneki-ngay-tu-dau-la-con-gai-tokyo-ghoul-co-le-se-con-noi-t-dad30b.jpg",
          time: "19:00",
          status: false
        },
        {
          name: "Đặng Yến",
          avatar: "https://a.wattpad.com/cover/120584330-352-k556620.jpg",
          content: "Trên đời này có tồn tại công bằng hay không",
          time: "19:00",
          status: false
        },
        {
          name: "Lê Khang",
          avatar: "http://static.gamehub.vn/img/files/2015/09/19/GameHub-Tokyo-Ghoul-Game-theo-chan-Manga-huyen-thoai-danh-tieng-Mobile-3.jpg",
          content: "Tất cả mọi người đều có 24 tiếng/ngày. Và đó là sự công bằng.",
          time: "19:00",
          status: true
        },
        {
          name: "Phạm Văn Học",
          avatar: "https://images-na.ssl-images-amazon.com/images/I/51UfgHEbgiL.jpg?scale.width=450",
          content: "Nếu mình nghèo, đừng đổ lỗi cho thế giới vì mình cũng có 24 tiếng để làm giàu",
          time: "19:00",
          status: true
        },
        {
          name: "Nguyễn Công Khanh",
          avatar: "https://www.xemgame.com/data/pictures/images/2015/11/16/Anime_2.jpg",
          content: "Nếu mình kém, đừng đổ lỗi cho thế giới vì mình cũng có 24 tiếng để học hỏi",
          time: "19:00",
          status: false
        },
        {
          name: "Trần Toản",
          content: "Nếu mình ốm, đừng đổ lỗi cho thế giới vì mình cũng có 24 tiếng để xây dựng sức khoẻ",
          avatar: "https://i.a4vn.com/2018/4/3/neu-kaneki-ngay-tu-dau-la-con-gai-tokyo-ghoul-co-le-se-con-noi-t-dad30b.jpg",
          time: "19:00",
          status: false
        },
        {
          name: "Đặng Yến",
          avatar: "https://a.wattpad.com/cover/120584330-352-k556620.jpg",
          content: "Trên đời này có tồn tại công bằng hay không",
          time: "19:00",
          status: false
        },
        {
          name: "Lê Khang",
          avatar: "http://static.gamehub.vn/img/files/2015/09/19/GameHub-Tokyo-Ghoul-Game-theo-chan-Manga-huyen-thoai-danh-tieng-Mobile-3.jpg",
          content: "Tất cả mọi người đều có 24 tiếng/ngày. Và đó là sự công bằng.",
          time: "19:00",
          status: true
        },
        {
          name: "Phạm Văn Học",
          avatar: "https://images-na.ssl-images-amazon.com/images/I/51UfgHEbgiL.jpg?scale.width=450",
          content: "Nếu mình nghèo, đừng đổ lỗi cho thế giới vì mình cũng có 24 tiếng để làm giàu",
          time: "19:00",
          status: true
        },
        {
          name: "Nguyễn Công Khanh",
          avatar: "https://www.xemgame.com/data/pictures/images/2015/11/16/Anime_2.jpg",
          content: "Nếu mình kém, đừng đổ lỗi cho thế giới vì mình cũng có 24 tiếng để học hỏi",
          time: "19:00",
          status: false
        },
        {
          name: "Trần Toản",
          content: "Nếu mình ốm, đừng đổ lỗi cho thế giới vì mình cũng có 24 tiếng để xây dựng sức khoẻ",
          avatar: "https://i.a4vn.com/2018/4/3/neu-kaneki-ngay-tu-dau-la-con-gai-tokyo-ghoul-co-le-se-con-noi-t-dad30b.jpg",
          time: "19:00",
          status: false
        },
        {
          name: "Đặng Yến",
          avatar: "https://a.wattpad.com/cover/120584330-352-k556620.jpg",
          content: "Trên đời này có tồn tại công bằng hay không",
          time: "19:00",
          status: false
        },
        {
          name: "Lê Khang",
          avatar: "http://static.gamehub.vn/img/files/2015/09/19/GameHub-Tokyo-Ghoul-Game-theo-chan-Manga-huyen-thoai-danh-tieng-Mobile-3.jpg",
          content: "Tất cả mọi người đều có 24 tiếng/ngày. Và đó là sự công bằng.",
          time: "19:00",
          status: true
        },
        {
          name: "Phạm Văn Học",
          avatar: "https://images-na.ssl-images-amazon.com/images/I/51UfgHEbgiL.jpg?scale.width=450",
          content: "Nếu mình nghèo, đừng đổ lỗi cho thế giới vì mình cũng có 24 tiếng để làm giàu",
          time: "19:00",
          status: true
        },
        {
          name: "Nguyễn Công Khanh",
          avatar: "https://www.xemgame.com/data/pictures/images/2015/11/16/Anime_2.jpg",
          content: "Nếu mình kém, đừng đổ lỗi cho thế giới vì mình cũng có 24 tiếng để học hỏi",
          time: "19:00",
          status: false
        },
        {
          name: "Trần Toản",
          content: "Nếu mình ốm, đừng đổ lỗi cho thế giới vì mình cũng có 24 tiếng để xây dựng sức khoẻ",
          avatar: "https://i.a4vn.com/2018/4/3/neu-kaneki-ngay-tu-dau-la-con-gai-tokyo-ghoul-co-le-se-con-noi-t-dad30b.jpg",
          time: "19:00",
          status: false
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowHeight);
      this.getWindowHeight()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowHeight);
  },
  methods: {
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight - 60;
    }
  }
}
</script>

<style scoped>

</style>
