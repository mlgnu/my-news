import React, { forwardRef, useState } from "react";
import { ArticleType } from "../types/newsapi";
import { formatDateISO } from "../utils/formatDateISO";
import notFoundImage from "../assets/image-not-found-icon.svg";
import { IconPhotoFilled } from "@tabler/icons-react";

type ArticleProps = ArticleType & { ref: React.RefObject<HTMLDivElement> };

export const Article = React.memo(
  forwardRef<HTMLDivElement, ArticleProps>(
    (
      {
        source,
        author,
        title,
        description,
        url,
        urlToImage,
        publishedAt,
        content,
      },
      ref,
    ) => {
      const [isImageError, setIsImageError] = useState(false);
      return (
        <div
          onClick={() => window.open(url, "_blank")}
          ref={ref}
          className="group cursor-pointer shadow bg-clip-padding opacity-0 break-inside-avoid ml-4 pb-2 drop-shadow-lg pl-[30] my-5 rounded-lg overflow-hidden"
        >
          <a href={url} target="_blank" rel="noreferrer" />
          {isImageError || !urlToImage ? (
            <IconPhotoFilled className="mx-auto text-primary-8" size={200} />
          ) : (
            <img
              onError={() => setIsImageError(true)}
              loading="lazy"
              className="rounded-t-lg w-full color-primary-6 transition-transform duration-300 transform group-hover:scale-105 group-hover:opacity-85 group-hover:shadow-lg"
              src={urlToImage || ""}
              alt={title}
            />
          )}
          <h3 className="text-lg font-semibold p-2 pb-0">{title}</h3>
          <p className="px-2 text-gray-500 text-sm">
            {source.name} {author && author != source.name && "by " + author}
          </p>
          <span className="p-1 absolute top-0 right-0 opacity-95 font-semibold text-sm text-white bg-primary-6 rounded-lg">
            {formatDateISO(new Date(publishedAt.toString()))}
          </span>
          <p className="px-2 pt-2 text-base text-gray-600">{description}</p>
        </div>
      );
    },
  ),
);
