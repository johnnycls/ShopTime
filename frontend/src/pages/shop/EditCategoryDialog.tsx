import React, { useState } from "react";
import { ADMIN_PRODUCTS_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  addProductCategories,
  removeProductCategories,
  updateProductCategories,
} from "../../slices/shopSlice";

export default function EditCategoryDialog({
  visible,
  onHide,
}: {
  visible: boolean;
  onHide: () => void;
}) {
  const dispatch = useAppDispatch();
  const lang = useSelector((state: RootState) => state.preferences.lang);
  const [newCat, setNewCat] = useState<string>("");
  const productCategories = useSelector(
    (state: RootState) => state.shop.shop.productCategories
  );

  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    dispatch(updateProductCategories({ productCategories: [e.newData] }));
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          options.editorCallback(e.target.value)
        }
      />
    );
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      className=""
      header={ADMIN_PRODUCTS_LANG[3][lang]}
    >
      <DataTable
        value={productCategories}
        editMode="row"
        dataKey="_id"
        onRowEditComplete={onRowEditComplete}
      >
        <Column
          field="name"
          className="w-full"
          header={ADMIN_PRODUCTS_LANG[6][lang]}
          editor={(options) => textEditor(options)}
        />
        <Column rowEditor align="right" className="m-0 p-0" />
        <Column
          align="right"
          className="m-0 p-0"
          body={(cat) => (
            <Button
              icon="pi pi-trash"
              text
              onClick={() => {
                dispatch(
                  removeProductCategories({ productCategoryIds: [cat._id] })
                );
              }}
            />
          )}
        />
      </DataTable>

      <div className="m-1 flex gap-1">
        <InputText
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          placeholder={ADMIN_PRODUCTS_LANG[7][lang]}
        />
        <Button
          icon="pi pi-plus"
          onClick={() => {
            dispatch(
              addProductCategories({ productCategories: [{ name: newCat }] })
            );
            setNewCat("");
          }}
        />
      </div>
    </Dialog>
  );
}
