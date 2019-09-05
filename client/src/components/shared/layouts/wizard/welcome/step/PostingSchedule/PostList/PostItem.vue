<template>
  <tr>
    <td>{{itemTitle}}</td>
    <td v-if="itemTotal || itemTotal === 0">{{itemTotal}}</td>
    <td v-if="itemOptions">{{itemOptions}}</td>
  </tr>
</template>

<script>


export default {
  props: ["item","itemTitle", "itemTotal", "itemOptions"],
  components: {

  },
  data() {
    return {

    };
  },
  methods: {

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
  transition: 0.2s all;
  &:hover {
    background-color: #1d1e1f;
  }
}

</style>
