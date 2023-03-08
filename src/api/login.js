import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}



// 获取验证码
export function getloginUrl() {
  return request({
    url: '/wxlogin/getLoginUrl.do',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}




// 登录方法
export function wxlogin(code) {
  return request({
    url: '/wxlogin/login?code='+code,
    headers: {
      isToken: false
    },
    method: 'get'
  })
}



// 第三方平台登录
export function socialLogin(source, code, state) {
  const data = {
    code,
    state
  }
  return request({
    url: '/system/auth/social-login/' + source,
    method: 'get',
    params: data
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}
