export default interface Link {
  text: string;
  href: string;
  image?: {
    src: string;
    originalHeight?: number;
    originalWidth?: number;
    imageWidth: number;
    imageHeight: number;
    alt: string;
    classes?: string;
  };
  icon?: {
    name: string;
    side: "left" | "right";
  };
  isFilled?: boolean;
  classes?: string;
}
