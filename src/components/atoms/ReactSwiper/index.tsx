import Swiper, { Autoplay, Navigation } from "swiper";
/** React Swiper is a wrapper for swiper js, does'nt do much */
import * as ReactSwiper from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

Swiper.use([Autoplay, Navigation]);

/** Would add better customizations later */

export default ReactSwiper;
