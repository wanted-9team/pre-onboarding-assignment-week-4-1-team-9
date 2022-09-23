export const findEqualUuid = (user, userSettings) => {
  const { is_active, allow_marketing_push, is_staff } = userSettings.find(
    settings => settings.uuid === user.uuid,
  )
  return { is_active, allow_marketing_push, is_staff }
}

export const findEqualUserId = (user, accountList) => {
  const account = accountList.filter(account => account.user_id === user.id)

  return { accountList: account }
}

export const findEqualUserName = (accountList, users) => {
  const user_name = users.filter(user => user.id === accountList.user_id)
  return { user_name: user_name[0].name }
}
