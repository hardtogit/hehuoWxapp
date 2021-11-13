export const addZero = str => {
  let strCopy = "" + str;
  if (strCopy.length == 1) {
    return `0${strCopy}`;
  }
  return strCopy;
};
export default {};

export const getTimeArr=(start,end)=>{
  let timeArr=[]
  if(!start||!end){
    return timeArr
  }
  const long1=Math.floor((parseInt(start.split(':')[0])*60+ parseInt(start.split(':')[1]))/30)*30
  const long2=Math.floor((parseInt(end.split(':')[0])*60+ parseInt(end.split(':')[1]))/30)*30;
  for(let i=long1;i<=long2;i+=30){
    let h=parseInt(i/60)
    let m =i-h*60
    timeArr.push(`${addZero(h)}:${addZero(m)}`)
  }
  return timeArr
}

export const countDistance=(distance)=>{
    if(distance>1000){
      return `距离您有${parseFloat(distance/1000).toFixed(2)}公里`
    }else{
      return `距离您有${distance}米`
    }
}

export const  computeNumber=(a, type, b)=> {
  /**
   * 获取数字小数点的长度
   * @param {number} n 数字
   */
  function getDecimalLength(n) {
      const decimal = n.toString().split(".")[1];
      return decimal ? decimal.length : 0;
  }
  /**
   * 修正小数点
   * @description 防止出现 `33.33333*100000 = 3333332.9999999995` && `33.33*10 = 333.29999999999995` 这类情况做的处理
   * @param {number} n
   */
  const amend = (n, precision = 15) => parseFloat(Number(n).toPrecision(precision));
  const power = Math.pow(10, Math.max(getDecimalLength(a), getDecimalLength(b)));
  let result = 0;

  a = amend(a * power);
  b = amend(b * power);

  switch (type) {
      case "+":
          result = (a + b) / power;
          break;
      case "-":
          result = (a - b) / power;
          break;
      case "*":
          result = (a * b) / (power * power);
          break;
      case "/":
          result = a / b;
          break;
  }

  result = amend(result);

  return {
      /** 计算结果 */
      result,
      /**
       * 继续计算
       * @param {"+"|"-"|"*"|"/"} nextType 继续计算方式
       * @param {number} nextValue 继续计算的值
       */
      next(nextType, nextValue) {
          return computeNumber(result, nextType, nextValue);
      }
  };
}
