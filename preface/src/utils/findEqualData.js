export const findEqualUuid = (userUuid, userSettings) => {
  const { is_active, allow_marketing_push, is_staff } = userSettings.find(
    settings => settings.uuid === userUuid,
  ) || { is_active: true, allow_marketing_push: true, is_staff: false }

  return {
    is_active,
    allow_marketing_push,
    is_staff,
  }
}

export const findEqualUserId = (userId, accountList) => {
  const account = accountList.filter(account => account.user_id === userId)
  return { accountList: account }
}

export const findEqualUserName = (accountList, users) => {
  const user_name = users.filter(user => user.id === accountList.user_id)
  return { user_name: user_name[0].name }
}
