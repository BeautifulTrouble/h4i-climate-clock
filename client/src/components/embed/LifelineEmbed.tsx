import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { LifelinePropsInterface } from '../../interfaces'
import Header from '../ui/Header'

const VALUE_UNIT_MARGIN = 1

const Container = styled.div`
  & {
    font-family: ${({ theme }) => theme.fonts};
    background: ${({ theme }) => theme.blue};
    font-weight: bold;
    height: 14.666666667vh;

    @media only screen and (min-width: 1025px) {
      height: auto;
      width: 50%;
    }

    // code for stacking
    @media only screen and (max-width: 1024px) {
      height: auto;
      height: 45vh;
      width: 100%;
    }

    width: 100vw;
  }
`
const ContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: max(1rem, min(1.5rem, 3vw));
  margin-bottom: 32px;
  width: 100%;

  @media only screen and (max-height: 700px) {
    height: 82.35%; // 85% of 85
    margin-bottom: 0px;
    font-size: max(5vh, min(1.5rem, 6vw));
  }
`

const Value = styled.div`
  display: flex;
  align-items: center;
  font-size: 3em;
  margin-right: ${VALUE_UNIT_MARGIN}vw;
  margin-left: ${VALUE_UNIT_MARGIN}vw;
  margin-top: 25px;

  @media only screen and (max-height: 700px) {
    font-size: max(7vh, min(2.75rem, 12vw));
    margin-top: 0px;
  }

  // code for stacking
  @media only screen and (max-width: 1024px) {
    font-size: max(5.5vh, min(2.25rem, 12.5vw));
  }
`

const Unit = styled.div`
  margin-left: ${VALUE_UNIT_MARGIN}vw;
  margin-right: ${VALUE_UNIT_MARGIN}vw;
  @media only screen and (max-height: 700px) {
    font-size: max(3.5vh, min(1.75rem, 6.5vw));
  }
  // code for stacking
  @media only screen and (max-width: 1024px) {
    font-size: max(4vh, min(1.5rem, 5vw));
  }
`

interface LifelifeEmbedPropsInterface extends LifelinePropsInterface {
  lifelineIndex: number
  updateSavedValue: (index: number, value: number) => void
}

function Lifeline({
  title,
  module_type,
  value,
  resolution,
  rate,
  unit,
  lifelineIndex,
  updateSavedValue,
}: LifelifeEmbedPropsInterface) {
  const seconds = 0.1 // running every every seconds * 1000
  const decimalPlaces = !resolution ? 0 : Math.log10(1 / resolution) // set the precision of value (ie. props.resolution = 1e-9 => 9)
  const cleanedRate = !rate ? 0 : rate // store rate at which to update value
  const isMoneyVal = !unit || unit.charAt(0) !== '$' ? false : true // used to fix monetary units passed in (ie. $)
  const [llVal, setLLVal] = useState<number>(
    !value ? cleanedRate : value + cleanedRate,
  )

  /* update lifeline value within interval */
  useEffect(() => {
    const interval = setInterval(() => {
      if (cleanedRate !== 0) {
        setLLVal((llVal) => llVal + cleanedRate)
      }
    }, seconds * 1000)

    return () => {
      clearInterval(interval)
      updateSavedValue(lifelineIndex, llVal)
    }
  }, [cleanedRate, lifelineIndex, llVal, updateSavedValue])

  return (
    <Container>
      <Header
        moduleType={module_type}
        title={title}
        themeColor={({ theme }) => theme.blue}
      />
      <ContentContainer>
        <Value>
          {isMoneyVal && '$'}
          {llVal.toFixed(decimalPlaces)}
        </Value>
        <Unit> {!isMoneyVal ? unit : unit.substring(1)}</Unit>
      </ContentContainer>
    </Container>
  )
}

export default Lifeline
