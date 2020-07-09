export const addZero = str => {
  let strCopy = "" + str;
  if (strCopy.length == 1) {
    return `0${strCopy}`;
  }
  return strCopy;
};
export default {};
