import React, { useState, useRef } from "react";
import ReactCrop, {
  PercentCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "primereact/button";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { HOME_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCrop({
  handleConfirm,
}: {
  handleConfirm: (File) => void;
}) {
  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<PercentCrop | undefined>(undefined);
  const aspect = 1;
  const lang = useSelector((state: RootState) => state.preferences.lang);

  const onSelectFile = async (e: FileUploadHandlerEvent) => {
    if (e.files[0]) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result ? reader.result.toString() : "")
      );
      reader.readAsDataURL(e.files[0]);
    }
  };

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  const getCroppedImg = async () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(
        imgRef.current!,
        (crop!.x * imgRef.current!.naturalWidth) / 100,
        (crop!.y * imgRef.current!.naturalHeight) / 100,
        (crop!.width * imgRef.current!.naturalWidth) / 100,
        (crop!.height * imgRef.current!.naturalHeight) / 100,
        0,
        0,
        512,
        512
      );

      canvas.toBlob((blob) => {
        const file = new File([blob!], "image.jpg", { type: blob!.type });
        handleConfirm(file);
        setImgSrc("");
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col mt-1 gap-1 w-full">
      <FileUpload
        mode="basic"
        accept="image/*"
        customUpload
        auto
        uploadHandler={onSelectFile}
        className="w-full"
        chooseLabel={HOME_LANG[16][lang]}
        chooseOptions={{ className: "w-full" }}
      />

      {Boolean(imgSrc) && (
        <div style={{ width: imgRef.current?.naturalWidth || "100%" }}>
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentageCrop) => {
              setCrop(percentageCrop);
            }}
            aspect={aspect}
          >
            <img ref={imgRef} alt="" src={imgSrc} onLoad={onImageLoad} />
          </ReactCrop>
          <Button
            label={HOME_LANG[11][lang]}
            onClick={getCroppedImg}
            className="mt-1"
          />
        </div>
      )}
    </div>
  );
}
