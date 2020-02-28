export default class TimeUtil {
  // 是否过时
  static checkDate(longTime) {
    let cDate = new Date();
    let tDate = new Date();
    tDate.setTime(longTime);
    if (cDate.getMonth() !== tDate.getMonth()) {
      return false;
    }
    if (cDate.getDay() !== tDate.getDay()) {
      return false;
    }
    if (cDate.getHours() - tDate.getHours() > 4) {
      return false;
    }
    return true;
  }

  // 时间转换
  static dateToYMD(dateString) {
    if (!dateString) {
      return dateString;
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    return `${year}/${month}/${day} ${hour > 11 ? '下午' : '上午'}`;
  }

  // 文本限制
  static stringLimit(description, limit) {
    return description.length < limit
      ? description
      : `${description.slice(0, limit)}...`;
  }
}
