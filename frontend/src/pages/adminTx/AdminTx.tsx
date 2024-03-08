import React, { useEffect, useState } from "react";
import { ADMIN_TX_LANG } from "../../lang";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TabView, TabPanel } from "primereact/tabview";
import AdminMenuBar from "../../components/AdminMenuBar";
import TxTable from "./TxTable";
import { RootState, useAppDispatch } from "../../app/store";
import { getTxs } from "../../slices/txsSlice";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { Card } from "primereact/card";

export default function AdminTx() {
  const { shopName } = useParams();
  const dispatch = useAppDispatch();
  const lang = useSelector((state: RootState) => state.preferences.lang);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const now = new Date();
  const [startDate, setStartDate] = useState<Date>(
    new Date(now.getFullYear(), now.getMonth(), 1)
  );
  const income = useSelector((state: RootState) => state.txs.income);
  const refund = useSelector((state: RootState) => state.txs.refund);
  const currency = useSelector((state: RootState) => state.shop.shop.currency);
  const platformFee = (income + refund) * 0.08;

  useEffect(() => {
    dispatch(
      getTxs({
        statuses: [activeIndex],
        minDateTime: startDate,
        maxDateTime: new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          0,
          23,
          59,
          59
        ),
        key: `${startDate.getMonth() + 1}/${startDate.getFullYear()}`,
      })
    );
  }, [startDate, activeIndex]);

  return (
    <div className="min-h-screen">
      <AdminMenuBar shopName={shopName} />
      <div className="w-full p-1 pb-0">
        <Calendar
          className="w-full"
          value={startDate}
          onChange={(e: CalendarChangeEvent) => {
            if (e.value) setStartDate(e.value);
          }}
          showIcon={true}
          view="month"
          dateFormat="mm/yy"
        />

        <Card title={ADMIN_TX_LANG[46][lang]} className="mb-1">
          <h3 className="mb-1">
            {ADMIN_TX_LANG[42][lang] +
              ": " +
              (currency
                ? income.toLocaleString("en-US", {
                    style: "currency",
                    currency: currency,
                  })
                : income)}
          </h3>
          <h3 className="mb-1">
            {ADMIN_TX_LANG[43][lang] +
              ": " +
              (currency
                ? refund.toLocaleString("en-US", {
                    style: "currency",
                    currency: currency,
                  })
                : refund)}
          </h3>
          <h3 className="mb-1">
            {ADMIN_TX_LANG[44][lang] +
              ": " +
              (currency
                ? platformFee.toLocaleString("en-US", {
                    style: "currency",
                    currency: currency,
                  })
                : platformFee)}
          </h3>
          <h3>
            {ADMIN_TX_LANG[45][lang] +
              ": " +
              (currency
                ? (income - platformFee).toLocaleString("en-US", {
                    style: "currency",
                    currency: currency,
                  })
                : income - platformFee)}
          </h3>
        </Card>
      </div>

      <TabView
        scrollable
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        <TabPanel header={ADMIN_TX_LANG[3][lang]}>
          <TxTable />
        </TabPanel>
        <TabPanel header={ADMIN_TX_LANG[15][lang]}>
          <TxTable />
        </TabPanel>
        <TabPanel header={ADMIN_TX_LANG[4][lang]}>
          <TxTable />
        </TabPanel>
        <TabPanel header={ADMIN_TX_LANG[5][lang]}>
          <TxTable />
        </TabPanel>
      </TabView>
    </div>
  );
}
