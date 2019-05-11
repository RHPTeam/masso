export default {
  "getObjectDate": ( str ) => {
    const date = new Date( str );

    return {
      "second": date.getSeconds(),
      "minute": date.getMinutes(),
      "hour": date.getHours(),
      "date": date.getDate(),
      "month": date.getMonth() + 1,
      "year": date.getFullYear(),
      "day": date.getDay()
    };
  }
}
