export const isAdmin = (currentUser) => {
  return currentUser.is_admin
}

export const isStaff = (currentUser) => {
  let regex = new RegExp('(^ta$|^teacher$)')
  return currentUser.is_admin || regex.test(currentUser.role);
}

export const isTeacher = (currentUser) => {
  return currentUser.role === 'teacher' ? true : false
}

export const isTa = (currentUser) => {
  return currentUser.role === 'ta' ? true : false
}

export const isStudent = (currentUser) => {
  return currentUser.role === 'student' ? true : false
}

export const isTeacherOrAdmin = (currentUser) => {
  return currentUser.role === 'teacher' || currentUser.is_admin
}
