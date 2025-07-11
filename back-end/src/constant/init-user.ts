export const RolesUser = {
  Admin: 'admin',
  User: 'user',
  Teacher: 'teacher',
};

export const UserInit = [
  {
    fname: 'fAdmin',
    lname: 'lAdmin',
    phone: 'pAdmin',
    email: 'emailAdmin@gmail.com',
    password: '!admin',
    roles: RolesUser.Admin,
    desc: '',
    userImage: ''

  },
  {
    fname: 'teacher',
    lname: 'teacher',
    phone: '0800000000',
    email: 'teacheremail',
    password: null,
    roles: RolesUser.Teacher,
    desc: 'Teacher Description',
    userImage: 'Teacher image'
  }
]
