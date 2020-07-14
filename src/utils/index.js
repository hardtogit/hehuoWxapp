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
  const long1= parseInt(start.split(':')[0])*60+ parseInt(start.split(':')[1])
  const long2= parseInt(end.split(':')[0])*60+ parseInt(end.split(':')[1])

  for(let i=long1;i<=long2;i+=30){
    let h=parseInt(i/60)
    let m =i-h*60
    timeArr.push(`${addZero(h)}:${addZero(m)}`)
  }
  return timeArr
}
