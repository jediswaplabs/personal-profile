import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Typography from '@mui/material/Typography';
import { FreeMode } from 'swiper';
import { useSelector } from 'react-redux';

import 'swiper/css';
import 'swiper/css/bundle';

import { NftCarouselContainer, NftCarouselHeader, NftCarouselContent } from './NftCarousel.styles';
import NftCard from '../NftCard/NftCard';
import { useLazyGetMeshNftByUserIdQuery } from '../../api/apiSlice';
import { selectProfileAddress } from '../../profile/profileSlice';

const NftCarousel = () => {
  const { t } = useTranslation();
  const profileId = useSelector(selectProfileAddress);

  const [getMeshNftByUserId, {
    data: nfts = {},
    isLoading,
    isSuccess,
    isError,
    isUninitialized,
  }] = useLazyGetMeshNftByUserIdQuery();

  useEffect(() => {
    if (!profileId) { return; }
    getMeshNftByUserId(profileId);
  }, [profileId]);

  const isEmpty = !nfts?.ids?.length;

  let content;
  if (isLoading || isUninitialized) {
    content = <MockNftCarousel />;
  } else if (isError) {
    content = <ErrorNftCarousel />;
  } else if (isEmpty) {
    content = <EmptyNftCarousel />;
  } else if (isSuccess) {
    content = (
      <Swiper modules={[FreeMode]} spaceBetween={20} slidesPerView="auto" resistance resistanceRatio={0}>
        {nfts.ids.map((id) => (
          <SwiperSlide key={id}>
            <NftCard {...nfts.entities[id]} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <NftCarouselContainer>
      <NftCarouselHeader>
        <Typography variant="h6" color="text.primary">{t('meshNftsCarousel.title')}</Typography>
      </NftCarouselHeader>
      <NftCarouselContent>
        <Swiper modules={[FreeMode]} spaceBetween={20} slidesPerView="auto" resistance resistanceRatio={0}>
          {content}
        </Swiper>
      </NftCarouselContent>
    </NftCarouselContainer>
  );
};

const MockNftCarousel = () => {
  const data = Array(12).fill();
  return (
    <Swiper enabled={false} spaceBetween={20} slidesPerView="auto">
      {data.map((_, key) => (
        <SwiperSlide key={key}>
          <NftCard isLoading />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const ErrorNftCarousel = () => {
  const { t } = useTranslation();
  return (
    <Typography variant="body1" color="text.primary">{t('meshNftsCarousel.errors.fetching')}</Typography>
  );
};
const EmptyNftCarousel = () => {
  const { t } = useTranslation();
  return (
    <Typography variant="body1" color="text.primary">{t('meshNftsCarousel.errors.empty')}</Typography>
  );
};

NftCarousel.propTypes = {};

export default NftCarousel;
