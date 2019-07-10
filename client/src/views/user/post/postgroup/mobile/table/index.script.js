import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
    data() {
        return {
            isShowTabFanpage: true,
            isShowTabGroup: false
        }
    },
    components: {
        VuePerfectScrollbar
    },
    methods: {
        showTabFanpage() {
            this.isShowTabFanpage = true;
            this.isShowTabGroup = false;
        },
        showTabGroup() {
            this.isShowTabGroup = true;
            this.isShowTabFanpage = false;
        }
    },
}