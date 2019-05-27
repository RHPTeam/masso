
function replaceAll(str, search, replacement) {
  return str.split(search).join(replacement);
};

export default {
  name : 'contenteditable',
  props : {
    'tag' : String,
    'contenteditable' : {
      type : Boolean,
      default : true,
    },
    'value' : String,
    'noHTML' : {
      type : Boolean,
      default : true,
    },
    'noNL' : {
      type : Boolean,
      default : false,
    },
  },
  mounted(){
    this.update_content(this.value);
  },
  computed : {
  },
  data() {
    return {
    }
  },
  methods : {
    current_content(){
      return this.noHTML ?
        this.$refs.element.innerText
        :
        this.$refs.element.innerHTML;
    },
    update_content(newcontent){
      if(this.noHTML) {
        this.$refs.element.innerText = newcontent;
      }
      else {
        this.$refs.element.innerHTML = newcontent;
      }
    },
    update(event) {
      this.$emit('input', this.current_content());
    },
    onPaste(event) {
      event.preventDefault();
      let text = (event.originalEvent || event).clipboardData.getData('text/plain');
      if(this.noNL) {
        text = replaceAll(text, '\r\n', ' ');
        text = replaceAll(text, '\n', ' ');
        text = replaceAll(text, '\r', ' ');
      }
      window.document.execCommand('insertText', false, text);
      this.fwdEv(event)
    },
    onKeypress(event) {
      if(event.key == 'Enter' && this.noNL) {
        event.preventDefault();
        this.$emit('returned', this.current_content);
      }
      this.fwdEv(event)
    },
    fwdEv(event){
      this.$emit(event.type, event);
    }
  },
  watch : {
    value(newval, oldval){
      if(newval != this.current_content()){
        this.update_content(newval);
      }
    }
  }
}
