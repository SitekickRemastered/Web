import styled from "styled-components";
import {
  EmptyStateProps,
  ImageThumbnailProps,
  IndicatorProps,
  SelectedImageProps,
} from "./types"

/**
 * @description - creates a container that holds the forwards and back buttons
 */
export const StyledButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/**
 * @description - creates the styling for the buttons within the button container
 */
export const StyledButtonControl = styled.button`
  padding: 5px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  border: none;
  margin: 0 10px;

  svg {
    path {
      fill: rgb(255, 255, 255);
    }
  }
`;

/**
 * @description - creates a container that holds the larger image that displays the currently selected image from the array
 */
export const StyledSelectedImageContainer = styled.div<SelectedImageProps>`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: ${(props) => props.borderradius}px;
  overflow: hidden;
  cursor: pointer;
`;

/**
 * @description - this is the larger image that displays the currently selected image from the array
 */
export const StyledStyledSelectedImage = styled.img<SelectedImageProps>`
  width: 100%;
  min-height: ${(props) => props.height};
  padding: 0;
  margin: 0;
  object-fit: cover;
  border-radius: ${(props) => props.borderradius}px;
`;

/**
 * @description - creates a container that houses the thumbnails, in Flex,
 * and has an `oveflow-x: auto` that allows for side to side scroll
 */
export const StyledImageThumbnailContainer = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding: 10px 5px;

  ::-webkit-scrollbar {
    width: 0.5em;
    border-radius: 15px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 15px;
  }
`;

/**
 * @description - creates a thumbnail, that is a clickable, clicking on any of the thumbnails selects that image to be
 * the current image in the `pictures[]` array
 * @property
 * `selected` - boolean to show that a particular thumbnail is the active thumbnail
 * @default
 * thumbnailOutlineColor = "#000",
 * thumbnailOutlineStyle = "solid",
 * thumbnailOutlineStyle = "solid",
 * thumbnailOutlineThickness = 2
 */
export const StyledImageThumbnail = styled.img<ImageThumbnailProps>`
  width: 70px;
  height: 70px;
  margin-right: 10px;
  padding: 0;
  outline: ${(props: ImageThumbnailProps) =>
      props.selected && props.thumbnailOutlineThickness}px
    ${(props: ImageThumbnailProps) =>
      props.selected && " " + props.thumbnailOutlineStyle + " "}
    ${(props: ImageThumbnailProps) =>
      props.selected && props.thumbnailOutlineColor};
  outline-offset: ${(props) =>
    props.selected && props.thumbnailOutlineOffset}px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
`;

/**
 * @description - creates a container to house the indicator at the bottom of the image, in Flex
 */
export const StyledIndicatorContainer = styled.div`
  position: absolute;
  bottom: 5px;
  width: 100%;
  padding: 5px 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * @description - creates a div that is the indicator in the `IndicatorContainer`, clickable,
 * clicking on any of the indicators selects that image to be the current image in the `pictures[]` array
 * @property
 * `selected` - boolean to show that a particular thumbnail is the active thumbnail
 */
export const StyledIndicator = styled.div<IndicatorProps>`
  width: 10px;
  height: 10px;
  margin: 0 2.5px;
  border-radius: 50%;
  border: 1px solid #fff;
  background: ${(props) => (props.selected ? "#fff" : "rgba(0, 0, 0, 0.2)")};
  cursor: pointer;
`;

/**
 * @description - creates a div that indicates that the array is empty
 */
export const StyledEmptyState = styled.div<EmptyStateProps>`
  height: ${(props) => (props.height ? props.height : "100%")};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  background: #c4c4c4;
  font-family: sans-serif;
`;