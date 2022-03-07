const message: any = {
  1000: 'success',
  1001: 'fail',
  1002: 'validation error',
  1003: 'duplicate email',
  1004: 'duplicate phone number',
  1005: 'internal server error',
  1006: 'phone number already exists',
  1007: 'incorrect password',
  1008: 'user already exists',
  1009: 'user does not exist',
  1010: 'data not found',
  1011: 'invalid jwt',
  1012: 'sns email missing',
  1013: 'passcode invalid',
  1014: 'db write failed',
  1015: 'message not sent',
  1016: 'not authorized',
  1017: 'catch: mongo error',
  1018: 'catch: controller error',
  1019: 'no internet connection',
  1020: 'duplicate! insert failed',
  1021: 'catch: authentication error',
  1022: 'catch admin authentication error',
  1023: '1021 or 1022',
  1024: 'no space',
  1025: 'catch: sendMessage event failed',
  1026: 'not existing referral code',
  1027: 'username already exist',
  1028: 'error in sms sender api',
  1029: 'email not found',
  1030: 'account deactivated, please contact admin',
  1031: 'account rejected, please contact admin',
  1032: 'mimeTypeFailed',
  1033: 'duplicate image not allowed',
  1034: 'wrong otp code',
  1035: 'phone number verification failed',
  1036: 'account suspended, please contact admin',
  1040: 'error in changing user language',
  1041: 'error in updating user profile',
  1043: 'email format is not valid',
  1050: 'error in emrgency shutdown',
  1051: "couldn't upload img",
  1052: "couldn't verify Public Figure",
  1053: "couldn't verify Charity Document",
  1054: "couldn't find terms and agreements document",
  1055: 'not enough clovers',
  1056: 'account is deleted',
  1057: 'store not found',
  1058: 'invalid postcode',
};

class ResponseTemplate {
  send(res: any) {
    const { code, data } = res;
    if (data) {
      const resObj = {
        code,
        data: data || null,
      };
      return resObj;
    }
    if (!data) {
      const resObj = {
        code,
        reason: message[code],
      };
      return resObj;
    }
  }

  validationError(reason: any) {
    const resObj = {
      code: 1002,
      reason,
    };
    return resObj;
  }
}

export default new ResponseTemplate();
