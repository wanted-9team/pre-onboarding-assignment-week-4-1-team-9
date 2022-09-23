export const deleteKeyValue = newSelected => {
  delete newSelected.accountList
  delete newSelected.is_active
  delete newSelected.is_staff
  delete newSelected.allow_marketing_push
  return newSelected
}
