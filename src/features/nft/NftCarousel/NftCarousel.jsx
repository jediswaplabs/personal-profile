import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import Link from '@mui/material/Link';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';

import 'swiper/css';
import 'swiper/css/bundle';

import Stack from '@mui/material/Stack';

import { NftCarouselContainer, NftCarouselHeader, NftCarouselContent } from './NftCarousel.styles';
import NftCard from '../NftCard/NftCard';

const noop = () => {};

const NftCarousel = ({ }) => (
  <NftCarouselContainer>
    <NftCarouselHeader>
      <Typography variant="h6" color="text.primary">Mesh NFTs</Typography>
    </NftCarouselHeader>
    <NftCarouselContent>
      <Swiper
        modules={[FreeMode]}
        spaceBetween={20}
        slidesPerView="auto"
        // grabCursor
        // freeMode
        // width={200}
        resistance
        resistanceRatio={0}
        // touchReleaseOnEdges
      >
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
        <SwiperSlide>
          <NftCard />
        </SwiperSlide>
      </Swiper>
    </NftCarouselContent>
  </NftCarouselContainer>
);

NftCarousel.propTypes = {};

export default NftCarousel;
