import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const client = new PrismaClient()

async function run() {
  await client.adoptionRequirements.deleteMany()
  await client.petGallery.deleteMany()
  await client.pet.deleteMany()
  await client.org.deleteMany()

  /**
   * Criar orgs
   */

  const password = await bcryptjs.hash('123456', 8)

  await Promise.all([
    client.org.create({
      data: {
        id: '30ab4c94-593c-4a5b-8249-54364ef77612',
        cep: '01310‑900',
        address: 'Avenida Paulista, 52',
        email: 'adote_pets@email.com',
        name: 'Adote Pets',
        password,
        whatsappNumber: '+558699999999',
      },
    }),
    client.org.create({
      data: {
        id: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
        cep: '01310‑902',
        address: 'Avenida Paulista, 326',
        email: 'catinhos@email.com',
        name: 'Catinhos',
        password,
        whatsappNumber: '+558699999998',
      },
    }),
  ])

  /**
   * Criar pets
   */

  await Promise.all([
    client.pet.create({
      data: {
        id: '137d9eb5-aae2-4aa2-958a-525ec830dde9',
        name: 'Caramelinho',
        age: 'cub',
        size: 'medium',
        city: 'Sao Paulo',
        description: 'Um doguinho para quem tem muito amor para dar',
        energy: 3,
        independence: 'high',
        type: 'dog',
        orgId: '30ab4c94-593c-4a5b-8249-54364ef77612',
        photo: 'caramelinho.jpeg',
      },
    }),
    client.pet.create({
      data: {
        id: 'e12378c3-0870-48c4-8341-3e0f780c3201',
        name: 'Yoda',
        age: 'adolescent',
        size: 'small',
        city: 'Sao Paulo',
        description: 'Um companheiro para todas as horas',
        energy: 5,
        independence: 'low',
        type: 'cat',
        orgId: '30ab4c94-593c-4a5b-8249-54364ef77612',
        photo: 'yoda.jpeg',
      },
    }),
    client.pet.create({
      data: {
        id: '94f3c2fb-806a-4624-b24e-88b925581dce',
        name: 'Tigrão',
        age: 'elderly',
        size: 'big',
        city: 'Sao Paulo',
        description: 'Um bom amigo para quem gosta de um dog mais quietinho',
        energy: 2,
        independence: 'medium',
        type: 'dog',
        photo: 'tigrao.jpeg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Max',
        age: 'elderly',
        size: 'small',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 2,
        independence: 'high',
        type: 'dog',
        photo: 'dog-01.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Bella',
        age: 'elderly',
        size: 'medium',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 2,
        independence: 'high',
        type: 'dog',
        photo: 'dog-02.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Charlie',
        age: 'elderly',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 2,
        independence: 'medium',
        type: 'dog',
        photo: 'dog-03.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Lucy',
        age: 'cub',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 3,
        independence: 'medium',
        type: 'dog',
        photo: 'dog-04.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Rocky',
        age: 'adolescent',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 3,
        independence: 'medium',
        type: 'dog',
        photo: 'dog-05.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Daisy',
        age: 'elderly',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 3,
        independence: 'medium',
        type: 'dog',
        photo: 'dog-06.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Zeus',
        age: 'cub',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 4,
        independence: 'medium',
        type: 'dog',
        photo: 'dog-07.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Luna',
        age: 'adolescent',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 4,
        independence: 'low',
        type: 'dog',
        photo: 'dog-08.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Duke',
        age: 'elderly',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 5,
        independence: 'medium',
        type: 'dog',
        photo: 'dog-09.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Sadie',
        age: 'elderly',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 5,
        independence: 'high',
        type: 'dog',
        photo: 'dog-10.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Simba',
        age: 'elderly',
        size: 'small',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 2,
        independence: 'high',
        type: 'cat',
        photo: 'cat-01.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Luna',
        age: 'elderly',
        size: 'medium',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 2,
        independence: 'high',
        type: 'cat',
        photo: 'cat-02.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Oliver',
        age: 'elderly',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 2,
        independence: 'medium',
        type: 'cat',
        photo: 'cat-03.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Cleo',
        age: 'cub',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 3,
        independence: 'medium',
        type: 'cat',
        photo: 'cat-04.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Garfield',
        age: 'adolescent',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 3,
        independence: 'medium',
        type: 'cat',
        photo: 'cat-05.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Whiskers',
        age: 'elderly',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 3,
        independence: 'medium',
        type: 'cat',
        photo: 'cat-06.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Mittens',
        age: 'cub',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 4,
        independence: 'medium',
        type: 'cat',
        photo: 'cat-07.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Shadow',
        age: 'adolescent',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 4,
        independence: 'low',
        type: 'cat',
        photo: 'cat-08.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Tiger',
        age: 'elderly',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 5,
        independence: 'medium',
        type: 'cat',
        photo: 'cat-09.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
    client.pet.create({
      data: {
        name: 'Boots',
        age: 'elderly',
        size: 'big',
        city: 'Rio De Janeiro',
        description: 'Um ótimo petinho',
        energy: 5,
        independence: 'high',
        type: 'cat',
        photo: 'cat-10.jpg',
        orgId: '24c7192d-1e26-4ced-bc65-2ae3a942d126',
      },
    }),
  ])

  /**
   * Criar galeria para os pets
   */

  await Promise.all([
    client.petGallery.create({
      data: {
        image: 'caramelinho.jpeg',
        petId: '137d9eb5-aae2-4aa2-958a-525ec830dde9',
      },
    }),
    client.petGallery.create({
      data: {
        image: 'caramelinho-1.jpeg',
        petId: '137d9eb5-aae2-4aa2-958a-525ec830dde9',
      },
    }),
    client.petGallery.create({
      data: {
        image: 'caramelinho-2.jpeg',
        petId: '137d9eb5-aae2-4aa2-958a-525ec830dde9',
      },
    }),

    client.petGallery.create({
      data: {
        image: 'yoda.jpeg',
        petId: 'e12378c3-0870-48c4-8341-3e0f780c3201',
      },
    }),
    client.petGallery.create({
      data: {
        image: 'yoda-1.jpeg',
        petId: 'e12378c3-0870-48c4-8341-3e0f780c3201',
      },
    }),
    client.petGallery.create({
      data: {
        image: 'yoda-2.jpeg',
        petId: 'e12378c3-0870-48c4-8341-3e0f780c3201',
      },
    }),

    client.petGallery.create({
      data: {
        image: 'tigrao.jpeg',
        petId: '94f3c2fb-806a-4624-b24e-88b925581dce',
      },
    }),
    client.petGallery.create({
      data: {
        image: 'tigrao-1.jpg',
        petId: '94f3c2fb-806a-4624-b24e-88b925581dce',
      },
    }),
    client.petGallery.create({
      data: {
        image: 'tigrao-2.jpeg',
        petId: '94f3c2fb-806a-4624-b24e-88b925581dce',
      },
    }),
  ])

  await Promise.all([
    client.adoptionRequirements.create({
      data: {
        petId: '137d9eb5-aae2-4aa2-958a-525ec830dde9',
        title: 'Ter tempo para brincadeiras e passeios',
      },
    }),
    client.adoptionRequirements.create({
      data: {
        petId: 'e12378c3-0870-48c4-8341-3e0f780c3201',
        title: 'Não ter cachorros em casa',
      },
    }),
    client.adoptionRequirements.create({
      data: {
        petId: '94f3c2fb-806a-4624-b24e-88b925581dce',
        title: 'Ter tempo para cuidar e dar atenção',
      },
    }),
  ])
}

run()
  .then(async () => {
    await client.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await client.$disconnect()
    process.exit(1)
  })
