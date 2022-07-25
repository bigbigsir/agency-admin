export const usernameReg: RegExp = /^[\dA-z]{6,20}$/
export const passwordReg = /^[\dA-z]{6,20}$/

export function verifyUsername (str: string) {
  return usernameReg.test(str)
}

export function verifyPassword (str: string) {
  return passwordReg.test(str)
}

export default {
  verifyUsername,
  verifyPassword
}
