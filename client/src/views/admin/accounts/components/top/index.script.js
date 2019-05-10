import convertUnicode from "@/utils/string.util.js";
export default {
  props: [ "isGrid" ],
  data() {
    return {
      search: "",
      isshowStatusFilter: false,
      statusOptions: [ "Tất cả", "Hoạt động", "Đã ngừng" ],
      statusFilter: "Tất cả"
    };
  },
  watch: {
    search() {
      if ( this.search === "" ) {
        if ( this.statusFilter === "Tất cả" ) {
          const data = this.users;

          this.$store.dispatch( "getUsersFilter", data );
        } else if ( this.statusFilter === "Hoạt động" ) {
          let newList = this.users.filter( ( user ) => {
            return user.status === true;
          } );

          this.$store.dispatch( "getUsersFilter", newList );
        } else if ( this.statusFilter === "Đã ngừng" ) {
          let newList = this.users.filter( ( user ) => {
            return user.status === false;
          } );

          this.$store.dispatch( "getUsersFilter", newList );
        }
      } else {
        let newList = this.usersFilter.filter( ( user ) => {
          return this.searchStr( user.email, this.search );
        } );

        this.$store.dispatch( "getUsersFilter", newList );
      }
    }
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    usersFilter() {
      return this.$store.getters.usersFilter;
    }
  },
  methods: {
    changeLayout() {
      this.$emit( "changeLayout", !this.isGrid );
    },
    showStatusFilter() {
      this.isshowStatusFilter = !this.isshowStatusFilter;
    },
    filterByStatus( val ) {
      this.statusFilter = val;
      if ( this.search === "" ) {
        if ( val === "Tất cả" ) {
          const data = this.users;

          this.$store.dispatch( "getUsersFilter", data );
        } else if ( val === "Hoạt động" ) {
          let newList = this.users.filter( ( user ) => {
            return user.status === true;
          } );

          this.$store.dispatch( "getUsersFilter", newList );
        } else if ( val === "Đã ngừng" ) {
          let newList = this.users.filter( ( user ) => {
            return user.status === false;
          } );

          this.$store.dispatch( "getUsersFilter", newList );
        }
      } else if ( val === "Tất cả" ) {
        let data = this.users.filter( ( user ) => {
          return this.searchStr( user.email, this.search );
        } );

        this.$store.dispatch( "getUsersFilter", data );
      } else if ( val === "Hoạt động" ) {
        let newList = this.users.filter( ( user ) => {
          return user.status === true && this.searchStr( user.email, this.search );
        } );

        this.$store.dispatch( "getUsersFilter", newList );
      } else if ( val === "Đã ngừng" ) {
        let newList = this.users.filter( ( user ) => {
          return user.status === false && this.searchStr( user.email, this.search );
        } );

        this.$store.dispatch( "getUsersFilter", newList );
      }
    },
    searchStr( s1, s2 ) {
      const s1Convert = convertUnicode.convertUnicode( s1 ).toLowerCase(),
        s2Convert = convertUnicode.convertUnicode( s2 ).toLowerCase();

      return s1Convert.includes( s2Convert );
    }
  },
  components: {
  }
};
