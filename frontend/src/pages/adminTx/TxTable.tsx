import React, { useState } from "react";
import { ADMIN_TX_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { Tx } from "../../config";
import { RootState } from "../../app/store";
import {
  DataTable,
  DataTableSelectEvent,
  DataTableUnselectEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import TxDialog from "./TxDialog";
import { ProgressSpinner } from "primereact/progressspinner";

export default function TxTable() {
  const [selectedTx, setSelectedTx] = useState<Tx | null>(null);
  const shop = useSelector((state: RootState) => state.shop.shop);
  const products = useSelector((state: RootState) => state.products.products);
  const txs = useSelector((state: RootState) => state.txs.txs);
  const income = useSelector((state: RootState) => state.txs.income);
  const isTxsLoading = useSelector((state: RootState) => state.txs.isLoading);
  const lang = useSelector((state: RootState) => state.preferences.lang);
  const currency = useSelector((state: RootState) => state.shop.shop.currency);

  return (
    <>
      {isTxsLoading ? (
        <ProgressSpinner />
      ) : (
        <>
          <h3>
            {ADMIN_TX_LANG[19][lang] +
              ": " +
              (currency
                ? txs
                    .reduce((prev, cur) => prev + cur.price, 0)
                    .toLocaleString("en-US", {
                      style: "currency",
                      currency: currency,
                    })
                : txs.reduce((prev, cur) => prev + cur.price, 0))}
          </h3>

          <DataTable
            scrollable
            value={txs}
            paginator
            rows={10}
            paginatorTemplate={{
              layout: "PrevPageLink PageLinks NextPageLink",
            }}
            selectionMode="single"
            selection={selectedTx || undefined}
            dataKey="_id"
            onRowSelect={(event: DataTableSelectEvent) => {
              setSelectedTx(event.data);
            }}
            onRowUnselect={(event: DataTableUnselectEvent) => {
              setSelectedTx(null);
            }}
          >
            {shop.igNameRequired && (
              <Column
                field="customerIGName"
                header={ADMIN_TX_LANG[6][lang]}
                filter
                filterPlaceholder={ADMIN_TX_LANG[7][lang]}
              />
            )}

            {shop.seatNumRequired && (
              <Column
                field="seatNum"
                header={ADMIN_TX_LANG[34][lang]}
                filter
                filterPlaceholder={ADMIN_TX_LANG[35][lang]}
              />
            )}

            {shop.contactNumRequired && (
              <Column
                field="contactNum"
                header={ADMIN_TX_LANG[36][lang]}
                filter
                filterPlaceholder={ADMIN_TX_LANG[37][lang]}
              />
            )}

            {shop.deliveryAddressRequired && (
              <Column
                field="deliveryAddress"
                header={ADMIN_TX_LANG[38][lang]}
                filter
                filterPlaceholder={ADMIN_TX_LANG[39][lang]}
              />
            )}

            {shop.pickupAddressRequired && (
              <Column
                field="pickupAddress"
                header={ADMIN_TX_LANG[40][lang]}
                filter
                filterPlaceholder={ADMIN_TX_LANG[41][lang]}
              />
            )}

            <Column
              body={(tx) => new Date(tx.datetime).toLocaleString()}
              header={ADMIN_TX_LANG[8][lang]}
              sortable
            />
            <Column
              header={ADMIN_TX_LANG[9][lang]}
              body={(tx) =>
                tx.items
                  .map(
                    (item) =>
                      products.find((product) => product._id === item.productId)
                        ?.name
                  )
                  .join(", ")
              }
            />
            <Column field="memo" header={ADMIN_TX_LANG[10][lang]} />
            <Column
              header={ADMIN_TX_LANG[27][lang]}
              body={(tx) => {
                return currency
                  ? tx.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: currency,
                    })
                  : tx.price;
              }}
            />
          </DataTable>

          <TxDialog
            tx={selectedTx}
            visible={selectedTx !== null}
            onHide={() => {
              setSelectedTx(null);
            }}
          />
        </>
      )}
    </>
  );
}
