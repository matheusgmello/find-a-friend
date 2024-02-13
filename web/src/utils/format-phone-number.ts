export function formatPhoneNumber(phoneNumber: string) {
  if (!phoneNumber) return ''
  const regex = /^(\+55)?(\d{2})(\d{1})?(\d{4})(\d{4})$/

  const [, ddi, ddd, firstDigit = '', firstPart, secondPart] =
    phoneNumber.match(regex) || []

  const formatted = `${ddi} (${ddd}) ${firstDigit} ${firstPart}-${secondPart}`

  return formatted.replace(/\s{2,}/g, ' ')
}
