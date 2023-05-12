export function convertNumToInr(num:number){
  let str = num.toString()
  let remain = ''
  if(str.indexOf('.') !== -1){
    remain = str.substring(str.indexOf('.'))
    str = str.substring(0,str.indexOf('.'))
  }

  let l = str.length
  let ans = ''
  if(l<=3){
    return str + remain
  }else if((l-3)%2 == 1 ){
    ans = str.substring(0,1)
    for(let i=1; i< l-3; i=i+2){
      ans += ',' + str.substring(i,i+2)
    }
  }else{
    ans = str.substring(0,2)
    for(let i=2; i< l-3; i=i+2){
      ans += ',' + str.substring(i,i+2)
    }
  }
  ans += ',' + str.substring(l-3)
  return ans + remain
}