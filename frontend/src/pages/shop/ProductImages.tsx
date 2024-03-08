import React from "react";
import { Galleria } from "primereact/galleria";

export default function ProductImages({ images }: { images: string[] }) {
  const itemTemplate = (item) => {
    return <img src={item} alt={item.alt} className="max-h-[50vh]" />;
  };

  return (
    <Galleria
      value={images}
      circular
      showThumbnails={false}
      showItemNavigators
      item={itemTemplate}
    />
  );
}
