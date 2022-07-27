//拷贝一个对象
function copy(to,from){
  for(var property in from){
    if(from.hasOwnProperty(property))continue;
    Object.defineProperty(to,property,Object.getPropertyDescriptor(from,property))
  }
  return to;
}