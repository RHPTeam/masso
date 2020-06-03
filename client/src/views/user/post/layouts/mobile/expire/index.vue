<template>
  <div class="main" :data-theme="currentTheme">
    <div class="pricing--plan">
      <div class="plan--expire">
        Tài khoản sử dụng đến ngày:
        <b>{{ formatDate(user.expireDate) }}</b>
      </div>
      <div class="plan--table">
        <div class="table--card">
          <transition name="slide" mode="out-in">
            <card-item v-if="currentCard.id === 0" :currentCard="cardList[0]" key="one"></card-item>
            <card-item v-if="currentCard.id === 1" :currentCard="cardList[1]" key="two"></card-item>
            <card-item v-if="currentCard.id === 2" :currentCard="cardList[2]" key="three"></card-item>
          </transition>
        </div>
        <div class="table--indicator">
          <div class="indicator--holder">
            <button
              @click="showCard(0)"
              :class="{active: currentCard.id === 0}"
              class="holder--btn"
            >{{cardList[0].type}}</button>
            <button
              @click="showCard(1)"
              :class="{active: currentCard.id === 1}"
              class="holder--btn"
            >{{cardList[1].type}}</button>
            <button
              @click="showCard(2)"
              :class="{active: currentCard.id === 2}"
              class="holder--btn"
            >{{cardList[2].type}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from "./card-item";
export default {
  components: {
    CardItem
  },
  data() {
    return {
      cardList: [
        {
          id: 0,
          type: "1 tháng",
          price: "2.800.000",
          fbaccount: "1",
          page: "5",
          group: "500"
        },
        {
          id: 1,
          type: "6 tháng",
          price: "16.199.000",
          fbaccount: "2",
          page: "10",
          group: "500"
        },
        {
          id: 2,
          type: "1 năm",
          price: "28.799.000",
          fbaccount: "2",
          page: "30",
          group: "1000"
        }
      ],
      currentCard: {}
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    user() {
      return this.$store.getters.userInfo;
    }
  },
  created() {
    this.currentCard = this.cardList[0];
  },
  methods: {
    closePopup() {
      this.$emit("close", false);
    },
    formatDate(d) {
      const dateTime = new Date(d),
            date = String(dateTime.getDate()).padStart(2, "0"),
            month = String(dateTime.getMonth() + 1).padStart(2, "0"),
            year = dateTime.getFullYear();

      return `${date}/${month}/${year}`;
    },
    showCard(index) {
      this.currentCard = this.cardList[index];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
