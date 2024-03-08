import React, { useEffect, useState } from "react";
import { ADMIN_TX_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Item, Tx } from "../../config";
import { RootState, useAppDispatch } from "../../app/store";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { modifyTx } from "../../slices/txsSlice";

export default function TxDialog({
  tx,
  visible,
  onHide,
}: {
  tx: Tx | null;
  visible: boolean;
  onHide: () => void;
}) {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const shop = useSelector((state: RootState) => state.shop.shop);
  const lang = useSelector((state: RootState) => state.preferences.lang);
  const currency = useSelector((state: RootState) => state.shop.shop.currency);

  const [time, setTime] = useState<Date | string | Date[]>(new Date());
  const [memo, setMemo] = useState<string>("");
  const options: { name: string; value: number; disable: boolean }[] = [
    {
      name: ADMIN_TX_LANG[11][lang],
      value: 0,
      disable: tx ? tx.status !== 0 : true,
    },
    {
      name: ADMIN_TX_LANG[12][lang],
      value: 1,
      disable: tx ? tx.status > 1 : true,
    },
    {
      name: ADMIN_TX_LANG[13][lang],
      value: 2,
      disable: tx ? tx.status !== 1 : true,
    },
    {
      name: ADMIN_TX_LANG[14][lang],
      value: 3,
      disable: tx ? tx.status === 2 : true,
    },
  ];
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    if (visible && tx) {
      setTime(new Date(tx.datetime));
      setMemo(tx.memo);
      setStatus(tx.status);
    }
  }, [visible]);

  const nameBodyTemplate = (item) => {
    return (
      products.find((product) => product._id === item.productId)?.name ||
      ADMIN_TX_LANG[29][lang]
    );
  };

  const optionBodyTemplate = (item: Item) => {
    const product = products.find((product) => product._id === item.productId);
    return Object.entries(item.optionIds)
      .map(([optionId, optionIds]) =>
        optionIds
          .map(
            (optionId2) =>
              product?.options
                .find((opt) => opt._id === optionId)
                ?.options.find((opt) => opt._id === optionId2)?.label ||
              ADMIN_TX_LANG[32][lang]
          )
          .join(", ")
      )
      .filter((ids) => ids.length > 0)
      .join(", ");
  };

  const quantityBodyTemplate = (item, { rowIndex }) => {
    return item.quantity;
  };

  const memoBodyTemplate = (item) => {
    return item.memo;
  };

  const priceBodyTemplate = (item) => {
    return currency
      ? item.price?.toLocaleString("en-US", {
          style: "currency",
          currency: currency,
        })
      : item.price;
  };

  const footer = () => {
    return (
      <div className="text-right">
        {ADMIN_TX_LANG[19][lang] + ": " + currency
          ? tx!.price.toLocaleString("en-US", {
              style: "currency",
              currency: currency,
            })
          : tx!.price}
      </div>
    );
  };

  return (
    tx && (
      <Dialog
        header={ADMIN_TX_LANG[20][lang]}
        visible={visible}
        onHide={onHide}
        className="max-w-[90%]"
        footer={
          tx.status < 2 && (
            <>
              <Button
                label={ADMIN_TX_LANG[17][lang]}
                onClick={() => {
                  dispatch(
                    modifyTx({
                      status,
                      memo,
                      datetime: time,
                      id: tx._id,
                    })
                  );
                  onHide();
                }}
              />
              <Button label={ADMIN_TX_LANG[18][lang]} onClick={onHide} />
            </>
          )
        }
      >
        <div>{`${ADMIN_TX_LANG[21][lang]}: ${tx.shopName}`}</div>
        {shop.igNameRequired && (
          <div>{`${ADMIN_TX_LANG[6][lang]}: ${tx.customerIGName}`}</div>
        )}
        {shop.seatNumRequired && (
          <div>{`${ADMIN_TX_LANG[34][lang]}: ${tx.seatNum}`}</div>
        )}
        {shop.contactNumRequired && (
          <div>{`${ADMIN_TX_LANG[36][lang]}: ${tx.contactNum}`}</div>
        )}
        {shop.deliveryAddressRequired && (
          <div>{`${ADMIN_TX_LANG[38][lang]}: ${tx.deliveryAddress}`}</div>
        )}
        {shop.pickupAddressRequired && (
          <div>{`${ADMIN_TX_LANG[40][lang]}: ${tx.pickupAddress}`}</div>
        )}
        <div>{`${ADMIN_TX_LANG[31][lang]}: ${tx.name}`}</div>
        <div>{`${ADMIN_TX_LANG[30][lang]}: ${tx.email}`}</div>
        <div className="mt-2">{`${ADMIN_TX_LANG[9][lang]}:`}</div>
        <DataTable value={tx.items} footer={footer} scrollable>
          <Column
            header={ADMIN_TX_LANG[23][lang]}
            body={nameBodyTemplate}
          ></Column>
          <Column
            header={ADMIN_TX_LANG[24][lang]}
            body={optionBodyTemplate}
          ></Column>
          <Column
            header={ADMIN_TX_LANG[25][lang]}
            body={quantityBodyTemplate}
          ></Column>
          <Column
            header={ADMIN_TX_LANG[26][lang]}
            body={memoBodyTemplate}
          ></Column>
          <Column
            header={ADMIN_TX_LANG[27][lang]}
            body={priceBodyTemplate}
          ></Column>
        </DataTable>

        <div className="w-full mt-2 flex">
          <label htmlFor="proposedTime" className="mr-2">
            {`${ADMIN_TX_LANG[28][lang]}: `}
          </label>
          {tx.status === 0 ? (
            <Calendar
              id="proposedTime"
              value={time}
              onChange={(e: CalendarChangeEvent) => e.value && setTime(e.value)}
              showTime
              hourFormat="24"
              className="w-full"
            />
          ) : (
            <span>{new Date(tx.datetime).toLocaleString()}</span>
          )}
        </div>

        <div className="w-full mt-2 flex">
          <label htmlFor="Memo" className="mr-2">
            {`${ADMIN_TX_LANG[26][lang]}: `}
          </label>
          {tx.status === 0 ? (
            <InputTextarea
              id="Memo"
              autoResize
              value={memo}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setMemo(e.target.value)
              }
              className="w-full mt-2"
              placeholder={ADMIN_TX_LANG[26][lang]}
            />
          ) : (
            <span>{tx.memo}</span>
          )}
        </div>

        <div className="card mt-3">
          <SelectButton
            value={status}
            onChange={(e) => setStatus(e.value)}
            options={options}
            optionLabel="name"
            optionDisabled="disable"
          />
        </div>
      </Dialog>
    )
  );
}
