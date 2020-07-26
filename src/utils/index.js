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
  const long1=Math.ceil((parseInt(start.split(':')[0])*60+ parseInt(start.split(':')[1]))/30)*30
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
