import { useEffect, useRef, useState } from "react";
const defaultLoading =
  "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

interface UnsplashImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  keywords: string[];
  placeholder?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const unsplashImageCache: Array<string> = [];
let unsplashImageCount = 0;

const UnsplashImage = ({
  keywords,
  placeholder = defaultLoading,
  imageWidth = 870,
  imageHeight = 490,
  src,
  ...props
}: UnsplashImageProps): JSX.Element => {
  const [image, setImage] = useState<string>(placeholder);
  async function getUnsplashImage() {
    const response = await fetch(
      `https://source.unsplash.com/random/${imageWidth}x${imageHeight}?${keywords.join(
        ","
      )}`
    );

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
  }

  useEffect(() => {
    if (unsplashImageCache[unsplashImageCount]) {
      setImage(unsplashImageCache[unsplashImageCount]);
      return;
    }
    getUnsplashImage().then((url: string) => {
      setImage(url);
      console.log(unsplashImageCache[unsplashImageCount]);
      unsplashImageCache[unsplashImageCount] = url;
    });
  }, []);

  return <img src={image} {...props} />;
};

export default UnsplashImage;
