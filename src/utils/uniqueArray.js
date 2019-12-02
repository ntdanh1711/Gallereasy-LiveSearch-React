
const uniqueArray = (array) => {
  return array.filter((value, index, self) => (self.indexOf(value) === index ));
}

const checkUniqueArrayObject = (arrayObjects, object) => {
  for(let i = 0; i < arrayObjects.length; i++){
    if(arrayObjects[i].id === object.id){
      return false;
    }
  }
  return true
}

export default { uniqueArray, checkUniqueArrayObject }