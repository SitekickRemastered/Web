import React, { FC, useCallback, useEffect, useState } from "react";
import {
  StyledButtonContainer,
  StyledButtonControl,
  StyledEmptyState,
  StyledImageThumbnail,
  StyledImageThumbnailContainer,
  StyledIndicator,
  StyledIndicatorContainer,
  StyledSelectedImageContainer,
  StyledStyledSelectedImage,
} from "./styled";
import { CarouselProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Carousel: FC<CarouselProps> = ({
  height = "100%",
  borderradius = 10,
  pictures,
  thumbnailOutlineColor = "#000",
  thumbnailOutlineOffset = 1,
  thumbnailOutlineStyle = "solid",
  thumbnailOutlineThickness = 2,
  timeout = 5000,
  autoPlay = true,
  showThumb = false,
  showButton = true,
  showIndicator = true,
}) => {
  /**
   * @description - useState<number> - holds the state of the current index of the picture in the array
   * @default 0
   * @example - pictures[key] => pictures[0]
   */
  const [key, setKey] = useState<number>(0);

  /**
   * @description goForward - a callback function that scrolls through the images in a forward direction
   */
  const goForward = useCallback(() => {
    if (key === pictures.length - 1) {
      setKey(0);
    } else {
      setKey(key + 1);
    }
  }, [key, pictures.length]);

  /**
   * @description goBackward - a callback function that scrolls through the images in a backwards direction
   */
  const goBackward = useCallback(() => {
    if (key === 0) {
      setKey(pictures.length - 1);
    } else {
      setKey(key - 1);
    }
  }, [key, pictures.length]);

  /**
   * @description useEffect - auto plays with `autoplay` props set true.
   * @default false
   */
  useEffect(() => {
    /**
     * @description - creates a setTimeout of the specific `timeout` props
     */
    let timer: ReturnType<typeof setTimeout> = setTimeout(goForward, timeout);
    !autoPlay && clearTimeout(timer);

    /**
     * @description - clean up function that clears the setTimeout function preventing unwanted actions within the package
     */
    return () => clearTimeout(timer);
  }, [autoPlay, goForward, timeout]);

  return (
    <>
      <StyledSelectedImageContainer borderradius={borderradius}>
        {showButton && pictures.length !== 0 && (
          <StyledButtonContainer>
            <StyledButtonControl className="left" onClick={() => goBackward()}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </StyledButtonControl>
            <StyledButtonControl className="right" onClick={() => goForward()}>
              <FontAwesomeIcon icon={faChevronRight} />
            </StyledButtonControl>
          </StyledButtonContainer>
        )}
        {pictures.length !== 0 ? (
          <StyledStyledSelectedImage
            borderradius={borderradius}
            height={height}
            src={pictures[key]}
          />
        ) : (
          <StyledEmptyState height={height}>No pictures</StyledEmptyState>
        )}
        {showIndicator && pictures.length !== 0 && (
          <StyledIndicatorContainer>
            {Array(pictures.length)
              .fill("")
              .map((indicator: string, index: number) => (
                <StyledIndicator
                  selected={key === index}
                  onClick={() => setKey(index)}
                  key={index + indicator}
                />
              ))}
          </StyledIndicatorContainer>
        )}
      </StyledSelectedImageContainer>
      {showThumb && pictures.length !== 0 && (
        <StyledImageThumbnailContainer>
          {pictures.map((thumbnail: string, index: number) => (
            <StyledImageThumbnail
              src={thumbnail}
              thumbnailOutlineColor={thumbnailOutlineColor}
              thumbnailOutlineOffset={thumbnailOutlineOffset}
              thumbnailOutlineStyle={thumbnailOutlineStyle}
              thumbnailOutlineThickness={thumbnailOutlineThickness}
              selected={thumbnail === pictures[key]}
              onClick={() => setKey(index)}
            />
          ))}
        </StyledImageThumbnailContainer>
      )}
    </>
  );
};

export default Carousel;