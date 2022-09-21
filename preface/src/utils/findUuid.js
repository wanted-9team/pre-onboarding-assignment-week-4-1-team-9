export const findUuidFunc = (user, userSettings) => {
  const { is_active, allow_marketing_push } = userSettings.find(
    settings => settings.uuid === user.uuid,
  )
  return { is_active, allow_marketing_push }
}
