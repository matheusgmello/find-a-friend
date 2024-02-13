import { RateContainer, RateSymbols, RateLabel } from './styles'

interface RateCardProps {
  label: string
  maxRate: number
  initialRate: number
  rateOnSymbol: string
  rateOffSymbol: string
}

export function RateCard({
  initialRate,
  label,
  maxRate,
  rateOffSymbol,
  rateOnSymbol,
}: RateCardProps) {
  const rate = Array(maxRate)
    .fill(0)
    .map((_, index) => {
      return index < initialRate ? rateOnSymbol : rateOffSymbol
    })
  return (
    <RateContainer>
      <RateSymbols>
        {rate.map((symbol, index) => {
          return <img key={String(index)} src={symbol} alt="" />
        })}
      </RateSymbols>
      <RateLabel>{label}</RateLabel>
    </RateContainer>
  )
}
