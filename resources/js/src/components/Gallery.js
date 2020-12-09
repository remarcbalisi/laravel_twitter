import React from 'react';
import { Carousel, Image } from 'antd';

const Gallery = ({images}) => {

  const onChange = (a, b, c) => {
    console.log(a, b, c)
  }

  return (
    <Carousel afterChange={onChange}>
      {
        images &&
        (
          images.map(image => (
            <div key={image.uid}>
              <Image
                width={200}
                src={`${image.url}`}
              />
            </div>
          ))
        )
      }
    </Carousel>
  );
}

export default Gallery;
