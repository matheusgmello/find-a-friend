import { z } from 'zod'

export const registerFormSchemaValidator = z
  .object({
    name: z
      .string({
        required_error: 'Nome é obrigatório',
      })
      .min(3, 'O nome deve conter pelo menos 3 caracteres')
      .max(100, 'O nome deve conter no máximo 100 caracteres'),
    email: z
      .string({ required_error: 'Email é obrigatório' })
      .email('Email inválido'),
    zip: z
      .string({
        required_error: 'CEP é obrigatório',
      })
      .regex(/^[0-9]{8}$/, 'CEP inválido'),
    address: z.string({
      required_error: 'Endereço é obrigatório',
    }),
    phone: z
      .string({
        required_error: 'Telefone é obrigatório',
      })
      .min(11, 'Telefone inválido'),
    password: z
      .string({
        required_error: 'Senha é obrigatório',
      })
      .min(8, 'Senha deve conter no minímo 8 caracteres')
      .max(50, 'Senha não pode conter mais de 50 caracteres'),
    passwordConfirm: z
      .string({
        required_error: 'Senha é obrigatório',
      })
      .min(8, 'Senha deve conter no minímo 8 caracteres')
      .max(50, 'Senha não pode conter mais de 50 caracteres'),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas não conferem',
        path: ['confirmPassword'],
      })
    }
  })

export type RegisterOrgFormData = z.infer<typeof registerFormSchemaValidator>
