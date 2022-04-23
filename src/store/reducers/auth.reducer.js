import * as Actions from "../actions";

const iState = {
  isAuth: false,
  isLoading: false,
  isVerificaton: false,
  isForgetPassword: false,
  genderModal: false,
  cityModal: false,
  cityAfterLogin: false,
  guestUser: false,
  userExistError: false,
  userData: null,
  guestUserData: null,
  serviceData: null,
  loginError: null,
  registerError: null,
  verificationError: null,
  token: null,
  number: null,
  resendCodeMsg: null,
  resendCodeError: null,
  city: null,
  gender: null,
  forgetPasswordError: null,
  logoClicked: true,
  backButton: false,
  firstNotificationId: null,
};

const authReducer = (state = iState, action) => {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: action.payload.auth_token,
        userData: action.payload,
      };
    case Actions.CITY_AFTER_LOGIN:
      return {
        ...state,
        cityAfterLogin: action.payload,
      };
    case Actions.KEEP_ME_LOGIN:
      return {
        ...state,
        isAuth: true,
        token: action.payload.auth_token,
        userData: action.payload,
      };
    case Actions.LOGIN_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case Actions.SERVICE_DATA:
      return {
        ...state,
        serviceData: action.payload,
      };
    case Actions.LOGIN_ERROR:
      return {
        ...state,
        isAuth: false,
        userData: null,
        loginError: action.payload,
        token: null,
      };

    case Actions.REGISTER_SUCCESS:
      return {
        ...state,
        number: action.number,
        isVerificaton: true,
      };
    case Actions.IS_FORGET_PASSOWRD:
      return {
        ...state,
        isForgetPassword: action.payload,
      };
    case Actions.IS_VERIFICATON:
      return {
        ...state,
        number: action.number,
        isVerificaton: true,
      };
    case Actions.REGISTER_ERROR:
      return {
        ...state,
        isAuth: false,
        userData: null,
        registerError: action.payload,
        token: null,
      };
    case Actions.VERIFICATION_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isVerificaton: true,
        token: action.payload.auth_token,
        userData: action.payload,
      };
    case Actions.VERIFICATION_ERROR:
      return {
        ...state,
        isAuth: false,
        userData: null,
        verificationError: action.payload,
        token: null,
      };
    case Actions.RESEND_CODE_SUCCESS:
      return {
        ...state,
        resendCodeMsg: action.payload,
      };
    case Actions.RESEND_CODE_ERROR:
      return {
        ...state,
        resendCodeError: action.payload,
      };
    case Actions.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuth: false,
        serviceData: null,
        loginError: null,
        token: null,
        userData: null,
      };
    case Actions.CITY_MODAL:
      return {
        ...state,
        cityModal: action.payload,
        city: action.payload,
      };
    case Actions.GENDER_MODAL:
      return {
        ...state,
        genderModal: action.payload,
        gender: action.gender,
      };
    case Actions.UPDATE_PASSWORD:
      return {
        ...state,
        isAuth: true,
      };
    case Actions.FORGET_PASSOWRD_ERROR:
      return {
        ...state,
        forgetPasswordError: action.payload,
      };
    case Actions.GUEST_USER:
      return {
        ...state,
        guestUser: action.payload,
      };
    case Actions.GUEST_USER_DATA:
      return {
        ...state,
        isAuth: true,
        guestUserData: action.payload,
        isVerificaton: action.verification,
      };
    case Actions.GUEST_USER_DATA_ERROR:
      return {
        ...state,
        userExistError: action.payload,
      };
    case Actions.UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case Actions.LOGO_CLICKED_RELOAD:
      return {
        ...state,
        logoClicked: action.payload,
      };

    case Actions.SESSION_LOGOUT:
      return {
        ...state,
        isAuth: action.payload,
      };
    case Actions.BACK_BUTTON:
      return {
        ...state,
        backButton: action.payload,
      };
    case Actions.FIRST_NOTIFICAION_ID:
      return {
        ...state,
        firstNotificationId: action.payload,
      };
    case Actions.AUTH_TYPE:
      return {
        ...state,
        isAuth: action.payload,
      };
    default:
      return { ...state };
  }
};

export default authReducer;
