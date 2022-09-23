export const findEqualUuid = (user, userSettings) => {
  const { is_active, allow_marketing_push, is_staff } = userSettings.find(
    settings => settings.uuid === user.uuid,
  ) || { is_active: false, allow_marketing_push: false, is_staff: false }

  return {
    is_active,
    allow_marketing_push,
    is_staff,
  }
}

export const findEqualUserId = (user, accountList) => {
  const account = accountList.filter(account => account.user_id === user.id)
  return { accountList: account }
}
