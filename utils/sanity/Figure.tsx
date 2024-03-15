import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import Image from "next/image";
import {FunctionComponent} from 'react';

const builder = imageUrlBuilder(client);

interface FigureProps {
    readonly image: any;
    readonly height?: any;
    readonly width?: any
    readonly alt?: string
    readonly className?: string
}


const Figure: FunctionComponent<FigureProps> = ({image, height, width, alt, className}) => {
    
  const getWidth = () => {
    return width ?? 600;
  };

  const getHeight = () => {
    if (height) {
      return height;
    } else {
      if (image.metadata?.dimensions.aspectRatio !== undefined) {
        return 600 / image.metadata.dimensions.aspectRatio;
      } else {
        return (600 / 16) * 9;
      }
    }
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      width={getWidth()}
      height={getHeight()}
      src={builder.image(image).auto("format").width(getWidth()).url()}
      alt={alt}
      sizes="70vmin"
      srcSet={`
                          ${builder
                            .image(image)
                            .auto("format")
                            .width(480)
                            .url()} 480w,
                          ${builder
                            .image(image)
                            .auto("format")
                            .width(800)
                            .url()} 800w,
                          ${builder
                            .image(image)
                            .auto("format")
                            .width(1400)
                            .url()} 1400w,
                          ${builder
                            .image(image)
                            .auto("format")
                            .width(1800)
                            .url()} 1600w,
                          ${builder
                            .image(image)
                            .auto("format")
                            .width(2500)
                            .url()} 2000w,
                        `}
    />
  )
}

export default Figure