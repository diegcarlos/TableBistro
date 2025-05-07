import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';

interface LazyImageProps {
  uri: string;
  style?: any;
  resizeMode?: any;
}

const LazyImage: React.FC<LazyImageProps> = ({
  uri,
  style,
  resizeMode = FastImage.resizeMode.cover,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={[styles.container, style]}>
      <FastImage
        style={[styles.image, style]}
        source={{
          uri,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={resizeMode}
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#E11D48" />
        </View>
      )}
    </View>
  );
};

export default LazyImage;
