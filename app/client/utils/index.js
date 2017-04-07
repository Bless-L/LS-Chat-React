export function loginAuth () {
  const username = localStorage.getItem('username')
  if (!username) {
    return false
  }else {
    return true
  }
}

export async function checkLoginBySession () {
  try {
    let response = await fetch('/login/isLogin', {
      credentials: 'include',
      method: 'POST'
    })
    const data = response.json()
    if (data && data.code === 0) {
      localStorage.username = data.user.username
      return true
    } else {
      return false
    }
  } catch(e) {
    console.log("Oops, error", e);
    return false
  }
}