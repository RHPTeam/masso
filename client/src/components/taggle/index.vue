<template>
  <div
    @click="focusNewTag()"
    :class="{
      'read-only': readOnly,
      'vue-input-tag-wrapper--active': isInputActive,
    }"
    class="vue-input-tag-wrapper"
    :data-theme="currentTheme"
  >
    <span v-for="(tag, index) in innerTags" :key="index" class="input-tag">
      <span>{{ tag }}</span>
      <a v-if="!readOnly" @click.prevent.stop="remove(index)" class="remove">
        <slot name="remove-icon"/>
      </a>
    </span>
    <input
      v-if="!readOnly && !isLimit"
      ref="inputtag"
      :placeholder="placeholder"
      type="text"
      v-model="newTag"
      v-on:keydown.delete.stop="removeLastTag"
      v-on:keydown="addNew"
      v-on:blur="handleInputBlur"
      v-on:focus="handleInputFocus"
      class="new-tag"
    >
  </div>
</template>

<script src="./main.js"></script>

<style lang="scss">
.vue-input-tag-wrapper {
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid rgba(16, 16, 16, 0.08);
  overflow: hidden;
  padding: 4px .375rem 0 .375rem;
  cursor: text;
  text-align: left;
  -webkit-appearance: textfield;
  display: flex;
  flex-wrap: wrap;
}
.vue-input-tag-wrapper .input-tag {
  background-color: #f2f2f2;
  border-radius: .375rem;
  color: #444;
  display: inline-block;
  font-size: .875rem;
  font-weight: 400;
  height: 32px;
  line-height: 32px;
  margin-bottom: 4px;
  margin-right: 4px;
  padding: 0 .5rem;
}
.vue-input-tag-wrapper .input-tag .remove {
  cursor: pointer;
  color: #999;
}
.vue-input-tag-wrapper .input-tag .remove:hover {
  text-decoration: none;
}
.vue-input-tag-wrapper .input-tag .remove:empty::before {
  content: " x";
}
.vue-input-tag-wrapper .new-tag {
  background: transparent;
  border: 0;
  color: #777;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 6px;
  margin-top: 1px;
  outline: none;
  padding: 4px;
  flex-grow: 1;
  &::placeholder {
    color: #ccc;
  }
}
.vue-input-tag-wrapper.read-only {
  cursor: default;
}

/* CHANGE THEME _________________________ */

/* DARK */
.vue-input-tag-wrapper[data-theme="dark"]{
  .new-tag {
    color: #ccc;
  }
}


/* LIGHT */
.vue-input-tag-wrapper[data-theme="light"] {
}
</style>
