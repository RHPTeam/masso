import PronounPopup from "../../popup/pronoun";

export default {
  data() {
    return {
      selectedArr: [],
      isShowPronounPopup: false,
      userID: "",
      isSort: [ {
        name: "fullName",
        asc: false,
        desc: false
      },
      {
        name: "gender",
        asc: false,
        desc: false
      },
      {
        name: "vocate",
        asc: false,
        desc: false
      },
      {
        name: "updated_at",
        asc: false,
        desc: false
      },
      {
        name: "attribute",
        asc: false,
        desc: false
      },
      {
        name: "status",
        asc: false,
        desc: false
      }
      ],
      users: [ {
        _id: 1,
        profilePicture: "https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/c8.0.32.32a/p32x32/51754547_2326418887581049_7088959473280090112_n.jpg?_nc_cat=106&_nc_oc=AQmq3n43WIrYv7cBhuKNc4LKPnlDQVmhnf02wvKCVtc_j_n7o7YKrSHDkrG_sQP9zgQ&_nc_ht=scontent.fhan3-3.fna&oh=ba5537ff96c39592b3c1ed5b3cbfcdb9&oe=5D4AEDA5",
        fullName: "Đặng Yến",
        gender: "female_singular",
        updatedAt: "",
        vocate: "Chưa thiết lập"
      },
      {
        _id: 1,
        profilePicture: "https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-1/c8.0.32.32a/p32x32/51754547_2326418887581049_7088959473280090112_n.jpg?_nc_cat=106&_nc_oc=AQmq3n43WIrYv7cBhuKNc4LKPnlDQVmhnf02wvKCVtc_j_n7o7YKrSHDkrG_sQP9zgQ&_nc_ht=scontent.fhan3-3.fna&oh=ba5537ff96c39592b3c1ed5b3cbfcdb9&oe=5D4AEDA5",
        fullName: "Trần Toản",
        gender: "male_singular",
        updatedAt: "",
        vocate: "Chưa thiết lập"
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
    showGender( gender ) {
      if ( gender === "male_singular" ) {
        return "Nam";
      }
      if ( gender === "female_singular" ) {
        return "Nữ";
      }
      return "Chưa xác định";
                
            
    },
    showPronounPopup( uid ) {
      this.isShowPronounPopup = true;
      this.userID = uid;
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
