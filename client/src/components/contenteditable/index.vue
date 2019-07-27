<template>
  <component
    :is="tag"
    :contenteditable="contenteditable"
    @input="update"
    @blur="update"
    @paste="onPaste"
    @keypress="onKeypress"
    @keydown="fwdEv"
    @keyup="fwdEv"
    @mouseenter="fwdEv"
    @mouseover="fwdEv"
    @mousemove="fwdEv"
    @mousedown="fwdEv"
    @mouseup="fwdEv"
    @auxclick="fwdEv"
    @click="fwdEv"
    @dblclick="fwdEv"
    @contextmenu="fwdEv"
    @wheel="fwdEv"
    @mouseleave="fwdEv"
    @mouseout="fwdEv"
    @select="fwdEv"
    @pointerlockchange="fwdEv"
    @pointerlockerror="fwdEv"
    @dragstart="fwdEv"
    @drag="fwdEv"
    @dragend="fwdEv"
    @dragenter="fwdEv"
    @dragover="fwdEv"
    @dragleave="fwdEv"
    @drop="fwdEv"
    @transitionstart="fwdEv"
    @transitioncancel="fwdEv"
    @transitionend="fwdEv"
    @transitionrun="fwdEv"
    @compositionstart="fwdEv"
    @compositionupdate="fwdEv"
    @compositionend="fwdEv"
    @cut="fwdEv"
    @copy="fwdEv"
    ref="element"
  >
  </component>
</template>

<script src="./index.script.js"></script>

<style scoped>
  [contenteditable=true]:empty:before{
    content: attr(placeholder);
    display: block; /* For Firefox */
  }
</style>
