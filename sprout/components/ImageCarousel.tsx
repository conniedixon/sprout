import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ImageStore
} from "react-native";

const width = 400;
const height = 400;

interface ImagesProps {
  images: any;
}

class ImageCarousel extends Component<ImagesProps> {
  render() {
    const images = this.props.images.images.flat();
    if (images && images.length) {
      return (
        <View>
          <ScrollView
            horizontal
            // pagingEnabled
            // showsHorizontalScrollIndicator={false}
          >
            {images.map(image => (
              <Image
                key={image.url}
                style={{ width: 350, height: 300 }}
                source={{ uri: image.url }}
              />
            ))}
          </ScrollView>
        </View>
      );
    }
    return null;
  }
}

export default ImageCarousel;

// const styles = StyleSheet.create({
//   scrollContainer: {
//     height
//   },
//   image: {
//     width,
//     height
//   }
// });
