/* eslint-disable no-useless-return */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useStarknetReact } from '@web3-starknet-react/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';
import { EffectFade, Navigation } from 'swiper';
import cn from 'classnames';

import 'swiper/css';
import 'swiper/css/bundle';

import { Cover,
  ModalContainer,
  ModalInner,
  IntroductionStepAvatarGroups,
  IntroductionStepContainer,
  IntroductionStepTitles,
  NextStepButton,
  SelectNftStepContainer,
  SelectProfilePictureFormContainer,
  SelectNftStepTitle,
  SelectNftStepSlider,
  SliderNavigationArrowPrev,
  SliderNavigationArrowNext, SelectNftStepSliderCounter } from './SelectProfilePictureModal.styles';
import JediModal from '../../../components/JediModal/JediModal';
import UserAvatar from '../UserAvatar/UserAvatar';
import { useLazyGetMeshNftByUserIdQuery } from '../../api/apiSlice';
import { DEFAULT_IMAGE } from '../../nft/NftCard/NftCard';

const noop = () => {};

const SelectProfilePictureModal = ({ children, ...props }) => {
  const { active, connectedAddress, account, connector, activate, error, chainId } = useStarknetReact();

  const handleOnClose = useCallback(
    () => {
      props?.onClose?.();
    },
    [],
  );

  return (
    <ModalContainer>
      <JediModal {...props} onClose={handleOnClose}>
        <ModalInner>
          123
        </ModalInner>
      </JediModal>
    </ModalContainer>
  );
};

const SelectProfilePictureForm = ({ account }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleOnNextStep = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const [getMeshNftByUserId, {
    data: nfts = {},
    isFetching,
    isSuccess,
    isError,
    isUninitialized,
  }] = useLazyGetMeshNftByUserIdQuery();

  useEffect(() => {
    if (!account) { return; }
    getMeshNftByUserId(account);
  }, [account]);

  //
  let content;
  if (isError || !account) {
  //   content = <ErrorNftCarousel />;
  } else if (isFetching || isUninitialized) {
  //   content = <MockNftCarousel />;
  } else if (isSuccess) {
    content = (
      <>
        {activeStep === 0 && <IntroductionStep onNextStep={handleOnNextStep} /> }
        {activeStep === 1 && <SelectNftStep onNextStep={handleOnNextStep} nfts={nfts} /> }
        {activeStep === 2 && <FinalStep /> }
      </>
    );
  }

  return (
    <SelectProfilePictureFormContainer>
      {content}
    </SelectProfilePictureFormContainer>
  );
};

const IntroductionStep = ({ onNextStep = noop }) => (
  <IntroductionStepContainer>
    <Cover />
    <IntroductionStepAvatarGroups>
      <UserAvatar size="90px" />
      <UserAvatar size="120px" />
      <UserAvatar size="90px" />
    </IntroductionStepAvatarGroups>

    <IntroductionStepTitles>
      <Stack gap={1.5}>
        <Typography variant="h5" component="span" color="text.primary">Show off your prized possessions</Typography>
        <Typography variant="subtitle1" component="span" color="text.primary">Set your profile picture to an NFT you have earned</Typography>
      </Stack>
    </IntroductionStepTitles>

    <NextStepButton onClick={onNextStep}>
      <Typography variant="h5" component="span" color="text.primary">Select NFT</Typography>
    </NextStepButton>
  </IntroductionStepContainer>
);

const SelectNftStep = ({ onNextStep = noop, onNftSelected = noop, nfts = {} }) => {
  const { t } = useTranslation();
  const [selectedNftId, setSelectedNftId] = useState(null);
  const [selectedSlideId, setSelectedSlideId] = useState(-1);
  const [currentSlideId, setCurrentSlideId] = useState(0);

  const handleOnSelectSlide = useCallback((slideIndex, nftId) => {
    if (slideIndex === selectedSlideId) {
      setSelectedNftId(null);
      setSelectedSlideId(-1);
      return;
    }
    setSelectedSlideId(slideIndex);
    setSelectedNftId(nftId);
  }, [setSelectedSlideId, selectedSlideId]);

  const handleOnSubmitNft = useCallback(() => {
    if (!selectedNftId) { return; }

    onNextStep();
    // TODO отправка на бекенд и loading
  }, [selectedNftId]);

  useEffect(() => {
    onNftSelected(selectedNftId);
  }, [selectedNftId]);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const isEmpty = !nfts?.ids?.length;

  return (
    <SelectNftStepContainer>
      {isEmpty && (
        <Typography variant="body1" color="text.primary">You don't have available NFTs</Typography>
      )}

      {!isEmpty && (
        <>
          <SelectNftStepTitle>
            <Typography variant="h5" color="text.primary">Select NFT</Typography>
          </SelectNftStepTitle>

          <SelectNftStepSlider>
            <SelectNftStepSliderCounter>
              <Typography variant="body1" color="text.primary" sx={{ fontWeight: 300 }}>{currentSlideId + 1} out of {nfts?.ids?.length}</Typography>
            </SelectNftStepSliderCounter>
            <Swiper
              modules={[Navigation, EffectFade]}
              spaceBetween={0}
              effect="fade"
              speed={0}
              slidesPerView={1}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              resistanceRatio={0.5}
              style={{ paddingLeft: '20px', paddingRight: '20px' }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
              }}
              onSlideChange={(swiper) => {
                setCurrentSlideId(swiper.activeIndex);
              }}
            >
              {nfts.ids.map((id, index) => (
                <SwiperSlide key={id} className={cn({ 'is-selected': (index === selectedSlideId) })}>
                  <div className="image-wrapper">
                    <img
                      src={nfts.entities[id].image.src ?? DEFAULT_IMAGE.src}
                      alt={nfts.entities[id].image.alt ?? DEFAULT_IMAGE.alt}
                      title={nfts.entities[id].image.title ?? DEFAULT_IMAGE.title}
                      onClick={() => handleOnSelectSlide(index, id)}
                    />
                  </div>
                </SwiperSlide>
              ))}
              <SliderNavigationArrowPrev ref={navigationPrevRef}>
                <TrendingFlatIcon fontSize="large" />
              </SliderNavigationArrowPrev>
              <SliderNavigationArrowNext ref={navigationNextRef}>
                <TrendingFlatIcon fontSize="large" />
              </SliderNavigationArrowNext>
            </Swiper>
          </SelectNftStepSlider>

          <NextStepButton onClick={handleOnSubmitNft}
            disabled={!selectedNftId}
            // loading
          >
            <Typography variant="h5" component="span" color="text.primary">Apply</Typography>
          </NextStepButton>
        </>
      )}
    </SelectNftStepContainer>
  );
};

const FinalStep = ({ onNextStep = noop }) => (
  <IntroductionStepContainer>
    <Cover height="180px" />
    <IntroductionStepAvatarGroups>
      <UserAvatar size="90px" />
      <UserAvatar size="120px" />
      <UserAvatar size="90px" />
    </IntroductionStepAvatarGroups>

    <IntroductionStepTitles>
      <Stack gap={1.5}>
        <Typography variant="h5" component="span" color="text.primary">Show off your prized possessions</Typography>
        <Typography variant="subtitle1" component="span" color="text.primary">Set your profile picture to an NFT you have earned</Typography>
      </Stack>
    </IntroductionStepTitles>

    <NextStepButton onClick={onNextStep}>
      <Typography variant="h5" component="span" color="text.primary">Select NFT</Typography>
    </NextStepButton>
  </IntroductionStepContainer>
);

export default SelectProfilePictureModal;

export {
  SelectProfilePictureForm,
  IntroductionStep,
  SelectNftStep,
  FinalStep,
};
