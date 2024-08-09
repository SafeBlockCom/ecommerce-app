const asset_base_path = process.env.REACT_APP_ASSET_BASE_PATH;
const environment = process.env.REACT_APP_ENVIRONMENT;
const folder_path = process.env.REACT_APP_ASSET_FOLDER_NAME;

const base_path = asset_base_path + "/" + environment + "/" + folder_path + "/";
const image_config = "?auto=compress&";

export const IMAGE_SRC = {
  BSECURE_ANNIMATION: `${base_path}assets/images/bSecure_animation.gif`,
  BSECURE_3D_LOGO: `${base_path}assets/images/logo/bSecure_3dlogo.png${image_config}`,
  BSECURE_FAVICON_LOGO: `${base_path}assets/images/logo/bsecure_favicon.png${image_config}`, //w=300
  BSECURE_SECURE_LOGO: `${base_path}assets/images/logo/secure_logo.png${image_config}`,
  BSECURE_ICON_LOGO: `${base_path}assets/images/logo/iconLogo.png${image_config}`,
  BSECURE_ICON: `${base_path}assets/images/logo/bSecure_icon.png${image_config}`,
  BSECURE_SPINNER: `${base_path}assets/images/spinners/white.gif`,
  BSECURE_BLUE_SPINNER: `${base_path}assets/images/spinners/blue.gif`,
  CCScreen: `${base_path}assets/images/payment/credit_card_banner.png${image_config}`,
  CVV_TOOLTIP: `${base_path}assets/images/payment/cvv-tooltip.png${image_config}`,
  NIFT_EPAY: `${base_path}assets/images/payment/epay-nift.png${image_config}`,
  PCI_DSS: `${base_path}assets/images/payment/pci-dss.png${image_config}`,
  CC_HBL: `${base_path}assets/images/payment/hbl.png${image_config}`,
  CC_PAYFAST: `${base_path}assets/images/payment/payfast.png${image_config}`,
  CC_ALFALAH_MPGS: `${base_path}assets/images/payment/mpgs.png${image_config}`,
  EMOJI: {
    ONE: `${base_path}assets/images/emojis/emoji1.png${image_config}`,
    TWO: `${base_path}assets/images/emojis/emoji2.png${image_config}`,
    THREE: `${base_path}assets/images/emojis/emoji3.png${image_config}`,
    FOUR: `${base_path}assets/images/emojis/emoji4.png${image_config}`,
    FIVE: `${base_path}assets/images/emojis/emoji5.png${image_config}`,
  },
  PK_FLAG: `${base_path}assets/images/flags/pk.png${image_config}`,
  USER_AVATAR: `${base_path}assets/images/avatar/user_avatar.png${image_config}`,
  PRODUCT_PLACEHOLDER: `${base_path}assets/images/avatar/product_image_placeholder.jpg${image_config}`,
  mapDirection: `${base_path}assets/blue-direction.svg`,
  CAPTURE_SCREEN: `${base_path}assets/images/transaction-slips/capture.png${image_config}`,
  ICONS: {
    BLACK_MAP_PIN: `${base_path}assets/images/icons/black-map-pin.png${image_config}`,
    BLUE_MAP_PIN: `${base_path}assets/images/icons/blue-map-pin.png${image_config}`,
    MAP_FULL_SCREEN_CONTROL: `${base_path}assets/images/icons/full-screen.svg`,
    EXPIRED: `${base_path}assets/images/icons/expired-icon.png${image_config}`,
    CLOSE: `${base_path}assets/images/icons/close-icon-new.png${image_config}`,
    SEARCH: `${base_path}assets/images/icons/search-new.png${image_config}`,
    SHOPPING_CART_ICON: `${base_path}assets/images/icons/shopping-cart.svg`,
  },
  PAYMENT_METHODS: {
    APG: `${base_path}assets/images/payment-methods/APG.png${image_config}`,
    EASY_PAISA: `${base_path}assets/images/payment-methods/easy-paisa.png${image_config}`,
    JAZZ_CASH: `${base_path}assets/images/payment-methods/jazz-cash.png${image_config}`,
    MOBILINK: `${base_path}assets/images/payment-methods/mobilink.png${image_config}`,
    TELENOR: `${base_path}assets/images/payment-methods/telenor.png${image_config}`,
    PAYMENT_PROTECTION: `${base_path}assets/images/payment-methods/Vector.png${image_config}`,
  },
  EASYPAISA: {
    TOP_BAR: `${base_path}assets/images/payment/top-easypaisa-bar.png${image_config}`,
    BOTTOM_BAR: `${base_path}assets/images/payment/bottom-easypaisa-bar.png${image_config}`,
    LOGO: `${base_path}assets/images/payment/easy-paisa.png${image_config}`,
  },
  TOP_PATTERN: `${base_path}assets/images/new-top-pattern.svg`,
};
