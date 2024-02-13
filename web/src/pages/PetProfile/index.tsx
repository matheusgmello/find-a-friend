import { useState } from 'react'
import { useParams } from 'react-router-dom'

import boltDuotone from '@/assets/icons/bolt-duotone.svg'
import boltOutline from '@/assets/icons/bolt-outline.svg'
import circleDuotone from '@/assets/icons/circle-duotone.svg'
import circleFill from '@/assets/icons/circle-fill.svg'
import logoImg from '@/assets/icons/logo.svg'
import maximize from '@/assets/icons/maximize.svg'
import { energyRecord, sizeRecord } from '@/constant/pet-record'
import { useCoordinates } from '@/hooks/use-location'
import {
  usePetDetail,
  usePetGallery,
  usePetRequirements,
} from '@/hooks/use-pet'
import { Alert } from '~/Alert'
import { ButtonWhatsApp } from '~/ButtonWhatsApp'
import { ChipPhoneNumber } from '~/ChipPhoneNumber'
import { MapPet } from '~/MapPet'
import { RateCard } from '~/RateCard'
import { Sidebar } from '~/Sidebar'

import {
  Banner,
  CharacteristicsList,
  Container,
  Content,
  FooterActions,
  Header,
  ImageList,
  ImageListItem,
  MapOrgContainer,
  ProfileContainer,
  RequirementList,
  SectionContact,
  SectionImages,
  SectionPet,
  SectionRequirement,
  SquashIcon,
} from './styles'

type PetProfileParams = {
  id: string
}

export function PetProfile() {
  const params = useParams<PetProfileParams>()

  const petDetail = usePetDetail(params.id)
  const petImages = usePetGallery(params.id)
  const requirements = usePetRequirements(params.id)
  const coordinates = useCoordinates(petDetail?.org?.cep)
  const [imageSelected, setImageSelected] = useState<string>(
    petDetail.photo_url,
  )

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          <p>Seu novo melhor amigo</p>
        </Header>
        <ProfileContainer>
          <SectionImages>
            <Banner>
              <img
                src={imageSelected || petDetail.photo_url}
                alt={petDetail.name}
              />
            </Banner>
            <ImageList>
              {petImages.map((image) => (
                <ImageListItem
                  key={image.id}
                  onClick={() => setImageSelected(image.photo_url)}
                >
                  <img
                    src={image.photo_url}
                    alt=""
                    className={
                      imageSelected
                        ? imageSelected === image.photo_url
                          ? 'active'
                          : ''
                        : petImages.at(0)?.photo_url === image.photo_url
                        ? 'active'
                        : ''
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </SectionImages>

          <SectionPet>
            <h1>{petDetail.name}</h1>
            <p>{petDetail.description}</p>
            <CharacteristicsList>
              <RateCard
                initialRate={energyRecord[petDetail?.energy]?.valueAsNumber}
                maxRate={5}
                label={energyRecord[petDetail?.energy]?.label}
                rateOffSymbol={boltDuotone}
                rateOnSymbol={boltOutline}
              />
              <RateCard
                initialRate={1}
                maxRate={1}
                label={'Ambiente amplo'}
                rateOffSymbol={maximize}
                rateOnSymbol={maximize}
              />
              <RateCard
                initialRate={sizeRecord[petDetail?.size]?.valueAsNumber}
                maxRate={3}
                label={sizeRecord[petDetail?.size]?.label}
                rateOffSymbol={circleDuotone}
                rateOnSymbol={circleFill}
              />
            </CharacteristicsList>

            <MapOrgContainer>
              <MapPet
                coordinates={coordinates}
                popupText={`${petDetail.org?.nome} - ${petDetail.org?.address}`}
              />

              <footer>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates?.latitude},${coordinates?.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </MapOrgContainer>
          </SectionPet>

          <SectionContact>
            <SquashIcon>
              <img src={logoImg} alt="Face cachorro" />
            </SquashIcon>
            <div>
              <h2>{petDetail.org?.nome}</h2>
              <p>{petDetail.org?.address}</p>
            </div>
            <div className="contact-info">
              <ChipPhoneNumber phoneNumber={petDetail.org?.whatsappNumber} />
            </div>
          </SectionContact>

          <SectionRequirement>
            <header>
              <h2>Requisitos para adoção</h2>
            </header>
            <RequirementList>
              {requirements.map((requirement) => (
                <Alert key={requirement.id} text={requirement.title}></Alert>
              ))}
            </RequirementList>
          </SectionRequirement>

          <FooterActions>
            <ButtonWhatsApp
              label="Entrar em Contato"
              whatsappNumber={petDetail.org?.whatsappNumber}
            />
          </FooterActions>
        </ProfileContainer>
      </Content>
    </Container>
  )
}
