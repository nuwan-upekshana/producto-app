export const checkSpecialCharactorsInStr = text => {
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  return format.test(text)
}

export const checkNumbersInStr = text => {
  const numArray = text.match(/\d/g)
  return numArray ? true : false
}

export const isFirstLetterStr = str => {
  const text = str.charAt(0)
  return text.match(/[a-z]/i)
}
