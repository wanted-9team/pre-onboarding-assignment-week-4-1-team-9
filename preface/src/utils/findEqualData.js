export const findEqualUuidFunc = (user, userSettings) => {
  const { is_active, allow_marketing_push, is_staff } = userSettings.find(
    settings => settings.uuid === user.uuid,
  )
  return { is_active, allow_marketing_push, is_staff }
}

export const findEqualUserId = (user, accountList) => {
  const account = accountList.filter(account => account.user_id === user.id)

  return { accountList: account }
}
