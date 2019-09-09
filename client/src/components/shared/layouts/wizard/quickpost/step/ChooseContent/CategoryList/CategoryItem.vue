<template>
  <tr :class="{selected: isSelected}" @click="onSelect(item)" v-click-outside="unSelected">
    <td>{{item.title}}</td>
    <td>{{item.totalPosts}}</td>
    <!-- <td v-if="itemOptions" @click="toggleViewPostDetails">
      {{itemOptions}}
    </td>-->
    <td></td>
    <transition name="slide-fade">
      <details-popup
        :toggleViewPostDetails="toggleViewPostDetails"
        v-if="isViewPostDetails"
        :postList="item.postList"
        :categoryTitle="item.title"
      />
    </transition>
  </tr>
</template>

<script>
import DetailsPopup from "./DetailsPopup";

export default {
  props: ["item", "itemOptions", "emitCanContinue", "selectedCategory"],
  components: {
    DetailsPopup
  },
  data() {
    return {
      isSelected: false,
      isViewPostDetails: false
    };
  },
  computed: {},
  methods: {
    onSelect(item) {
      this.isSelected = true;
      this.$store.dispatch("updateSelectedCategoryInListTab", this.item);
      this.emitCanContinue(true);
      this.selectedCategory(item);
    },
    unSelected() {
      this.isSelected = false;
    },
    toggleViewPostDetails() {
      this.isViewPostDetails = !this.isViewPostDetails;
      console.log("😀", this.isViewPostDetails);
    }
  }
};
</script>

<style lang="scss" scoped>
td {
  padding: 1rem;
  text-align: left;
  vertical-align: middle;
  &:nth-child(1) {
    width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:nth-child(2) {
    width: 20%;
    text-align: center;
  }
  &:nth-child(3) {
    width: 20%;
    text-align: center;
  }
}
tr {
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    background-color: #1d1e1f;
  }
}

.selected {
  background-color: #5c5e60 !important;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s ease;
}
.slide-fade-enter {
  transform: translateY(-20px);
  opacity: 30;
}
.slide-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
