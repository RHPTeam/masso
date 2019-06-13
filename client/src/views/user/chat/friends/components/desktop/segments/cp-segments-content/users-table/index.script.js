import PronounPopup from "../../../popup/pronoun-popup";
import ConvertUnicode from "@/utils/functions/string";

export default {
  props: ["groupSelected", "keywordSearch", "accountSelected", "selectFilter", "resultsDefault"],
  data() {
    return {
      selectedArr: [],
      isShowPronounPopup: false,
      userID: "",
      isSort: [
        {
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
      currentPage: 1,
      totalCount: null,
      perPage: 20,
      isShowPaginateSearch: false,
      isShowPaginate: true,
      showLoader: true
    };
  },
  async created() {
    // if (this.$store.getters.allFriends.length === 0) {
    //   await this.$store.dispatch("getFriendsBySize", 20);
    // }
    // await this.$store.dispatch( "getAllFriendFacebook" );
    await this.$store.dispatch("selectedUIDs", []);
    /**
     *  get info friends with page = 1 and size default = 20
     * @returns array
     */
    await this.$store.dispatch("getFriendFacebookBySizeDefault", {
      size:  this.perPage,
      page: this.currentPage
    });
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    friendFilter() {
      return this.$store.getters.userFilter;
    },
    filteredUsers() {
      if (this.accountSelected.id === "all") {
        return this.users.filter(user => {
          return user.fullName
            .toString()
            .toLowerCase()
            .includes(this.keywordSearch.toString().toLowerCase());
        });
      } else {
        return this.users.filter(user => {
          return (
            user.fullName
              .toString()
              .toLowerCase()
              .includes(this.keywordSearch.toString().toLowerCase()) &&
            user._facebook.includes(this.accountSelected.id)
          );
        });
      }
    },
    filteredUsersOfGroup() {
      if (this.accountSelected.id === "all") {
        return this.usersOfGroup.filter(user => {
          return user.fullName
            .toString()
            .toLowerCase()
            .includes(this.keywordSearch.toString().toLowerCase());
        });
      } else {
        return this.usersOfGroup.filter(user => {
          return (
            user.fullName
              .toString()
              .toLowerCase()
              .includes(this.keywordSearch.toString().toLowerCase()) &&
            this.userOfFBAccount(user._id, this.accountSelected.id)
          );
        });
      }
    },
    // selectAll: {
    //   get() {
    //     if (this.groupSelected === false) {
    //       return this.users
    //         ? this.selectedUIDs.length === this.users.length
    //         : false;
    //     } else {
    //       return this.usersOfGroup
    //         ? this.selectedUIDs.length === this.usersOfGroup.length
    //         : false;
    //     }
    //   },
    //   set(value) {
    //     let selected = [];
    //     if (this.groupSelected === false) {
    //       if (value) {
    //         this.users.forEach(function(user) {
    //           selected.push(user._id);
    //         });
    //       }
    //     } else {
    //       if (value) {
    //         this.usersOfGroup.forEach(function(user) {
    //           selected.push(user._id);
    //         });
    //       }
    //     }
    //
    //     this.selectedArr = selected;
    //     this.$store.dispatch("selectedUIDs", this.selectedArr);
    //   }
    // },
    users() {
      if(this.$store.getters.friendFacebook === undefined) return;
      return this.$store.getters.friendFacebook;
    },
    /**
     *  get info all friends
     * @returns array
     */
    listFriendDefault(){
      if(this.$store.getters.friendFacebookDefault === undefined) return;
      return this.$store.getters.friendFacebookDefault;
    },
    /**
     *  get info group friends by id
     * @returns array
     */
    listFriendOfGroup(){
      if(this.$store.getters.groupFriend === undefined) return;
      return this.$store.getters.groupFriend;
    },
    /**
     *  get page in results
     * @returns array
     */
    numberPageCurrent(){
      return this.$store.getters.numberPageFriendCurrent;
    },
    /**
     *  set, get user when select user add to group friends
     *  save array in store
     * @returns array
     */
    selectedUIDs: {
      get() {
        return this.$store.getters.selectedUIDs;
      },
      set(value) {
        this.$store.dispatch("selectedUIDs", value);
      }
    }
  },
  methods: {
    /**
     *  check currenPage  and dispatch event paginate when load all friends
     *
     * @returns array
     */
    async loadMore(){
      if( this.showLoader === true ) {
        if(this.currentPage > this.numberPageCurrent) {
          return false;
        } else {
          this.showLoader = false;

          this.currentPage += 1;

          await this.$store.dispatch("getFriendFacebookBySize", {
            size: this.perPage,
            page: this.currentPage
          });

          this.showLoader = true;
        }
      }
    },
    showPronounPopup(val) {
      this.isShowPronounPopup = true;
      const dataSender = {
        name: "Bạn bè",
        _friends: val
      }
      this.$store.dispatch("setVocateDefault", dataSender);
    },
    sortUsersByProperty(data, index) {
      const attr = data.name;
      // Sort Asecending
      if (data.asc === false) {
        if (this.groupSelected === false) {
          this.users.sort(function(a, b) {
            var valA = ConvertUnicode.convertUnicode(a[attr].toUpperCase());
            var valB = ConvertUnicode.convertUnicode(b[attr].toUpperCase());
            if (valA < valB) {
              return -1;
            }
            if (valA > valB) {
              return 1;
            }
            return 0;
          });
        } else {
          this.usersOfGroup.sort(function(a, b) {
            var valA = ConvertUnicode.convertUnicode(a[attr].toUpperCase());
            var valB = ConvertUnicode.convertUnicode(b[attr].toUpperCase());
            if (valA < valB) {
              return -1;
            }
            if (valA > valB) {
              return 1;
            }
            return 0;
          });
        }
        this.activeCurrentSort(index, "asc");
      } // Sort Descending
      else if (data.desc === false) {
        if (this.groupSelected === false) {
          this.users.sort(function(a, b) {
            var valA = ConvertUnicode.convertUnicode(a[attr].toUpperCase());
            var valB = ConvertUnicode.convertUnicode(b[attr].toUpperCase());
            if (valA > valB) {
              return -1;
            }
            if (valA < valB) {
              return 1;
            }
            return 0;
          });
        } else {
          this.usersOfGroup.sort(function(a, b) {
            var valA = ConvertUnicode.convertUnicode(a[attr].toUpperCase());
            var valB = ConvertUnicode.convertUnicode(b[attr].toUpperCase());
            if (valA > valB) {
              return -1;
            }
            if (valA < valB) {
              return 1;
            }
            return 0;
          });
        }
        this.activeCurrentSort(index, "desc");
      }
    },
    activeCurrentSort(i, type) {
      this.isSort.forEach((item, index) => {
        if (index === i) {
          if (type === "asc") {
            item.asc = true;
            item.desc = false;
          } else {
            item.asc = false;
            item.desc = true;
          }
        } else {
          item.asc = false;
          item.desc = false;
        }
      });
    },
    onPageChange(page) {
      this.currentPage = page;
    },
    goToPage(page) {
      const dataSender = {
        name: this.keywordSearch,
        size: 20,
        page: page
      };
      this.$store.dispatch("searchFriendsByNameAndPage", dataSender);
    },
    userOfFBAccount(uid, fid) {
      let check = false;
      this.users.forEach(user => {
        if (user._id === uid) {
          if (user._facebook.includes(fid)) {
            check = true;
          }
        }
      });
      if (check) return true;
      else return false;
    }
  },
  filters: {
    covertDateUpdatedAt(d) {
      const newDate = new Date(d);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const date = newDate.getDate();
      const hour = newDate.getHours();
      let minutes = newDate.getMinutes();
      if (minutes < 10) minutes = minutes + "0";
      return `${hour}:${minutes}, ${date}/${month}/${year}`;
    },
    upperCaseFirstLetter(str) {
      return str[0].toUpperCase() + str.slice(1);
    }
  },
  watch: {
    keywordSearch(value) {
      if (value.length !== 0) {
        // console.log("open paginate");
        this.isShowPaginate = false;
        this.isShowPaginateSearch = true;
      }
    }
  },
  components: {
    PronounPopup
  }
};
