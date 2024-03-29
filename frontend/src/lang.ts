export const LANG = [
  { name: "中文", value: "chi" },
  { name: "English", value: "en" },
];

interface Lang {
  [key: string | number]: {
    [lang: string]: string | ((...args: any[]) => string);
  };
}

export const SHOPS_LANG: Lang = {
  0: { chi: "搜尋", en: "Search" },
  1: { chi: "選擇商店類別", en: "Select Shop Categories" },
  2: { chi: "", en: "" },
  3: { chi: "", en: "" },
  4: { chi: "", en: "" },
  5: { chi: "", en: "" },
  6: { chi: "", en: "" },
  7: { chi: "", en: "" },
  8: { chi: "", en: "" },
  9: { chi: "", en: "" },
  10: { chi: "", en: "" },
  11: { chi: "", en: "" },
  12: { chi: "", en: "" },
  13: { chi: "", en: "" },
  14: { chi: "", en: "" },
  15: { chi: "", en: "" },
  16: { chi: "", en: "" },
  17: { chi: "", en: "" },
  18: { chi: "", en: "" },
  19: { chi: "", en: "" },
  20: { chi: "", en: "" },
  21: { chi: "", en: "" },
  22: { chi: "", en: "" },
  23: { chi: "", en: "" },
  24: { chi: "", en: "" },
  25: { chi: "", en: "" },
  26: { chi: "", en: "" },
  27: { chi: "", en: "" },
  28: { chi: "", en: "" },
  29: { chi: "", en: "" },
  30: { chi: "", en: "" },
  31: { chi: "", en: "" },
  32: { chi: "", en: "" },
  33: { chi: "", en: "" },
  34: { chi: "", en: "" },
  35: { chi: "", en: "" },
  36: { chi: "", en: "" },
  37: { chi: "", en: "" },
  38: { chi: "", en: "" },
  39: { chi: "", en: "" },
  40: { chi: "", en: "" },
};

export const SHOP_LANG: Lang = {
  0: { chi: "選擇", en: "Select" },
  1: { chi: "搜尋", en: "Search" },
  2: { chi: "選擇類別", en: "Select Categories" },
  3: { chi: "加到購物車", en: "Add to Cart" },
  4: { chi: "備注（選填）", en: "Memo (Optional)" },
  5: { chi: "顧客須知", en: "Notes to Customers" },
  6: { chi: "最低消費", en: "Minimum Charge" },
  7: { chi: "類別", en: "Categories" },
  8: { chi: "庫存", en: "Inventory" },
  9: {
    chi: (min, surcharge) => `未滿${min}的訂單需付${surcharge}附加費`,
    en: (min, surcharge) =>
      `${surcharge} will be charged for order with amount less than ${min}`,
  },
  10: {
    chi: (min, percentageOff) => `買滿${min}可享${percentageOff}%折扣`,
    en: (min, percentageOff) =>
      `${percentageOff}% off for order with price higher than ${min}`,
  },
  11: { chi: "折扣", en: "Discount" },
  12: { chi: "最低消費", en: "Minimum Charge" },
  13: { chi: "附加費", en: "Surcharge" },
  14: { chi: "庫存不足", en: "Not enough inventory" },
  15: { chi: "返回", en: "Back" },
  16: { chi: "", en: "" },
  17: { chi: "", en: "" },
  18: { chi: "", en: "" },
  19: { chi: "", en: "" },
  20: { chi: "", en: "" },
  21: { chi: "", en: "" },
  22: { chi: "", en: "" },
  23: { chi: "", en: "" },
  24: { chi: "", en: "" },
  25: { chi: "", en: "" },
  26: { chi: "", en: "" },
  27: { chi: "", en: "" },
  28: { chi: "", en: "" },
  29: { chi: "", en: "" },
  30: { chi: "", en: "" },
  31: { chi: "", en: "" },
  32: { chi: "", en: "" },
  33: { chi: "", en: "" },
  34: { chi: "", en: "" },
  35: { chi: "", en: "" },
  36: { chi: "", en: "" },
  37: { chi: "", en: "" },
  38: { chi: "", en: "" },
  39: { chi: "", en: "" },
  40: { chi: "", en: "" },
};

export const CART_LANG: Lang = {
  0: { chi: "商品", en: "Name" },
  1: { chi: "選項", en: "Options" },
  2: { chi: "數量", en: "Quantity" },
  3: { chi: "備注", en: "Memo" },
  4: { chi: "價錢", en: "Price" },
  5: { chi: "返回", en: "Back" },
  6: { chi: "確認", en: "Confirm" },
  7: { chi: "合計", en: "Total" },
  8: { chi: "你的付款不成功", en: "Your payment is not successful" },
  9: {
    chi: (min, surcharge) => `未滿${min}的訂單需付${surcharge}附加費`,
    en: (min, surcharge) =>
      `${surcharge} will be charged for order with amount less than ${min}`,
  },
  10: {
    chi: "合計價格不可少於",
    en: "Total price cannot be lower than ",
  },
  11: { chi: "庫存不足", en: "Not enough inventory" },
  12: { chi: "", en: "" },
  13: { chi: "", en: "" },
  14: { chi: "", en: "" },
  15: { chi: "", en: "" },
  16: { chi: "", en: "" },
  17: { chi: "", en: "" },
  18: { chi: "", en: "" },
  19: { chi: "", en: "" },
  20: { chi: "", en: "" },
  21: { chi: "", en: "" },
  22: { chi: "", en: "" },
  23: { chi: "", en: "" },
  24: { chi: "", en: "" },
  25: { chi: "", en: "" },
  26: { chi: "", en: "" },
  27: { chi: "", en: "" },
  28: { chi: "", en: "" },
  29: { chi: "", en: "" },
  30: { chi: "", en: "" },
  31: { chi: "", en: "" },
  32: { chi: "", en: "" },
  33: { chi: "", en: "" },
  34: { chi: "", en: "" },
  35: { chi: "", en: "" },
  36: { chi: "", en: "" },
  37: { chi: "", en: "" },
  38: { chi: "", en: "" },
  39: { chi: "", en: "" },
  40: { chi: "", en: "" },
};

export const FORM_LANG: Lang = {
  0: { chi: "訂單表格", en: "Order Form" },
  1: {
    chi: "請輸入你的IG賬戶名稱以作聯絡之用",
    en: "Please enter your IG account name for contact",
  },
  2: { chi: "你的IG賬戶名稱", en: "Your IG Account Name" },
  3: { chi: "建議提取時間", en: "Proposed Time" },
  4: { chi: "備注", en: "Other Notes" },
  5: { chi: "信用卡號碼", en: "Credit Card Number" },
  6: { chi: "信用卡期限", en: "Expiry Date" },
  7: { chi: "信用卡安全代碼", en: "CVV" },
  8: { chi: "提交", en: "Submit" },
  9: { chi: "顧客須知", en: "Notes to Customers" },
  10: { chi: "返回", en: "Back" },
  11: { chi: "你的座位編號", en: "Your Seat Number" },
  12: { chi: "你的聯絡電話", en: "Your Contact Number" },
  13: { chi: "你的送貨地址", en: "Your Delivery Address" },
  14: { chi: "你的面交地址", en: "Your Pickup Address" },
  15: { chi: "", en: "" },
  16: { chi: "", en: "" },
  17: { chi: "", en: "" },
  18: { chi: "", en: "" },
  19: { chi: "", en: "" },
  20: { chi: "", en: "" },
  21: { chi: "", en: "" },
  22: { chi: "", en: "" },
  23: { chi: "", en: "" },
  24: { chi: "", en: "" },
  25: { chi: "", en: "" },
  26: { chi: "", en: "" },
  27: { chi: "", en: "" },
  28: { chi: "", en: "" },
  29: { chi: "", en: "" },
  30: { chi: "", en: "" },
  31: { chi: "", en: "" },
  32: { chi: "", en: "" },
  33: { chi: "", en: "" },
  34: { chi: "", en: "" },
  35: { chi: "", en: "" },
  36: { chi: "", en: "" },
  37: { chi: "", en: "" },
  38: { chi: "", en: "" },
  39: { chi: "", en: "" },
  40: { chi: "", en: "" },
};

export const ADMIN_TX_LANG: Lang = {
  0: { chi: "訂單記錄", en: "Transactions" },
  1: { chi: "商品", en: "Products" },
  2: { chi: "登出", en: "Logout" },
  3: { chi: "待確認的訂單（已付款）", en: "Not Confirmed Orders (Paid)" },
  4: {
    chi: "已完成訂單（已計算到每月收入）",
    en: "Transaction History (included in monthly income)",
  },
  5: { chi: "取消訂單（已退款）", en: "Cancelled Orders (Refunded)" },
  6: { chi: "顧客IG名稱", en: "Customer IG Name" },
  7: { chi: "以名字搜尋", en: "Search by Name" },
  8: { chi: "時間", en: "Datetime" },
  9: { chi: "項目", en: "Items" },
  10: { chi: "備注", en: "Memo" },
  11: { chi: "已付款", en: "Paid" },
  12: { chi: "已確認", en: "Approved" },
  13: { chi: "已完成", en: "Completed" },
  14: { chi: "已取消", en: "Cancelled" },
  15: { chi: "未完成訂單", en: "Upcoming Orders" },
  16: { chi: "完成", en: "Complete" },
  17: { chi: "確認", en: "Confirm" },
  18: { chi: "取消", en: "Cancel" },
  19: { chi: "合計", en: "Total" },
  20: { chi: "訂單詳情", en: "Transaction Detail" },
  21: { chi: "商店", en: "Shop" },
  22: { chi: "購買物品", en: "Buying Items" },
  23: { chi: "商品", en: "Name" },
  24: { chi: "選項", en: "Options" },
  25: { chi: "數量", en: "Quantity" },
  26: { chi: "備注", en: "Memo" },
  27: { chi: "價錢", en: "Price" },
  28: { chi: "提取時間", en: "Time" },
  29: { chi: "已移除", en: "Deleted" },
  30: { chi: "顧客電郵", en: "Customer Email" },
  31: { chi: "顧客名稱", en: "Customer Name" },
  32: { chi: "已移除的選項", en: "Deleted Option" },
  33: {
    chi: (percentageOff) => `${percentageOff}%折扣前`,
    en: (percentageOff) => `Before  ${percentageOff}%Off`,
  },
  34: { chi: "座位編號", en: "Seat Number" },
  35: { chi: "以座位編號搜尋", en: "Search By Seat Number" },
  36: { chi: "聯絡電話", en: "Contact Number" },
  37: { chi: "以聯絡電話搜尋", en: "Search By Contact Number" },
  38: { chi: "送貨地址", en: "Delivery Address" },
  39: { chi: "以送貨地址搜尋", en: "Search By Delivery Address" },
  40: { chi: "面交地址", en: "Pickup Address" },
  41: { chi: "以面交地址搜尋", en: "Search By Pickup Address" },
  42: { chi: "本月完成的訂單金額", en: "Transaction amount in this month" },
  43: { chi: "本月退款金額", en: "Refund amount in this month" },
  44: {
    chi: "平臺手續費（（本月完成的訂單金額+本月退款金額）*8%）",
    en: "Platform fee ((Transaction amount in this month+Refund amount in this month)*8%)",
  },
  45: {
    chi: "本月收入（本月完成的訂單金額-平臺手續費）",
    en: "Monthly income (Transaction amount in this month - Platform fee)",
  },
  46: { chi: "收入報告", en: "Income Report" },
  47: { chi: "", en: "" },
};

export const ADMIN_PRODUCTS_LANG: Lang = {
  0: { chi: "發佈中", en: "Launched" },
  1: { chi: "隱藏", en: "Hidden" },
  2: { chi: "移除", en: "Removed" },
  3: { chi: "編輯商品類別", en: "Edit Product Categories" },
  4: { chi: "確認", en: "Confirm" },
  5: { chi: "取消", en: "Cancel" },
  6: { chi: "類別", en: "Category" },
  7: { chi: "新類別", en: "New Category" },
  8: { chi: "編輯商品", en: "Edit Product" },
  9: { chi: "簡介", en: "Description" },
  10: { chi: "價格", en: "Price" },
  11: { chi: "選擇類別", en: "Select Categories" },
  12: { chi: "商品", en: "Name" },
  13: {
    chi: "拖放到這裏以上載商品相片",
    en: "Drag and drop files to here to upload product images",
  },
  14: { chi: "新增選項", en: "Add Option" },
  15: { chi: "新增選項標題", en: "New Option Title" },
  16: { chi: "最少選擇", en: "Select at Least" },
  17: { chi: "最多選擇", en: "Select at Most" },
  18: { chi: "選項", en: "Options" },
  19: { chi: "選項", en: "Option" },
  20: { chi: "新增商品", en: "Add Product" },
  21: { chi: "額外價格", en: "Additional Price" },
  22: { chi: "新增商品類別", en: "Product Categories" },
  23: { chi: "商品名稱", en: "Product Name" },
  24: { chi: "選擇相片", en: "Choose" },
  25: {
    chi: "上載相片以取代原有照片",
    en: "Uploaded images to replace original product images",
  },
  26: { chi: "可選", en: "Available" },
  27: { chi: "不可選", en: "Unavailable" },
  28: { chi: "折扣後的價格", en: "Price After Discount" },
  29: { chi: "折扣", en: "Discount" },
  30: { chi: "庫存", en: "Inventory" },
  31: { chi: "新增子選項", en: "Add Sub-option" },
  32: { chi: "", en: "" },
  33: { chi: "", en: "" },
  34: { chi: "", en: "" },
  35: { chi: "", en: "" },
  36: { chi: "", en: "" },
  37: { chi: "", en: "" },
  38: { chi: "", en: "" },
  39: { chi: "", en: "" },
  40: { chi: "", en: "" },
};

export const AUTH_LANG: Lang = {
  0: { chi: "登入", en: "Login" },
  1: { chi: "沒有賬號？", en: "Don't have an account?" },
  2: { chi: "密碼", en: "Password" },
  3: { chi: "注冊", en: "Register" },
  4: { chi: "重新輸入密碼", en: "Re-enter Password" },
  5: { chi: "已有賬號？", en: "Already have an account?" },
  6: { chi: "Root Password", en: "Root Password" },
  7: { chi: "登入失敗", en: "Login failed" },
  8: { chi: "密碼不正確/已登出", en: "Incorrect Password / Logout successful" },
  9: { chi: "", en: "" },
  10: { chi: "", en: "" },
  11: { chi: "", en: "" },
  12: { chi: "", en: "" },
  13: { chi: "", en: "" },
  14: { chi: "", en: "" },
  15: { chi: "", en: "" },
  16: { chi: "", en: "" },
  17: { chi: "", en: "" },
  18: { chi: "", en: "" },
  19: { chi: "", en: "" },
  20: { chi: "", en: "" },
  21: { chi: "", en: "" },
  22: { chi: "", en: "" },
  23: { chi: "", en: "" },
  24: { chi: "", en: "" },
  25: { chi: "", en: "" },
  26: { chi: "", en: "" },
  27: { chi: "", en: "" },
  28: { chi: "", en: "" },
  29: { chi: "", en: "" },
  30: { chi: "", en: "" },
  31: { chi: "", en: "" },
  32: { chi: "", en: "" },
  33: { chi: "", en: "" },
  34: { chi: "", en: "" },
  35: { chi: "", en: "" },
  36: { chi: "", en: "" },
  37: { chi: "", en: "" },
  38: { chi: "", en: "" },
  39: { chi: "", en: "" },
  40: { chi: "", en: "" },
};

export const HOME_LANG: Lang = {
  0: { chi: "搜尋", en: "Search" },
  1: { chi: "商店類別", en: "Shop Categories" },
  2: { chi: "", en: "" },
  3: { chi: "隱藏中", en: "Hidden" },
  4: { chi: "已上架", en: "Active" },
  5: { chi: "顯示名稱", en: "Display Name" },
  6: { chi: "鏈接", en: "Link" },
  7: { chi: "簡介", en: "Description" },
  8: { chi: "客戶須知", en: "Notes to Customers" },
  9: { chi: "確認", en: "Confirm" },
  10: { chi: "取消", en: "Cancel" },
  11: { chi: "確認上載頭像", en: "Confirm Upload Logo" },
  12: { chi: "變更頭像", en: "Change Logo" },
  13: { chi: "編輯", en: "Edit" },
  14: { chi: "取消編輯", en: "Cancel Edit" },
  15: { chi: "檔案", en: "Profile" },
  16: { chi: "上傳頭像", en: "Upload Logo" },
  17: { chi: "貨幣", en: "Currency" },
  18: { chi: "狀態", en: "Status" },
  19: { chi: "變更密碼", en: "Change Password" },
  20: { chi: "新密碼", en: "New Password" },
  21: { chi: "重新輸入新密碼", en: "Re enter new password" },
  22: { chi: "密碼已變更", en: "Password Changed" },
  23: { chi: "成功", en: "Success" },
  24: {
    chi: "密碼長度需要大於5",
    en: "Password should contain at least 5 characters",
  },
  25: { chi: "重新輸入的密碼不正確", en: "Re entered password is not correct" },
  26: { chi: "折扣", en: "Discount" },
  27: { chi: "%折扣（九折請輸入10）", en: "Discount in %" },
  28: {
    chi: "多少錢以上的訂單可享折扣",
    en: "Discount for order of price higher than",
  },
  29: { chi: "新增折扣", en: "New Discount" },
  30: {
    chi: (min, percentageOff) => `買滿${min}可享${percentageOff}%折扣`,
    en: (min, percentageOff) =>
      `${percentageOff}% off for order with price higher than ${min}`,
  },
  31: { chi: "付款表格設定", en: "Payment Form Settings" },
  32: {
    chi: "需要用戶提供IG用戶名稱？",
    en: "Require Customer Provide IG Account Name?",
  },
  33: {
    chi: "需要用戶提供座位編號？",
    en: "Require Customer Provide Seat Number?",
  },
  34: {
    chi: "需要用戶提供聯絡電話？",
    en: "Require Customer Provide Phone Number?",
  },
  35: {
    chi: "需要用戶提供送貨地址？",
    en: "Require Customer Provide Delivery Address?",
  },
  36: {
    chi: "需要用戶提供面交地址？",
    en: "Require Customer Provide Pickup Address?",
  },
  37: { chi: "最低消費", en: "Minimum Charge" },
  38: { chi: "", en: "" },
  39: { chi: "", en: "" },
  40: { chi: "", en: "" },
};

export const SUCCESS_LANG: Lang = {
  0: { chi: "你已成功付款", en: "Your payment is successful" },
  1: { chi: "", en: "" },
  2: { chi: "", en: "" },
  3: { chi: "", en: "" },
  4: { chi: "", en: "" },
  5: { chi: "", en: "" },
  6: { chi: "", en: "" },
  7: { chi: "", en: "" },
  8: { chi: "", en: "" },
  9: { chi: "", en: "" },
  10: { chi: "", en: "" },
  11: { chi: "", en: "" },
  12: { chi: "", en: "" },
  13: { chi: "", en: "" },
  14: { chi: "", en: "" },
  15: { chi: "", en: "" },
  16: { chi: "", en: "" },
  17: { chi: "", en: "" },
  18: { chi: "", en: "" },
  19: { chi: "", en: "" },
  20: { chi: "", en: "" },
  21: { chi: "", en: "" },
  22: { chi: "", en: "" },
  23: { chi: "", en: "" },
  24: { chi: "", en: "" },
  25: { chi: "", en: "" },
  26: { chi: "", en: "" },
  27: { chi: "", en: "" },
  28: { chi: "", en: "" },
  29: { chi: "", en: "" },
  30: { chi: "", en: "" },
  31: { chi: "", en: "" },
  32: { chi: "", en: "" },
  33: { chi: "", en: "" },
  34: { chi: "", en: "" },
  35: { chi: "", en: "" },
  36: { chi: "", en: "" },
  37: { chi: "", en: "" },
  38: { chi: "", en: "" },
  39: { chi: "", en: "" },
  40: { chi: "", en: "" },
};

export const GENERAL_HOME_LANG: Lang = {
  0: { chi: "關於我們", en: "About Us" },
  1: { chi: "創建我的網購平台", en: "Create My E-Shop" },
  2: { chi: "聯絡我們", en: "Contact Us" },
  3: { chi: "使用指南", en: "User Guide" },
  4: { chi: "商戶FAQ", en: "Shop FAQ" },
  5: { chi: "政策", en: "Policies" },
  6: { chi: "條款及條件", en: "Terms of Service" },
  7: { chi: "隱私政策", en: "Privacy Policies" },
  8: { chi: "免責聲明", en: "Disclaimer" },
  9: { chi: "關於ShopTime", en: "About ShopTime" },
  10: { chi: "付款方式", en: "Payment Methods" },
  11: { chi: "ShopTime版權所有", en: "All Right Reserved" },
  12: {
    chi: "有ShopTime, 任何人都輕鬆打造屬於自己事業的網購平台",
    en: "Not available in English",
  },
  13: { chi: "ShopTime 理念 ", en: "" },
  14: {
    chi: "ShopTime是一間網頁製作公司，致力降低商戶營運成本，為各商店以最低成本打造專屬的網站和網購平台。",
    en: "",
  },
  15: { chi: "網購平台好處多", en: "" },
  16: {
    chi: "在網絡購物逐漸普及的時代，尤其在疫情期間或之後，不論是剛起步的小商店，還是已有一定規模的商戶，不免考慮是否要趕上這新的消費模式，為自己的生意創建一個網購平台以保持或吸納更多客源。另外，除了迎合消費者的購物習慣，網購平台亦幫助商戶有系統地整理訂單和賬目，令商家能騰出更多的時間和精力拓展事業。",
    en: "",
  },
  17: { chi: "創建網購平台的考量？", en: "" },
  18: {
    chi: "能擁有屬於自己事業的網購平台確實有不少好處，可是，聘請專業人士製作網購平台或需不少資金。成本效益，與合作單位商議的麻煩和擔心所製作的網購平台不易操作需要等等的考量，也讓不少商家對製作網購平台卻步。",
    en: "",
  },
  19: { chi: "ShopTime 是你最佳解決方案 ", en: "" },
  20: {
    chi: "我們明白商戶在創建網購平台的思慮，亦盼望為你提供簡便的解決方法。ShopTime 讓商戶以零成本輕鬆打造專屬的網購平台！我們的服務有以下三大特色：",
    en: "",
  },
  21: {
    chi: "1. 操作界面簡便，商店能自行整理出售貨品之內容 (ShopTime 亦提供為商店整理其網購平台的收費服務）",
    en: "",
  },
  22: { chi: "2. 系統處理訂單資訊，讓你的經營管理更流暢；", en: "" },
  23: { chi: "3. 整理交易記錄，每月營收一目了然 ", en: "" },
  24: { chi: "立即使用ShopTime， 建立一個網購平台並管理你的事業吧! ", en: "" },
  25: {
    chi: "ShopTime 是一所為商戶提供製作網絡購物平台服務的公司。於ShopTIme刊登之商品或服務均由商戶自行上傳銷售，ShopTime 無法保證經由本服務購買之商品或服務將符合消費者的期望，亦不會為商戶上傳商品或服務的資訊負任何法律上之保證、擔保或連帶賠償責任。因此，如消費者對商戶及商鋪商品資訊有任何疑問，應直接聯絡商戶詢問，相關法律責任亦應由該商戶自行負責。任何就選購商品所產生之消費爭議，需由消費者與商戶自行處理。ShopTime 無法，亦不會介入和干涉商戶與消費者間買賣交易。",
    en: "Not available in English",
  },
  26: {
    chi: "商戶及消費者需明確了解並同意ShopTime提供之網路服務、資料庫系統及程式設計（下稱「本服務」）並不保證以下事項：A.本服務符合使用者的需求；B.本服務內容及系統程式不受干擾或出錯；C.所有使用者所填寫之資料均為正確。另外，ShopTime 或會因應情況隨時進行規格變更及版本升級，如因此暫時停止網路服務，ShopTime並會不對消費者作任何賠償。",
    en: "",
  },
  27: {
    chi: "本服務指定之第三方服務（包含但不限於銀行或雲端運算服務），所提供之服務品質及內容由該第三方自行負責。故使用本服務時，可能由於第三方本身系統問題、相關作業網路連線品質問題或其他不可抗拒因素，造成驗證無法完成。若您所提供之基本資料有誤，造成本服務無法即時通知您異常狀況之緊急處理方式時，ShopTime對此將不負任何損害賠償責任。為保障消費者權益，敬請消費者於ShopTime完成交易，如有任何疑問，歡迎電郵聯絡我們 shoptimebusiness@gmail.com 。",
    en: "",
  },
  28: {
    chi: "電郵: shoptimebusiness@gmail.com",
    en: "Email: shoptimebusiness@gmail.com",
  },
  29: { chi: "Instagram: ShopTimeBusiness", en: "Instagram: ShopTimeBusiness" },
  30: {
    chi: "歡迎使用「ShopTime」（以下簡稱本網站），為了讓您能夠安心的使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：",
    en: "Not available in English",
  },
  31: { chi: "一、隱私權保護政策的適用範圍", en: "" },
  32: {
    chi: "隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。",
    en: "",
  },
  33: { chi: "二、個人資料的蒐集、處理及利用方式", en: "" },
  34: {
    chi: "當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內保留、處理及利用您所提供的的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。",
    en: "",
  },
  35: {
    chi: "於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的 IP 位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，此記錄會成為我們增進網站服務的參考依據，僅為內部應用，決不對外開。",
    en: "",
  },
  36: {
    chi: "為提供精確的服務，我們會將收集的個人資料進行統計與分析，分析結果之統計數據或說明文字呈現，除供內部研究外，我們會視乎需要公佈統計數據及說明文字，但不涉及特定個人之資料。",
    en: "",
  },
  37: {
    chi: "您可以隨時向我們提出請求，以更正或刪除您的帳戶或本網站所蒐集的個人資料等隱私資訊。聯繫方式請見最下方聯繫管道。",
    en: "",
  },
  38: { chi: "三、資料之保護 ", en: "" },
  39: {
    chi: "本網站已採取必要及嚴格的安全防護措施，以保護網站及您的個人資料，只由經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。",
    en: "",
  },
  40: {
    chi: "如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。",
    en: "",
  },
  41: { chi: "四、網站對外的相關連結", en: "" },
  42: {
    chi: "本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。",
    en: "",
  },
  43: { chi: "五、與第三人共用個人資料之政策", en: "" },
  44: {
    chi: "本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。",
    en: "",
  },
  45: { chi: "前項但書之情形包括不限於：", en: "" },
  46: { chi: "經由您書面同意。", en: "" },
  47: { chi: "法律明文規定。", en: "" },
  48: { chi: "為免除您生命、身體、自由或財產上之危險。", en: "" },
  49: {
    chi: "與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集者依其揭露方式無從識別特定之當事人。",
    en: "",
  },
  50: {
    chi: "當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。",
    en: "",
  },
  51: { chi: "有利於您的權益。", en: "" },
  52: {
    chi: "本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。",
    en: "",
  },
  53: { chi: "六、Cookie 之使用 ", en: "" },
  54: {
    chi: "為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的 Cookie，若您不願接受 Cookie 的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕 Cookie 的寫入，但可能會導致網站某些功能無法正常執行 。",
    en: "",
  },
  55: { chi: "七、隱私權保護政策之修正", en: "" },
  56: {
    chi: "本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。",
    en: "",
  },
  57: { chi: "八、聯繫管道", en: "" },
  58: {
    chi: "對於本站之隱私權政策有任何疑問，或者想提出變更、移除個人資料之請求，請電郵聯絡我們 shoptimebusiness@gmail.com。",
    en: "",
  },
  59: {
    chi: "1. 請填寫這份表格以開設賬號",
    en: "1. Please fill in this form to set up your account.",
  },
  60: { chi: "ShopTime 為收費服務?", en: "Not available in English" },
  61: {
    chi: "目前商家可免費使用ShopTime來建造您的網購平台。ShopTime 只會於每筆經ShopTime系統交易的訂單收取8%的手續費(包括退款訂單)，當中包括電子支付／信用卡手續費及 ShopTime之營運費用。除此之外，ShopTime 並不會向商戶收取額外費用。",
    en: "",
  },
  62: {
    chi: "ShopTime 網購平台設有最低消費（與商戶自身所訂的最低消費並無關連），如顧客之消費低於ShopTime指定的最低消費，顧客需自行向ShopTime支付額外的平台費用（收費金額會於付款時列明），商戶毋須承擔該費用。",
    en: "",
  },
  63: { chi: "ShopTime 使用流程", en: "" },
  64: { chi: "1. 聯絡ShopTime", en: "" },
  65: {
    chi: "花3分鐘填寫報名表格。 ShopTime會儘快與您簽訂合約，並為您開設ShopTime帳戶。",
    en: "",
  },
  66: { chi: "2. 設定您的網購平台", en: "" },
  67: {
    chi: "登入您的ShopTime 帳戶，填寫網店資訊及商品詳情 (請參閱ShopTime使用指南)。完成後，顧客便可於您的網購平台查看並選購商品！",
    en: "",
  },
  68: { chi: "3. 處理訂單", en: "" },
  69: {
    chi: "於「訂單」頁面查看並處理訂單。商家可使用ShopTime內置功能紀錄訂單狀況。",
    en: "",
  },
  70: { chi: "4. 查收每月營利", en: "" },
  71: {
    chi: "完成訂單後，把訂單設定為「已完成」之狀況。ShopTime會每月3號把上一個月完成的訂單營收存入商戶指定之銀行帳號。商戶可隨時於「訂單」頁面查看每月營收。",
    en: "",
  },
  72: { chi: "如何設定商品折扣？", en: "" },
  73: {
    chi: "商戶可設定1. 全單滿指定金額可享指定折扣 和 2. 個別商品的指定折扣",
    en: "",
  },
  74: {
    chi: "第一種折扣可於「商戶檔案」頁面設定 (詳見ShopTime使用指南)",
    en: "",
  },
  75: { chi: "第二種則「編輯商品」頁面設定", en: "" },
  76: { chi: "取消訂單及退款流程", en: "" },
  77: {
    chi: "為保障商戶，顧客並不能自行取消訂單。若要取消訂單，顧客須先與商戶聯絡。商戶得悉及同意後，可進行退款程序。",
    en: "",
  },
  78: {
    chi: "「訂單」頁面 → 視乎申請取消時訂單之狀態：「未確認的訂單」／「未完成訂單」→ 申請取消之訂單 → 「取消」→ 訂單已成功取消並移至「取消訂單」頁面。",
    en: "",
  },
  79: {
    chi: "ShopTime 會自動退款至顧客所填寫的付款賬號。（到賬時間因支付平台而異）（退款後商戶仍需支付平臺費）",
    en: "",
  },
  80: { chi: "ShopTime 支援哪些付款方式？", en: "" },
  81: { chi: "信用卡， Apple Pay及Google Pay 。", en: "" },
  82: { chi: "2. 請參閲商戶指南", en: "" },
  83: { chi: "商戶指南", en: "User Guide" },
  84: { chi: "商店一覽", en: "Shop List" },
  85: { chi: "", en: "" },
};
