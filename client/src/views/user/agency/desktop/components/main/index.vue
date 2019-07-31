<template>
  <div class="main">
    <div class="item--header d_flex align_items_center px_3 py_2">
<<<<<<< HEAD
      <div class="col col--name px_2">
          Tên thành viên
      </div>
      <div class="col col--category px_2">Email</div>
      <div class="col col--category px_2">Số điện thoại</div>
      <div class="col col--category px_2">Loại kích hoạt</div>
      <div class="col col--action px_4">Hành động</div>
    </div>
    <div v-if="resultsDefault === false">
      <div v-if="!agency">Không có dữ liệu</div>
=======
      <div class="col col--name px_2">Tên thành viên</div>
      <div class="col col--category px_2">Email</div>
      <div class="col col--category px_2">Số điện thoại</div>
      <div class="col col--category px_2 activated">Loại kích hoạt</div>
      <div class="col col--action px_4">Hành động</div>
    </div>
    <div v-if="resultsDefault === false">
      <div v-if="!agency" class="text_center my_2">Không có dữ liệu</div>
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5
      <app-item
        v-else
        v-for="(member, index) in agency"
        :key="index"
        :member="member"
        @openEdit="openPopupEditInfoMember($event)"
      />
    </div>
    <div v-else>
<<<<<<< HEAD
      <div v-if="!infoMember">Không có dữ liệu</div>
=======
      <div v-if="!infoMember" class="text_center my_2">Không có dữ liệu</div>
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5
      <div class="item--body d_flex align_items_center px_3 py_2" v-else>
        <!-- Start: Name Column -->
        <div class="col col--name px_2">
          <div
            class="col col--name-text"
            @click.prevent="editMember(infoMember)"
<<<<<<< HEAD
          >
            {{infoMember.user.name}}
          </div>
=======
          >{{infoMember.user.name}}</div>
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5
        </div>
        <!-- End: Name Column -->
        <!-- Start: Email Column -->
        <div class="col col--category px_2">
<<<<<<< HEAD
      <span>
        {{infoMember.user.email}}
      </span>
=======
          <span>{{infoMember.user.email}}</span>
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5
        </div>
        <!-- End: Email Column -->
        <!-- Start: Phone Column -->
        <div class="col col--category px_2">
<<<<<<< HEAD
      <span>
        {{infoMember.user.phone}}
      </span>
        </div>
        <!-- End: Phone Column -->
        <!-- Start: Type Column -->
        <div class="col col--category px_2 text_center">
      <span>
        {{infoMember.typeUser}}
      </span>
=======
          <span>{{infoMember.user.phone}}</span>
        </div>
        <!-- End: Phone Column -->
        <!-- Start: Type Column -->
        <div class="col col--category px_2 text_center activated">
          <span>{{infoMember.typeUser}}</span>
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5
        </div>
        <!-- End: Type Column -->

        <!-- Start: Action Column -->
<<<<<<< HEAD
        <div class="col d_flex align_items_center justify_content_center col--action px_4 text_center">
          <div
            class="mx_2"
            @click.prevent="editMember(infoMember)"
          >
=======
        <div
          class="col d_flex align_items_center justify_content_center col--action px_4 text_center"
        >
          <div class="mx_2" @click.prevent="editMember(infoMember)">
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5
            <icon-base icon-name="Chỉnh sửa" viewBox="0 0 20 20">
              <icon-edit />
            </icon-base>
          </div>
        </div>
        <!-- End: Action Column -->
      </div>
    </div>
  </div>
</template>

<script>
import AppItem from "./components/item";
export default {
  components: {
    AppItem
  },
<<<<<<< HEAD
  props: [ "resultsDefault" ],
  computed: {
    agency(){
      return this.$store.getters.memberAgency;
    },
    infoMember(){
      return this.$store.getters.infoOfMember[0];
    }
  },
  async created(){
    const agencies = this.$store.getters.memberAgency;
    if(agencies && agencies.length === 0) {
      await this.$store.dispatch("getInfoAgency");
    }
  },
  methods: {
    async editMember(val){
=======
  props: ["resultsDefault"],
  computed: {
    agency() {
      return this.$store.getters.memberAgency;
    },
    infoMember() {
      return this.$store.getters.infoOfMember[0];
    }
  },
  methods: {
    async editMember(val) {
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5
      await this.$store.dispatch("getInfoMember", val.user._id);
      this.$emit("openPopup", true);
    },
    openPopupEditInfoMember(val) {
      this.$emit("openPopupEdit", val);
    }
<<<<<<< HEAD
  },
}
=======
  }
};
>>>>>>> ab7b2e308aeb87aa72ec6b4d56b7390667fca5f5
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
