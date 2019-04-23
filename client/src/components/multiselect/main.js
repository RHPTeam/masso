/* eslint-disable prettier/prettier */
export default {
  props: [ "placeholder", "arrValue", "type", "content", "contentOther" ],
  data() {
    return {
      newValue: "",
      isShow: false
    };
  },
  created() {
    this.$store.dispatch( "getBlocks" );
  },
  computed: {
    arrValueConverted() {
      let result = this.arrValue,
        arrOther = this.blocks;

      if ( result === undefined || result === "" ) {
        return ( result = [] );
      }
      const results = [],
        arr = result.split( "," );

      arr.map( ( id ) => {
        return arrOther.map( ( item ) => {
          if ( item._id === id ) {
            results.push( item.name );
          }
        } );
      } );
      return results;
    },
    blocks() {
      return this.$store.getters.blocks;
    },
    syntax() {
      return this.$store.getters.syntax;
    }
  },
  methods: {
    focus() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
    async addItem( id ) {
      let other = this.arrValue.split( "," ),
        otherChecked;

      other.push( id );
      otherChecked = other.toString();

      if ( otherChecked.charAt( 0 ) === "," ) {
        otherChecked = otherChecked.substr( 1 );
        this.$emit( "update", otherChecked );
      } else {
        this.$emit( "update", otherChecked );
      }
      this.$store.dispatch( "updateSyntax", this.syntax );
    },
    removeItem( index ) {
      let other = this.arrValue.split( "," );

      other.splice( index, 1 );
      this.$emit( "update", other.toString() );
      this.$store.dispatch( "updateSyntax", this.syntax );
    }
  }
};
