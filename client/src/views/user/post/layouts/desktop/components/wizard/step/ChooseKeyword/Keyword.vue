<template>
  <div
    class="keyword"
    :class="{selected: isSelected}"
    :style="{backgroundColor: keyword.backgroundColor, borderColor: keyword.backgroundColor}"
    @click="selectKeyword()"
  >{{keyword.title}}</div>
</template>

<script>
export default {
  props: ["keyword"],
  data() {
    return {
      isSelected: false
    };
  },
  computed: {
    // isSelectedKeyword() {
    //   return {
    //     keyword: this.keyword.title,
    //     isSelected: this.isSelected
    //   };
    // }
  },
  methods: {
    selectKeyword() {
      this.isSelected = !this.isSelected;
      this.keyword.isSelected = this.isSelected;
      this.$emit("selectedKeyword", this.keyword);
    }
  }
};
</script>

<style lang="scss" scoped>
.keyword {
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 5px;
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
  border-radius: 5px;
  border-style: solid;
  border-width: 5px;
  &:active {
    transform: scale(0.97);
  }
}

.selected {
  border-style: dashed;
  border-color: #ccc !important;
}
</style>
