<template>
  <div class="section--block">
    <div class="section--body mt_2">
      <div class="box">
        <div class="form--group d_flex align_items_center">
          <input
            class="form--control text_center mr_2"
            type="text"
            v-model="event.break_point"
            @input="changeTimeWaitDefault()"
          />
          <div class="unit">phút</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    event() {
      return this.$store.getters.event;
    }
  },
  created() {

  },
  watch: {
  },
  methods: {
    changeTimeWaitDefault() {
      this.$store.dispatch("setEvent", {
        key: "break_point",
        value: Number(this.event.break_point)
      });
    },
   
  }
};
</script>

.<style lang="scss" scoped>
.box {
  &--detail {
    background-color: #2f3136;
    border-radius: 0.5rem;
    color: #f7f7f7;
    cursor: pointer;
    font-size: 0.875rem;
    height: 36px;
    line-height: 36px;
    padding: 0 0.75rem;
    text-decoration: underline;
    transition: all 0.4s ease;
    &:hover {
      background-color: #3b3e43;
    }
  }
  .form--group {
    .form--control {
      background-color: transparent;
      border: 1px solid #444;
      border-radius: 0.5rem;
      color: #f7f7f7;
      height: 43px;
      line-height: 36px;
      outline: 0;
      width: 60px;
      &.error {
        border: 1px solid #f96666;
      }
    }
  }
}

.section {
  margin-left: 44px;
  &--title {
    color: #ccc;
    font-size: 0.825rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  &--body {
  }
}

/*Transition popup*/
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.4s;
}
.popup-enter,
.popup-leave-to {
  opacity: 0;
}
</style>
