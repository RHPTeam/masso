<template>
  <div class="auto--form">
    <auto-resize-textarea
      :left-characters="leftCharacters"
      :max-length="maxLength"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue( $event )"
      @updateLeftCharacters="leftCharacters = $event"
    ></auto-resize-textarea>
    <div class="characters--count"
         :class="{ warning: leftCharacters < 10 }"
    >
      {{ leftCharacters }}
    </div>
    <div class="wrap--mask" v-html="value">{{ value }}</div>
  </div>
</template>

<script>
import AutoResizeTextarea from "./components/AutoResizeTextarea";

export default {
  components: {
    AutoResizeTextarea
  },
  props: {
    /**
     * Placeholder in textarea
     */
    placeholder: {
      type: String,
      default: ""
    },
    /*
     * Property to accept value from parent
     */
    value: {
      type: [ String, Number ],
      default: ""
    },
    /*
     * Allow to enable/disable auto resizing dynamically
     */
    autosize: {
      type: Boolean,
      default: true
    },
    /*
     * Min textarea height
     */
    minHeight: {
      type: [ Number ],
      default: null
    },
    /*
     * Max textarea height
     */
    maxHeight: {
      type: [ Number ],
      default: null
    },
    /**
     * Max length of value in textarea
     */
    maxLength: {
      type: Number,
      default: 640
    },
    /*
     * Force !important for style properties
     */
    important: {
      type: [ Boolean, Array ],
      default: false
    }
  },
  data() {
    return {
      leftCharacters: 640
    }
  },
  created() {
    this.leftCharacters = this.maxLength;
  },
  methods: {
    updateValue( val ) {
      this.$emit( "input", val );
    }
  }
}
</script>

<style scoped lang="scss">
@import "./style";
</style>
