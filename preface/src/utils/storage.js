const STORAGE = localStorage

export const storage = {
  set: token => {
    STORAGE.setItem('access_token', token)
  },
  remove: () => {
    STORAGE.removeItem('access_token')
  },
  get: () => STORAGE.getItem('access_token'),
}
