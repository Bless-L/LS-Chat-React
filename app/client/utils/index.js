export function loginAuth () {
  const username = localStorage.getItem('username')
  if (!username) {
    fetch('/login/isLogin', {
      method: 'POST',
    })
    .then((res) => {return res.json()})
    .then((res) => {
      if (res && res.code === 0) {
        localStorage.setItem('user', res.user)
        return true
      }
      return false
    })
    .then((err) => {
      return false
    })
  }else {
    return true
  }
}