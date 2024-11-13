import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "./Carousel.css";

const Carousel = ({images}) => {

  return (
    <>
      <div className="container">
        <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 2300,
            disableOnInteraction: false,
          }}
          speed={800}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          modules={[Autoplay, EffectCoverflow]}
        >
          {images.map((image) => (
            <SwiperSlide className="swiper-slide1" key={image.id}>
              <img src={image.src} alt="cricket" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Carousel;
