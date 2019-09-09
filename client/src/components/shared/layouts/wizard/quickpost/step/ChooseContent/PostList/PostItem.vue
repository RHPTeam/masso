<template>
  <tr :class="{selected: isSelected}" @click="onSelect(item)">
    <td>{{item.title}}</td>
    <td v-if="item._categories">{{item._categories[0].title}}</td>
  </tr>
</template>

<script>
export default {
  props: ["item", "itemOptions", "selectedPost"],
  data() {
    return {
      isSelected: false,
      isViewPostDetails: false
    };
  },
  computed: {},
  methods: {
    onSelect(item) {
      this.isSelected = !this.isSelected;
      if (this.isSelected === true) {
        this.$store.dispatch("addSelectedPostInListTab", this.item);
        this.selectedPost(item);
      } else {
        this.$store.dispatch("removeSelectedPostInListTab", this.item);
      }

      // this.emitCanContinue(true);
      
    },
  }
};
</script>

<style lang="scss" scoped>
td {
  padding: 1rem;
  text-align: left;
  vertical-align: middle;
  &:nth-child(1) {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:nth-child(2) {
    width: 30%;
    text-align: left;
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
