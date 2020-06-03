export default {
  removeDuplicateObject(arr, nest, key ) {
    const result = arr.map( e => e[nest][key] )
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e])
      .map(e => arr[e]);
    return result;
  },
  removeDuplicateObjectInArray( arr, comp ) {
    const unique = arr
      .map( ( e ) => e[ comp ] )

      // store the keys of the unique objects
      .map( ( e, i, final ) => final.indexOf( e ) === i && i )

      // eliminate the dead keys & store unique objects
      .filter( ( e ) => arr[ e ] ).map( ( e ) => arr[ e ] );

    return unique;
  }
}
