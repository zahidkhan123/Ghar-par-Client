import * as Actions from "../actions";

const iState = {
  serviceLoading: false,
  isCheckOut: false,
  isAddress: false,
  serviceModalOpen: false,
  serviceModalLoading: false,
  isSubmit: false,
  cartItemError: false,
  ratingSlideInModal: false,
  ratingPopup: false,
  editPage1: false,
  editPage2: false,
  editPage3: false,
  editPage4: false,
  editAddressPage: false,
  discountModal: false,
  removeAddOnsInsideSerivce: false,
  addressPageReload: false,
  orderDetailErrorMsg: false,
  deletedItem: null,
  deletedAddOnItems: [],
  unCheckedService: [],
  addOnsCheckedValues: [],
  id: null,
  totalPrice: 0,
  addsOn: null,
  serviceErrorMsg: null,
  editAddress: null,
  sessionError: false,
  items: [],
  addOnItem: [],
  serviceSubcategory: [],
  subCategoryService: [],
  services: [],
  address: [],
  orderSummary: [],
  technicianRatings: [],
  ratingRecord: [],
  cities: null,
  areas: null,
  orderDetail: null,
  orderHistory: [],
  historyListing: null,
  orders: null,
  showOrderDetail: null,
  defaultLoading: false,
  editProfile: false,
  addOnArrayy: [],
  limitation: null,
  notificationsData: null,
  dealsModal: false,
  dealsData: null,
  dealData: null,
  dealBanners: [],
  notActiveDeal: false,
  profilePasswordError: null,
  profileSuccessMsg: false,
  cnicModal: false,
  newNotificationType: false,
  feedbackError: false,
  pendingRating: [],
  profileUpdateError: null,
  addAddresses: [],
  localCities: [],
  localAreas: [],
  lastStateValue: false,
  orderDetailErrorMssg: null,
  locationPopup: false,
  couponData: null,
  couponError: "",
  couponType: false,
  submitSuccessErrorMsg: "",
  submitType: false,
  cancelCouponData: null,
  userMilestones: [],
  redeemFreeService: [],
  refferalCode: "",
  refferalError: "",
  refferalSuccess: "",
  freeServiceSuccess: "",
  freeServiceError: "",
  orderBilling: [],
  couponModal: false,
  giftBoxModal: false,
  isGiftBox: false,
  scratchModal: false,
  reorderData: {},
  reorderError: "",
};

const serviceReducer = (state = iState, action) => {
  switch (action.type) {
    case Actions.SERVICE_SUBCATEGORY:
      return {
        ...state,
        serviceSubcategory: action.subcategory,
        services: action.service,
      };
    case Actions.SUBCATEGORY_SERVICE:
      let subCategoryServicee = state.subCategoryService;
      subCategoryServicee[action.index] = action.payload;
      return {
        ...state,
        subCategoryService: subCategoryServicee,
      };
    case Actions.SERVICE_MODAL_ACTION:
      return {
        ...state,
        serviceModalOpen: action.payload,
        id: action.id,
      };
    case Actions.SUBCATEGORY_SERVICE_TEST:
      return {
        ...state,
        subCategoryService: action.payload,
      };
    case Actions.SERVICE_LOADING:
      return {
        ...state,
        serviceLoading: action.payload,
      };
    case Actions.ADDS_ON:
      return {
        ...state,
        addsOn: action.payload,
      };
    case Actions.ADD_ITEM:
      return {
        ...state,
        items: action.payload,
      };
    case Actions.ADDS_ON_ITEM:
      return {
        ...state,
        addOnItem: action.payload,
      };
    case Actions.ADDS_ON_ITEMM:
      return {
        ...state,
        addOnArrayy: action.payload,
      };
    case Actions.REMOVE_ITEM:
      // let fil = state.items.filter((i) => i.id !== action.id);
      return {
        ...state,
        // items: fil,
        items: action.payload,
      };
    case Actions.REMOVE_ADDS_ON_ITEM:
      return {
        ...state,
        addOnItem: [...state.addOnItem, action.payload],
      };
    case Actions.CHECKOUT:
      return {
        ...state,
        isCheckOut: action.payload,
      };
    case Actions.TOTAL_PRICE_SETTER:
      return {
        ...state,
        totalPrice: action.payload,
      };
    case Actions.ADDRESS_MODAL:
      return {
        ...state,
        isAddress: action.payload,
      };
    case Actions.ADD_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case Actions.CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case Actions.AREAS:
      return {
        ...state,
        areas: action.payload,
      };
    case Actions.ORDER_DETAIL:
      return {
        ...state,
        orderDetail: action.payload,
      };
    case Actions.ORDER_SUMMARY:
      return {
        ...state,
        orderSummary: action.payload,
        redeemFreeService: action.redeemFreeService,
      };
    case Actions.ORDER_HISTORY:
      return {
        ...state,
        orderHistory: [...state.orderHistory, { order: action.payload }],
      };
    case Actions.ORDER_LISTING:
      return {
        ...state,
        orders: action.payload,
      };
    case Actions.HISTORY_LISTING:
      return {
        ...state,
        historyListing: action.payload,
      };
    case Actions.MAKE_ISSUBMIT_TRUE:
      return {
        ...state,
        isSubmit: action.payload,
      };
    case Actions.CART_ITEM_ERROR:
      return {
        ...state,
        cartItemError: action.payload,
      };
    case Actions.RATING_SLIDE_IN_MODAL:
      return {
        ...state,
        ratingSlideInModal: action.payload,
      };
    case Actions.SHOW_ORDER_SUCCESS:
      return {
        ...state,
        showOrderDetail: action.payload,
      };
    case Actions.EDIT_PAGE1:
      return {
        ...state,
        editPage1: action.payload,
      };
    case Actions.EDIT_PAGE2:
      return {
        ...state,
        editPage2: action.payload,
      };
    case Actions.EDIT_PAGE3:
      return {
        ...state,
        editPage3: action.payload,
      };
    case Actions.EDIT_PAGE4:
      return {
        ...state,
        editPage4: action.payload,
      };
    case Actions.EDIT_ADDRESS:
      return {
        ...state,
        editAddress: action.payload,
      };
    case Actions.EDIT_ADDRESS_TYPE:
      return {
        ...state,
        editAddressPage: action.payload,
      };
    case Actions.DISCOUNT_MODAL:
      return {
        ...state,
        discountModal: action.payload,
      };
    case Actions.UN_CHECKED_SERVICE:
      return {
        ...state,
        unCheckedService: action.payload,
      };
    case Actions.ADDS_ON_CHECKED_SERVICE:
      return {
        ...state,
        addOnsCheckedValues: action.payload,
      };
    case Actions.REMOVE_ADD_ONS_INSIDE_SERIVCE:
      return {
        ...state,
        removeAddOnsInsideSerivce: action.payload,
      };
    case Actions.DELETED_ITEM:
      return {
        ...state,
        deletedItem: action.payload,
      };
    case Actions.DELETED_ADD_ON_ITEMS:
      return {
        ...state,
        deletedAddOnItems: action.payload,
      };
    case Actions.ADDRESS_PAGE_RELOAD:
      return {
        ...state,
        addressPageReload: action.payload,
      };
    case Actions.RATING_POPUP:
      return {
        ...state,
        ratingPopup: action.payload,
      };
    case Actions.TECHNICIAN_RATINGS:
      return {
        ...state,
        technicianRatings: action.payload,
      };
    case Actions.RATING_RECORD:
      return {
        ...state,
        ratingRecord: action.payload,
      };
    case Actions.DEFAULT_LOADIG:
      return {
        ...state,
        defaultLoading: action.payload,
      };
    case Actions.ORDER_DETAIL_ERROR_MSG:
      return {
        ...state,
        orderDetailErrorMsg: action.payload,
        orderDetailErrorMssg: action.msg,
      };
    case Actions.SESSION_ERROR:
      return {
        ...state,
        sessionError: action.payload,
      };
    case Actions.EDIT_PROFILE:
      return {
        ...state,
        editProfile: action.payload,
      };

    case Actions.SETTING_API:
      return {
        ...state,
        limitation: action.payload,
      };

    case Actions.NOTIFICATIONS:
      return {
        ...state,
        notificationsData: action.payload,
      };
    case Actions.DEALS_MODAL:
      return {
        ...state,
        dealsModal: action.payload,
      };
    case Actions.DEALS:
      return {
        ...state,
        dealsData: action.payload,
      };
    case Actions.DEALS_DATA:
      return {
        ...state,
        dealData: action.payload,
      };
    case Actions.DEAL_BANNERS:
      return {
        ...state,
        dealBanners: action.payload,
      };

    case Actions.NOT_ACTIVE_DEAL:
      return {
        ...state,
        notActiveDeal: action.payload,
      };
    case Actions.PROFILE_PASSWORD_ERROR:
      return {
        ...state,
        profilePasswordError: action.payload,
      };

    case Actions.PROFILE_SUCCESS_MSG:
      return {
        ...state,
        profileSuccessMsg: action.payload,
      };

    case Actions.CNIC_MODAL:
      return {
        ...state,
        cnicModal: action.payload,
      };
    case Actions.NEW_NOTIFICATION_TYPE:
      return {
        ...state,
        newNotificationType: action.payload,
      };
    case Actions.FEEDBACK_ERROR:
      return {
        ...state,
        feedbackError: action.payload,
      };
    case Actions.PENDING_RATING:
      return {
        ...state,
        pendingRating: action.payload,
      };
    case Actions.PROFILE_UPDATE_ERROR:
      return {
        ...state,
        profileUpdateError: action.payload,
      };
    case Actions.ADD_ADDRESSES:
      return {
        ...state,
        addAddresses: action.payload,
      };
    case Actions.LOCAL_CITIES:
      return {
        ...state,
        localCities: action.payload,
      };
    case Actions.LOCAL_AREAS:
      return {
        ...state,
        localAreas: action.payload,
      };
    case Actions.LAST_STATE_VALUE:
      return {
        ...state,
        lastStateValue: action.payload,
      };
    case Actions.LOCATION_POPUP:
      return {
        ...state,
        locationPopup: action.payload,
      };
    case Actions.COUPON_CODE:
      return {
        ...state,
        couponData: action.payload,
        couponError: action.couponError,
        couponType: action.couponType,
      };
    case Actions.SUBMIT_ORDER_UNSUCCESS:
      return {
        ...state,
        submitSuccessErrorMsg: action.errorMsg,
        submitType: action.errorType,
      };
    case Actions.REMOVE_COUPON_ERROR_MSG:
      return {
        ...state,
        couponError: action.payload,
      };
    case Actions.CANCEL_COUPON_DATA:
      return {
        ...state,
        cancelCouponData: action.payload,
      };
    case Actions.USER_MILESTONES:
      return {
        ...state,
        userMilestones: action.payload,
      };
    case Actions.REDEEMFREESERVICE:
      return {
        ...state,
        redeemFreeService: action.payload,
        freeServiceSuccess: action.freeServiceSuccess,
        freeServiceError: action.freeServiceError,
      };
    case Actions.REFFERALCODE:
      return {
        ...state,
        refferalCode: action.payload,
        refferalSuccess: action.refferalSuccess,
        refferalError: action.refferalError,
      };
    case Actions.COUPON_MODAL:
      return {
        ...state,
        couponModal: action.payload,
      };
    case Actions.GIFTBOX_MODAL:
      return {
        ...state,
        giftBoxModal: action.payload,
      };
    case Actions.IS_GIFTBOX:
      return {
        ...state,
        isGiftBox: action.payload,
      };
    case Actions.SCRATCH_MODAL:
      return {
        ...state,
        scratchModal: action.payload,
      };
    case Actions.REORDER_DATA:
      return {
        ...state,
        reorderData: action.payload,
        reorderError: action.reorderError,
      };
    default:
      return {
        ...state,
      };
  }
};

export default serviceReducer;
