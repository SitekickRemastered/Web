/**
 * @type OutlineStyleType
 */
export type OutlineStyleType = "solid" | "dashed" | "dotted";

/**
 * @type CarouselProps
 */
export type CarouselProps = {
  height?: string;
  borderradius?: number;
  pictures: Array<string>;
  thumbnailOutlineColor?: string;
  thumbnailOutlineThickness?: number;
  thumbnailOutlineStyle?: OutlineStyleType;
  thumbnailOutlineOffset?: number;
  timeout?: number;
  autoPlay?: boolean;
  showThumb?: boolean;
  showIndicator?: boolean;
  showButton?: boolean;
};

/**
 * @interface SelectedImageProps
 */
export interface SelectedImageProps {
  height?: string;
  borderradius?: number;
}

/**
 * @interface ImageThumbnailProps
 */
export interface ImageThumbnailProps {
  selected: boolean;
  thumbnailOutlineColor?: string;
  thumbnailOutlineThickness?: number;
  thumbnailOutlineStyle?: OutlineStyleType;
  thumbnailOutlineOffset?: number;
}

/**
 * @interface IndicatorProps
 */
export interface IndicatorProps {
  selected: boolean;
}

/**
 * @interface EmptyStateProps
 */
export interface EmptyStateProps {
  height?: string;
}