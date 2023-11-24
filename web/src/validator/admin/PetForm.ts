import {
  ageOptions,
  environmentOptions,
  independencyOptions,
  petOptions,
  sizeOptions,
} from '@/utils/petsOptions'
import { z } from 'zod'

export const petFormSchemaValidator = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
    })
    .min(3, 'Nome deve ter no mínimo 3 caracteres'),
  age: z.enum(['', ...ageOptions.slice(1).map((age) => age.value)]),
  description: z
    .string()
    .min(10, 'Descrição deve ter no minímo 10 caracteres')
    .max(300, 'Descrição deve ter no máximo 300 caracteres'),
  energy: z
    .string()
    .refine(
      (energy) => Number(energy) > 0 && Number(energy) < 6,
      'Energia invalida',
    ),
  independence: z.enum([
    '',
    ...independencyOptions.slice(1).map((independence) => independence.value),
  ]),
  environment: z.enum(['', ...environmentOptions.map((env) => env.value)]),
  size: z.enum(['', ...sizeOptions.slice(1).map((size) => size.value)]),
  type: z.enum(['', ...petOptions.slice(1).map((pet) => pet.value)]),
  adoptionRequirements: z
    .string({
      required_error: 'Adicione pelo menos um requesito',
    })
    .refine(
      (requirements) => JSON.parse(requirements).length > 0,
      'Adicione pelo menos um requesito',
    ),
  images: z
    .array(z.instanceof(File))
    .min(1, 'É obrigatório ter no mínimo uma imagem')
    .max(6, 'Não é permitido enviar mais de 6 imagens')
    .superRefine((images, ctx) => {
      const imagesType = images.map((image) => image.type.split('/')[0])

      const everyIsImage = imagesType.every((type) => type === 'image')

      if (!everyIsImage) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          message: 'Não é permitido arquivos que não são imagens',
          expected: 'array',
          received: 'unknown',
        })
      }

      function verifyDuplicate(images: File[]) {
        const hashMap = {}
        const duplicates = []

        images.forEach((file) => {
          const fileName = file.name
          const fileSize = file.size

          const key = `${fileName}_${fileSize}`

          if (hashMap[key]) {
            duplicates.push(file)
          } else {
            hashMap[key] = true
          }
        })

        return duplicates
      }

      const duplicates = verifyDuplicate(images)
      if (duplicates.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Não pode conter imagens repetidas',
          // path: 'images',
        })
      }
    }),

  //   images: z
  //     .any()
  //     .refine((files) => files.length > 0, 'Adicione pelo menos uma imagem!'),
})

export type PetFormData = z.infer<typeof petFormSchemaValidator>
