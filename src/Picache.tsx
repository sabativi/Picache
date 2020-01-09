import * as React from "react";
import { Image, ImageProperties, ImageRequireSource } from "react-native";
import * as shorthash from "shorthash";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { Source } from "./types";

const Picache = (props: ImageProperties) => {
  const [imageSource, setImageSource] = React.useState({});

  const downloadRemoteImage = async (uri: string) => {
    const name = shorthash.unique(uri);
    const path = `${FileSystem.cacheDirectory}${name}.png`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
      return image.uri;
    }

    const newImage = await FileSystem.downloadAsync(uri, path);
    return newImage.uri;
  };

  const downloadLocalImage = async (source: ImageRequireSource) => {
    const asset = await Asset.fromModule(source);
    if (!asset.localUri) {
      await asset.downloadAsync();
    }
    setImageSource({ uri: asset.localUri });
  };

  const returnNull = async () => {
    return null;
  };

  const downloadImage = async (source: Source) => {
    if (typeof source === "number") {
      downloadLocalImage(source);
    } else if (Array.isArray(source)) {
      const newUris = await Promise.all(
        source.map(s => {
          if (s.uri) {
            return downloadRemoteImage(s.uri);
          }
          return returnNull();
        })
      );
      const newSources = [];
      for (let i = 0; i < source.length; i += 1) {
        const uri = newUris[i];
        if (uri) {
          newSources.push({
            ...source[i],
            uri
          });
        }
      }
      setImageSource(newSources);
    } else {
      if (source.uri) {
        const newUri = await downloadRemoteImage(source.uri);
        setImageSource({
          ...source,
          uri: newUri
        });
      }
    }
  };

  React.useEffect(() => {
    downloadImage(props.source);
  }, [props.source]);

  const { source, ...otherProps } = props;

  return <Image source={imageSource} {...otherProps} />;
};

export default Picache;
