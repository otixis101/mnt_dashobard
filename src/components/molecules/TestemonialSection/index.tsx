import TestimonialCard from "@/components/atoms/TestimonialCard";
import LegacyImage from "public/assets/mobile-family-legacy.jpg";

import {
  AboutSectionHeading,
  AboutSectionText,
} from "@/components/atoms/About/Primitives";
import ReactSwiper from "@/components/atoms/ReactSwiper";

const TestimonialSection = () => (
  <section className="container mx-auto mt-20 px-5 md:my-20 md:mt-28">
    <div className="mb-10 space-y-4 text-center">
      <AboutSectionHeading className="mx-auto">
        What People have to say about My Native Tree
      </AboutSectionHeading>
      <AboutSectionText className="mx-auto max-w-[40ch] text-gray-500">
        Not our words but theirs. Hear what others think about the leading
        family tree app for people of color.
      </AboutSectionText>
    </div>
    <div>
      <div className="testimonial relative mx-auto px-10 md:max-w-[90%] md:px-20">
        <ReactSwiper.Swiper
          breakpoints={{
            992: {
              slidesPerView: 2,
            },
            756: {
              slidesPerView: 2,
            },
            500: {
              slidesPerView: 1,
            },
          }}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={16}
          autoHeight
          loop
          autoplay={{
            delay: 2000,
          }}
          speed={1000}
          navigation
        >
          {[0, 1, 2, 3].map((n) => (
            <ReactSwiper.SwiperSlide key={n}>
              <TestimonialCard
                name="Ohim Chim"
                image={LegacyImage}
                jobRole="Doctor"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dis turpis nisi, justo, integer dignissim ornare leo euismod ac"
              />
            </ReactSwiper.SwiperSlide>
          ))}
        </ReactSwiper.Swiper>
      </div>
    </div>
  </section>
);

export default TestimonialSection;
