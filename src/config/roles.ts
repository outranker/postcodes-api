const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['mobileOtp', 'verifyUPN', 'otpMail']);
roleRights.set(roles[1], ['getUsers', 'manageUsers']);

export default {
  roles,
  roleRights,
};
