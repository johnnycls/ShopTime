import React from "react";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { ADMIN_PRODUCTS_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Button } from "primereact/button";

export default function MultipleImageUpload({
  setAddedImages,
  emptyText,
}: {
  setAddedImages: (files) => void;
  emptyText: string;
}) {
  const lang = useSelector((state: RootState) => state.preferences.lang);

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap justify-between">
        <div className="flex align-items-center" style={{ width: "60%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{props.formatSize}</small>
          </span>
        </div>

        <Button
          icon="pi pi-times"
          text
          onClick={() => {
            setAddedImages((prev) =>
              prev.filter((imageFile) => imageFile.name !== file.name)
            );
            props.onRemove();
          }}
        />
      </div>
    );
  };

  const handleUpload = async (event: FileUploadHandlerEvent) => {
    const promises: Promise<File>[] = event.files.map(
      async (file) =>
        await fetch(file.objectURL)
          .then((r) => r.blob())
          .then(
            (blobFile) =>
              new File([blobFile], file.name, { type: blobFile.type })
          )
    );
    Promise.all(promises).then((files) => {
      setAddedImages(files);
    });
  };

  return (
    <div className="card">
      <FileUpload
        name="MultipleImageUpload"
        multiple
        auto
        accept="image/*"
        maxFileSize={2000000}
        emptyTemplate={<p className="m-0">{emptyText}</p>}
        customUpload
        uploadHandler={handleUpload}
        chooseLabel={ADMIN_PRODUCTS_LANG[24][lang]}
        itemTemplate={itemTemplate}
      />
    </div>
  );
}
