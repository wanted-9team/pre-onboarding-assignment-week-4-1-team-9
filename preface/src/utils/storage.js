const STORAGE = localStorage

export const storage = {
  set: ({ obj }) => {
    STORAGE.setItem('access_token', JSON.stringify(obj))
  },
  remove: () => {
    STORAGE.removeItem('access_token')
  },
  get: () => ({
    access_token: STORAGE.getItem('access_token'),
  }),
}
