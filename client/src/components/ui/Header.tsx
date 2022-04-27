import styled from 'styled-components'

const PADDING: number = 1

const HeaderBorder = styled.div`
  height: 4px;
  background: ${({ theme }) => theme.black};
`

const LabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  /* align-items: center; */
  font-size: max(1rem, min(2rem, 3vw));
  height: 3vh;
  margin-bottom: 32px;

  @media only screen and (max-height: 700px) {
    margin-bottom: 0px;
    height: 17.65%; // 15% of 85
    font-size: min(15vh, 1.5vw);
  }
`

const Module = styled.div`
  display: flex;
  align-items: center;
  padding: ${PADDING}% ${PADDING}%;
  text-align: center;

  @media only screen and (max-height: 700px) {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.black};
  padding: 0 2%;
  opacity: 100%;
  color: ${(props) => props.color};

  @media only screen and (max-height: 700px) {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`

interface HeaderProps {
  moduleType: string
  title: string
  themeColor: any
}

export default function Header({ moduleType, title, themeColor }: HeaderProps) {
  return (
    <>
      <HeaderBorder />
      <LabelContainer>
        <Module>{moduleType}</Module>
        <Title color={themeColor}>{title}</Title>
      </LabelContainer>
    </>
  )
}