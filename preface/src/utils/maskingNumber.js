export const maskingPhoneNumber = number => {
  return number.replaceAll(/-[0-9]{3,}-/gi, '-****-')
}
