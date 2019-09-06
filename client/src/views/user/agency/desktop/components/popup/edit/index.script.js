import Datepicker from "@/components/datepicker";
export default {
  components: {
    Datepicker
  },
  computed: {
    roles() {
      return this.$store.getters.roles;
    },
    user() {
      return this.$store.getters.member;
    },
    formatDateCreate: {
      get() {
        const newDate = new Date(this.user.expireDate),
          year = newDate.getFullYear(),
          month = newDate.getMonth() + 1,
          date = newDate.getDate();

        return `${date}-${month}-${year}`;
      },
      set(val) {
        let valArr = val.split("-");
        const newDate = new Date(valArr[2], valArr[1] - 1, valArr[0]),
          year = newDate.getFullYear(),
          month = newDate.getMonth() + 1,
          date = newDate.getDate();

        this.user.expireDate = `${year}-${month}-${date}`;
      }
    }
  },
  methods: {
    closeAddEdit() {
      this.$emit("closeAddEdit", false);
    },
    changeDateSetup(value) {
      const dataSender = {
        userId: this.user._id,
        expireDate: new Date(value)
      };
      this.$store.dispatch("expireMember", dataSender);
    },
    updateAccount() {
      this.$emit("closeAddEdit", false);
    }
  },
  filters: {
    getFirstLetter(string) {
      return string.charAt(0).toUpperCase();
    }
  },
  data() {
    return {
      radio: true
    };
  }
};
