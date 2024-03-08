import React, { useEffect, useState } from "react";
import { FORM_LANG, LANG } from "../../lang";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { getCartFromLocalStorage, makeTx } from "../../slices/txSlice";
import { getShop } from "../../slices/shopSlice";
import { getProductsByShop } from "../../slices/productsSlice";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dropdown } from "primereact/dropdown";
import { changeLang } from "../../slices/preferencesSlice";
import { Card } from "primereact/card";
import BottomNav from "../../components/BottomNav";

export default function Form() {
  const { shopName } = useParams();
  const dispatch = useAppDispatch();
  const lang = useSelector((state: RootState) => state.preferences.lang);
  const shop = useSelector((state: RootState) => state.shop.shop);
  const isTxLoading = useSelector((state: RootState) => state.tx.isLoading);

  const [IGName, setIGName] = useState<string>("");
  const [seatNum, setSeatNum] = useState<string>("");
  const [contactNum, setContactNum] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [pickupAddress, setPickupAddress] = useState<string>("");

  const [proposedTime, setProposedTime] = useState<Date | string | Date[]>(
    new Date()
  );
  const [memo, setMemo] = useState("");

  useEffect(() => {
    if (shopName !== undefined) {
      dispatch(getCartFromLocalStorage({ shopName }));
      dispatch(getShop({ shopName }));
      dispatch(getProductsByShop({ shopName }));
    }
  }, [shopName]);

  return (
    <div className="min-h-screen">
      {isTxLoading ? (
        <ProgressSpinner />
      ) : (
        <>
          <Menubar
            model={[]}
            start={
              <Link to={`/${shopName}/cart`}>
                <Button
                  icon="pi pi-angle-left"
                  label={FORM_LANG[10][lang]}
                  className="p-2"
                />
              </Link>
            }
            end={
              <Dropdown
                value={lang}
                onChange={(e) => dispatch(changeLang({ lang: e.value }))}
                options={LANG}
                optionLabel="name"
                className="m-0 p-0 mr-1"
              />
            }
          />

          <div className="p-3 sm:p-5 w-full">
            {shop.noteToCustomers && (
              <Card title={FORM_LANG[9][lang]} className="mb-2">
                {shop.noteToCustomers}
              </Card>
            )}

            <Fieldset legend={FORM_LANG[0][lang]} className="w-full">
              {shop.igNameRequired && (
                <>
                  <small>{FORM_LANG[1][lang]}</small>
                  <InputText
                    value={IGName}
                    onChange={(e) => setIGName(e.target.value)}
                    className="w-full"
                    placeholder={FORM_LANG[2][lang]}
                  />
                </>
              )}

              {shop.seatNumRequired && (
                <InputText
                  value={seatNum}
                  onChange={(e) => setSeatNum(e.target.value)}
                  className="w-full mt-2"
                  placeholder={FORM_LANG[11][lang]}
                />
              )}
              {shop.contactNumRequired && (
                <InputText
                  value={contactNum}
                  onChange={(e) => setContactNum(e.target.value)}
                  className="w-full mt-2"
                  placeholder={FORM_LANG[12][lang]}
                />
              )}

              {shop.deliveryAddressRequired && (
                <InputText
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full mt-2"
                  placeholder={FORM_LANG[13][lang]}
                />
              )}

              {shop.pickupAddressRequired && (
                <InputText
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full mt-2"
                  placeholder={FORM_LANG[14][lang]}
                />
              )}

              <div className="w-full mt-2">
                <small htmlFor="proposedTime">{FORM_LANG[3][lang]}</small>
                <Calendar
                  id="proposedTime"
                  value={proposedTime}
                  onChange={(e: CalendarChangeEvent) =>
                    e.value && setProposedTime(e.value)
                  }
                  showTime
                  hourFormat="24"
                  className="w-full"
                  minDate={new Date()}
                />
              </div>

              <InputTextarea
                autoResize
                value={memo}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setMemo(e.target.value)
                }
                className="w-full mt-2"
                placeholder={FORM_LANG[4][lang]}
              />

              <Button
                label={FORM_LANG[8][lang]}
                className="mt-3 w-full"
                disabled={
                  (shop.igNameRequired && IGName === "") ||
                  (shop.seatNumRequired && seatNum === "") ||
                  (shop.contactNumRequired && contactNum === "") ||
                  (shop.deliveryAddressRequired && deliveryAddress === "") ||
                  (shop.pickupAddressRequired && pickupAddress === "")
                }
                onClick={() => {
                  dispatch(
                    makeTx({
                      customerIGName: IGName,
                      memo,
                      datetime: proposedTime,
                      seatNum,
                      contactNum,
                      deliveryAddress,
                      pickupAddress,
                    })
                  );
                }}
              />
            </Fieldset>
          </div>
        </>
      )}

      <BottomNav />
    </div>
  );
}
