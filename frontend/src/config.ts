export const API_URL = "https://shoptime-api.onrender.com/";

// Order Important
export const SHOP_CATEGORIES = [
  { id: 0, chi: "服務", eng: "Services" },
  { id: 1, chi: "電子產品", eng: "Computers & Tech" },
  { id: 2, chi: "衣物", eng: "Clothings" },
  { id: 3, chi: "飾物", eng: "Accessories" },
  { id: 4, chi: "鞋類", eng: "Footwares" },
  { id: 5, chi: "袋類", eng: "Bags" },
  { id: 6, chi: "美妝", eng: "Beauty" },
  { id: 7, chi: "個人護理及保養", eng: "Personal Care" },
  { id: 8, chi: "家具", eng: "Furniture" },
  { id: 9, chi: "家品", eng: "Home Living" },
  { id: 10, chi: "家用電器", eng: "Home Appliances" },
  { id: 11, chi: "育嬰及兒童產品", eng: "Babies & Kids" },
  { id: 12, chi: "保健產品", eng: "Health & Nutrition" },
  { id: 13, chi: "運動器材", eng: "Sports Equipment" },
  { id: 14, chi: "飲食", eng: "Food & Drinks" },
  { id: 15, chi: "課程", eng: "Tutorials" },
  { id: 16, chi: "其他", eng: "Others" },
];

export const MIN_CHARGE = { HKD: { min: 150, surcharge: 5 } };

export interface Option {
  _id?: string;
  options: { _id?: string; label: string; price: number; isHidden: Boolean }[];
  name: string;
  minSelect: number | null;
  maxSelect: number | null;
  isHidden?: boolean;
}
export interface Product {
  _id: string;
  shop: string;
  name: string;
  images: string[];
  description: string;
  categories: string[];
  price: number;
  options: Option[];
  status?: number;
  priceAfterDiscount: number;
  inventory: number;
}

export interface ProductCategory {
  _id: string;
  name: string;
}

export interface Shop {
  shopName: string;
  logo: string;
  description: string;
  categories: number[];
  productCategories: ProductCategory[];
  products: number[];
  isHidden: boolean;
  noteToCustomers: string;
  link: string;
  displayName: string;
  currency: string;
  discounts: { min: number; percentageOff: number }[];
  igNameRequired: boolean;
  seatNumRequired: boolean;
  contactNumRequired: boolean;
  deliveryAddressRequired: boolean;
  pickupAddressRequired: boolean;
  minCharge: number;
}

export interface Item {
  productId: string;
  quantity: number;
  memo: string;
  optionIds: { [optionId: string]: string[] };
  price: number;
}
export interface Tx {
  _id: string;
  shopName: string;
  name: string;
  customerIGName: string;
  seatNum: string;
  contactNum: string;
  deliveryAddress: string;
  pickupAddress: string;
  email: string;
  items: Item[];
  memo: string;
  datetime: string;
  status: number;
  price: number;
}

export const CURRENCY_CODES = [
  // "AED",
  // "AFN",
  // "ALL",
  // "AMD",
  // "ANG",
  // "AOA",
  // "ARS",
  // "AUD",
  // "AWG",
  // "AZN",
  // "BAM",
  // "BBD",
  // "BDT",
  // "BGN",
  // "BHD",
  // "BIF",
  // "BMD",
  // "BND",
  // "BOB",
  // "BOV",
  // "BRL",
  // "BSD",
  // "BTN",
  // "BWP",
  // "BYN",
  // "BZD",
  // "CAD",
  // "CDF",
  // "CHE",
  // "CHF",
  // "CHW",
  // "CLF",
  // "CLP",
  // "CNY",
  // "COP",
  // "COU",
  // "CRC",
  // "CUC",
  // "CUP",
  // "CVE",
  // "CZK",
  // "DJF",
  // "DKK",
  // "DOP",
  // "DZD",
  // "EGP",
  // "ERN",
  // "ETB",
  // "EUR",
  // "FJD",
  // "FKP",
  // "GBP",
  // "GEL",
  // "GHS",
  // "GIP",
  // "GMD",
  // "GNF",
  // "GTQ",
  // "GYD",
  "HKD",
  // "HNL",
  // "HRK",
  // "HTG",
  // "HUF",
  // "IDR",
  // "ILS",
  // "INR",
  // "IQD",
  // "IRR",
  // "ISK",
  // "JMD",
  // "JOD",
  // "JPY",
  // "KES",
  // "KGS",
  // "KHR",
  // "KMF",
  // "KPW",
  // "KRW",
  // "KWD",
  // "KYD",
  // "KZT",
  // "LAK",
  // "LBP",
  // "LKR",
  // "LRD",
  // "LSL",
  // "LYD",
  // "MAD",
  // "MDL",
  // "MGA",
  // "MKD",
  // "MMK",
  // "MNT",
  // "MOP",
  // "MRU",
  // "MUR",
  // "MVR",
  // "MWK",
  // "MXN",
  // "MXV",
  // "MYR",
  // "MZN",
  // "NAD",
  // "NGN",
  // "NIO",
  // "NOK",
  // "NPR",
  // "NZD",
  // "OMR",
  // "PAB",
  // "PEN",
  // "PGK",
  // "PHP",
  // "PKR",
  // "PLN",
  // "PYG",
  // "QAR",
  // "RON",
  // "RSD",
  // "RUB",
  // "RWF",
  // "SAR",
  // "SBD",
  // "SCR",
  // "SDG",
  // "SEK",
  // "SGD",
  // "SHP",
  // "SLE",
  // "SOS",
  // "SRD",
  // "SSP",
  // "STN",
  // "SVC",
  // "SYP",
  // "SZL",
  // "THB",
  // "TJS",
  // "TMT",
  // "TND",
  // "TOP",
  // "TRY",
  // "TTD",
  // "TWD",
  // "TZS",
  // "UAH",
  // "UGX",
  // "USD",
  // "USN",
  // "UYI",
  // "UYU",
  // "UZS",
  // "VED",
  // "VEF",
  // "VND",
  // "VUV",
  // "WST",
  // "XAF",
  // "XCD",
  // "XDR",
  // "XOF",
  // "XPF",
  // "XSU",
  // "XUA",
  // "YER",
  // "ZAR",
  // "ZMW",
  // "ZWL",
];
