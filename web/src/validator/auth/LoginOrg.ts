import { z } from 'zod'

export const loginFormSchemaValidator = z.object({
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .email('Email inválido'),

  password: z
    .string({
      required_error: 'Senha é obrigatório',
    })
    .min(8, 'Senha deve conter no minímo 8 caracteres')
    .max(50, 'Senha não pode conter mais de 50 caracteres'),
})

export type LoginOrgFormData = z.infer<typeof loginFormSchemaValidator>
