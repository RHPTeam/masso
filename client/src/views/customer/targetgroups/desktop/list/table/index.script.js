import PronounPopup from "../../popup/pronoun";

export default {
  data() {
    return {
      selectedArr: [],
      isShowPronounPopup: false,
      userID: "",
      isSort: [ {
        name: "name",
        asc: false,
        desc: false
      },
      {
        name: "type",
        asc: false,
        desc: false
      },
      {
        name: "account",
        asc: false,
        desc: false
      }
      ],
      users: [ {
        _id: 1,
        profilePicture: "https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/c8.0.32.32a/p32x32/51754547_2326418887581049_7088959473280090112_n.jpg?_nc_cat=106&_nc_oc=AQmq3n43WIrYv7cBhuKNc4LKPnlDQVmhnf02wvKCVtc_j_n7o7YKrSHDkrG_sQP9zgQ&_nc_ht=scontent.fhan3-3.fna&oh=ba5537ff96c39592b3c1ed5b3cbfcdb9&oe=5D4AEDA5",
        name: "Chuyên hàng xách tay Mỹ, Hàn, Nhật",
        type: "page",
        account: "Đặng Yến"
      },
      {
        _id: 1,
        profilePicture: "https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/c8.0.32.32a/p32x32/51754547_2326418887581049_7088959473280090112_n.jpg?_nc_cat=106&_nc_oc=AQmq3n43WIrYv7cBhuKNc4LKPnlDQVmhnf02wvKCVtc_j_n7o7YKrSHDkrG_sQP9zgQ&_nc_ht=scontent.fhan3-3.fna&oh=ba5537ff96c39592b3c1ed5b3cbfcdb9&oe=5D4AEDA5",
        name: "Cho tôi một vé đi tuổi thơ",
        type: "group",
        account: "Đặng Yến"
      }
      ]
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    showType( type ) {
      if ( type === "page" ) {
        return "Trang";
      }
      if ( type === "group" ) {
        return "Nhóm";
      }
    }
  },
  filters: {
    upperCaseFirstLetter( str ) {
      return str[ 0 ].toUpperCase() + str.slice( 1 );
    }
  },
  components: {
    PronounPopup
  }
};
