import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { HOME_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { useParams } from "react-router-dom";
import { changePassword, updateLogo, updateShop } from "../../slices/shopSlice";
import AdminMenuBar from "../../components/AdminMenuBar";
import { CURRENCY_CODES, SHOP_CATEGORIES, Shop } from "../../config";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { InputTextarea } from "primereact/inputtextarea";
import { ToggleButton, ToggleButtonChangeEvent } from "primereact/togglebutton";
import ImageCrop from "./ImageCrop";
import { Card } from "primereact/card";
import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { ProgressSpinner } from "primereact/progressspinner";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import BottomNav from "../../components/BottomNav";

export default function Home() {
  const { shopName } = useParams();
  const dispatch = useAppDispatch();
  const lang = useSelector((state: RootState) => state.preferences.lang);
  const shop = useSelector((state: RootState) => state.shop.shop);
  const isShopLoading = useSelector((state: RootState) => state.shop.isLoading);
  const toast = useRef(null);

  const [shopState, setShopState] = useState<Shop>(shop);
  const [newDiscount, setNewDiscount] = useState<{
    min: Number;
    percentageOff: number;
  }>({ min: 0, percentageOff: 0 });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<
    { id; chi; eng }[]
  >([]);
  const [suggestions, setSuggestions] = useState<string[]>(CURRENCY_CODES);
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");

  useEffect(() => {
    setShopState(shop);
    setSelectedCategories(
      shop.categories.map((categoryId) => SHOP_CATEGORIES[categoryId])
    );
  }, [shop]);

  return (
    <div className="w-full min-h-screen ">
      <AdminMenuBar shopName={shopName} />

      <div className="w-full h-full p-4">
        <Toast ref={toast} />
        <Card
          title={
            <div className="flex justify-between">
              <span>{HOME_LANG[15][lang]}</span>
              <Button
                className="p-0"
                text
                label={isEditMode ? HOME_LANG[14][lang] : HOME_LANG[13][lang]}
                icon="pi pi-pencil"
                onClick={() => {
                  if (!isShopLoading) setIsEditMode((prev) => !prev);
                }}
              />
            </div>
          }
        >
          {isShopLoading ? (
            <ProgressSpinner />
          ) : (
            <>
              {isEditMode ? (
                <InputText
                  value={shopState.displayName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShopState({ ...shopState, displayName: e.target.value })
                  }
                  placeholder={HOME_LANG[5][lang]}
                  className="w-full"
                />
              ) : (
                <div>{`${HOME_LANG[5][lang]}: ${shopState.displayName}`}</div>
              )}

              {isEditMode ? (
                <InputText
                  className="w-full mt-1"
                  value={shopState.link}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShopState({ ...shopState, link: e.target.value })
                  }
                  placeholder={HOME_LANG[6][lang]}
                />
              ) : (
                <div>{`${HOME_LANG[6][lang]}: ${shopState.link}`}</div>
              )}

              {isEditMode ? (
                <AutoComplete
                  className="w-full mt-1"
                  value={shopState.currency}
                  suggestions={suggestions}
                  completeMethod={(e: AutoCompleteCompleteEvent) => {
                    setSuggestions(
                      CURRENCY_CODES.filter((code) =>
                        code.includes(e.query.toUpperCase())
                      )
                    );
                  }}
                  onChange={(e: AutoCompleteChangeEvent) =>
                    setShopState({ ...shopState, currency: e.value })
                  }
                  placeholder={HOME_LANG[17][lang]}
                  dropdown
                />
              ) : (
                <div>{`${HOME_LANG[17][lang]}: ${shopState.currency}`}</div>
              )}

              {isEditMode ? (
                <MultiSelect
                  className="w-full mt-1"
                  value={selectedCategories}
                  onChange={(e: MultiSelectChangeEvent) => {
                    setSelectedCategories(e.value);
                    setShopState({
                      ...shopState,
                      categories: e.value.map((cat) => cat.id),
                    });
                  }}
                  optionLabel={lang}
                  options={SHOP_CATEGORIES}
                  display="chip"
                  placeholder={HOME_LANG[1][lang]}
                />
              ) : (
                <div>{`${HOME_LANG[1][lang]}: ${shopState.categories.map(
                  (catId) => SHOP_CATEGORIES[catId][lang]
                )}`}</div>
              )}

              {isEditMode ? (
                <InputTextarea
                  className="w-full mt-1"
                  value={shopState.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setShopState({ ...shopState, description: e.target.value })
                  }
                  placeholder={HOME_LANG[7][lang]}
                />
              ) : (
                <div>{`${HOME_LANG[7][lang]}: ${shopState.description}`}</div>
              )}

              {isEditMode ? (
                <InputTextarea
                  className="w-full"
                  value={shopState.noteToCustomers}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setShopState({
                      ...shopState,
                      noteToCustomers: e.target.value,
                    })
                  }
                  placeholder={HOME_LANG[8][lang]}
                />
              ) : (
                <div>{`${HOME_LANG[8][lang]}: ${shopState.noteToCustomers}`}</div>
              )}

              {isEditMode ? (
                <div className="mb-1">
                  <small>{HOME_LANG[37][lang]}</small>
                  <InputNumber
                    min={0}
                    className="w-full"
                    mode="currency"
                    currency={shopState.currency || "HKD"}
                    locale="en-US"
                    value={shopState.minCharge}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setShopState((prev) => ({
                        ...prev,
                        minCharge: e.value,
                      }))
                    }
                    placeholder={HOME_LANG[37][lang]}
                  />
                </div>
              ) : (
                <div>{`${
                  HOME_LANG[37][lang]
                }: ${shopState.minCharge.toLocaleString("en-US", {
                  style: "currency",
                  currency: shopState.currency || "HKD",
                })}`}</div>
              )}

              {isEditMode ? (
                <>
                  <small>{HOME_LANG[26][lang]}</small>
                  {shopState.discounts.map((discount, idx) => (
                    <div className="w-full mb-1 flex gap-1" key={idx}>
                      <InputNumber
                        className="w-full"
                        inputClassName="w-full"
                        value={discount.min}
                        mode="currency"
                        currency={shopState.currency || "HKD"}
                        locale="en-US"
                        onValueChange={(e: InputNumberValueChangeEvent) =>
                          setShopState((prev) => ({
                            ...prev,
                            discounts: [
                              ...prev.discounts.slice(0, idx),
                              {
                                min: e.value,
                                percentageOff:
                                  prev.discounts[idx].percentageOff,
                              },
                              ...prev.discounts.slice(idx + 1),
                            ],
                          }))
                        }
                        placeholder={HOME_LANG[28][lang]}
                      />
                      <InputNumber
                        className="w-[40%]"
                        inputClassName="w-[40%]"
                        value={discount.percentageOff}
                        onValueChange={(e: InputNumberValueChangeEvent) =>
                          setShopState((prev) => ({
                            ...prev,
                            discounts: [
                              ...prev.discounts.slice(0, idx),
                              {
                                min: prev.discounts[idx].min,
                                percentageOff: e.value,
                              },
                              ...prev.discounts.slice(idx + 1),
                            ],
                          }))
                        }
                        suffix="%"
                        min={0}
                        max={99}
                        placeholder={HOME_LANG[27][lang]}
                      />
                      <Button
                        icon="pi pi-trash"
                        text
                        onClick={() => {
                          setShopState((prev) => ({
                            ...prev,
                            discounts: [
                              ...prev.discounts.slice(0, idx),
                              ...prev.discounts.slice(idx + 1),
                            ],
                          }));
                        }}
                      />
                    </div>
                  ))}

                  <div className="w-full flex gap-1">
                    <InputNumber
                      className="w-full"
                      inputClassName="w-full"
                      value={newDiscount.min}
                      onValueChange={(e: InputNumberValueChangeEvent) =>
                        setNewDiscount((prev) => ({
                          min: e.value,
                          percentageOff: prev.percentageOff,
                        }))
                      }
                      mode="currency"
                      currency={shopState.currency || "HKD"}
                      locale="en-US"
                      placeholder={HOME_LANG[28][lang]}
                    />
                    <InputNumber
                      className="w-[40%]"
                      inputClassName="w-[40%]"
                      value={newDiscount.percentageOff}
                      onValueChange={(e: InputNumberValueChangeEvent) =>
                        setNewDiscount((prev) => ({
                          min: prev.min,
                          percentageOff: e.value,
                        }))
                      }
                      suffix="%"
                      min={0}
                      max={99}
                      placeholder={HOME_LANG[27][lang]}
                    />
                    <Button
                      icon="pi pi-plus"
                      text
                      onClick={() => {
                        setShopState((prev) => ({
                          ...shopState,
                          discounts: [...prev.discounts, newDiscount],
                        }));
                        setNewDiscount({ min: 0, percentageOff: 0 });
                      }}
                    />
                  </div>
                </>
              ) : (
                <div>{`${HOME_LANG[26][lang]}: ${shopState.discounts
                  .map((discount, idx) =>
                    HOME_LANG[30][lang](
                      discount.min.toLocaleString("en-US", {
                        style: "currency",
                        currency: shopState.currency || "HKD",
                      }),
                      discount.percentageOff
                    )
                  )
                  .join(";\n")}`}</div>
              )}

              {isEditMode ? (
                <ToggleButton
                  className="w-full mt-1"
                  checked={!shopState.isHidden}
                  onChange={(e: ToggleButtonChangeEvent) =>
                    setShopState({ ...shopState, isHidden: !e.value })
                  }
                  onLabel={HOME_LANG[4][lang]}
                  offLabel={HOME_LANG[3][lang]}
                  disabled={!isEditMode}
                />
              ) : (
                <div>{`${HOME_LANG[18][lang]}: ${
                  shopState.isHidden ? HOME_LANG[3][lang] : HOME_LANG[4][lang]
                }`}</div>
              )}

              {isEditMode && (
                <>
                  <Card title={HOME_LANG[31][lang]} className="mt-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center">
                        <label>{HOME_LANG[32][lang]}</label>
                        <InputSwitch
                          checked={shopState.igNameRequired}
                          onChange={(e: InputSwitchChangeEvent) => {
                            if (e.value !== undefined)
                              setShopState((prev) => ({
                                ...prev,
                                igNameRequired: e.value,
                              }));
                          }}
                        />
                      </div>

                      <div className="flex items-center">
                        <label>{HOME_LANG[34][lang]}</label>
                        <InputSwitch
                          checked={shopState.contactNumRequired}
                          onChange={(e: InputSwitchChangeEvent) => {
                            if (e.value !== undefined)
                              setShopState((prev) => ({
                                ...prev,
                                contactNumRequired: e.value,
                              }));
                          }}
                        />
                      </div>

                      <div className="flex items-center">
                        <label>{HOME_LANG[35][lang]}</label>
                        <InputSwitch
                          checked={shopState.deliveryAddressRequired}
                          onChange={(e: InputSwitchChangeEvent) => {
                            if (e.value !== undefined)
                              setShopState((prev) => ({
                                ...prev,
                                deliveryAddressRequired: e.value,
                              }));
                          }}
                        />
                      </div>

                      <div className="flex items-center">
                        <label>{HOME_LANG[36][lang]}</label>
                        <InputSwitch
                          checked={shopState.pickupAddressRequired}
                          onChange={(e: InputSwitchChangeEvent) => {
                            if (e.value !== undefined)
                              setShopState((prev) => ({
                                ...prev,
                                pickupAddressRequired: e.value,
                              }));
                          }}
                        />
                      </div>

                      <div className="flex items-center">
                        <label>{HOME_LANG[33][lang]}</label>
                        <InputSwitch
                          checked={shopState.seatNumRequired}
                          onChange={(e: InputSwitchChangeEvent) => {
                            if (e.value !== undefined)
                              setShopState((prev) => ({
                                ...prev,
                                seatNumRequired: e.value,
                              }));
                          }}
                        />
                      </div>
                    </div>
                  </Card>

                  <div className="w-full mt-1 flex gap-1 justify-end">
                    <Button
                      label={HOME_LANG[9][lang]}
                      onClick={() => {
                        const {
                          description,
                          categories,
                          isHidden,
                          noteToCustomers,
                          link,
                          displayName,
                          currency,
                          discounts,
                          igNameRequired,
                          seatNumRequired,
                          contactNumRequired,
                          deliveryAddressRequired,
                          pickupAddressRequired,
                          minCharge,
                        } = shopState;

                        dispatch(
                          updateShop({
                            description,
                            categories,
                            isHidden,
                            noteToCustomers,
                            link,
                            displayName,
                            currency,
                            discounts,
                            igNameRequired,
                            seatNumRequired,
                            contactNumRequired,
                            deliveryAddressRequired,
                            pickupAddressRequired,
                            minCharge,
                          })
                        );
                        setIsEditMode(false);
                      }}
                    />
                    <Button
                      label={HOME_LANG[10][lang]}
                      onClick={() => {
                        setShopState(shop);
                        setIsEditMode(false);
                      }}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </Card>

        <Card title={HOME_LANG[12][lang]} className="mt-2">
          <ImageCrop
            handleConfirm={(file: File) => dispatch(updateLogo({ logo: file }))}
          />
        </Card>

        <Card title={HOME_LANG[19][lang]} className="mt-2">
          <Password
            className="w-full mt-1"
            inputClassName="w-full"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder={HOME_LANG[20][lang]}
            toggleMask
          />
          <Password
            className="w-full mt-1"
            inputClassName="w-full"
            value={rePassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRePassword(e.target.value)
            }
            placeholder={HOME_LANG[21][lang]}
            toggleMask
          />
          <small>
            {password !== rePassword
              ? HOME_LANG[25][lang]
              : password.length < 5
              ? HOME_LANG[24][lang]
              : ""}
          </small>
          <Button
            className="mt-1 w-full"
            label={HOME_LANG[19][lang]}
            onClick={() => {
              dispatch(changePassword({ password }));
              setPassword("");
              setRePassword("");
              toast.current?.show({
                severity: "success",
                summary: HOME_LANG[23][lang],
                detail: HOME_LANG[22][lang],
              });
            }}
            disabled={password !== rePassword || password.length < 5}
          />
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
