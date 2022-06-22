import { Menu } from '@styled-icons/boxicons-regular'
import { CloseOutline } from '@styled-icons/evaicons-outline'
import { useEffect, useState } from 'react'
import { FullScreenHandle } from 'react-full-screen'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import EnterFullscreen from '../../components/buttons/EnterFullscreen'
import ExitFullscreen from '../../components/buttons/ExitFullscreen'
import clock from '../../images/clock.png'
import MobileBar from '../buttons/MobileBar'

const NavBox = styled.div`
  font-family: ${({ theme }) => theme.secondaryFonts};

  ${(props) =>
    props.isFullScreen ? 'position: absolute;' : 'overflow: hidden;'}
  width: 100%;
  ${(props) => (props.mobileWidth ? 'height: 2vh;' : 'height 55px;')}
  z-index: 11;
  background-color: ${({ theme }) => theme.black};

  margin-top: ${(props) =>
    props.isFullScreen && !props.inBounds ? '-55px' : '0px'};

  transition: 0.3s ease-out;
  ${(props) =>
    props.showMobileNavbar ? 'position: absolute' : 'position: relative'};
`

const PageLink = styled.div`
  align-items: center;
  float: right;
  color: ${({ theme }) => theme.navBarText};
  text-align: center;
  padding: 20px 3vw;
  text-decoration: none;
  font-size: 1em;
  font-weight: bold;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

const FullScreenButton = styled.div`
  float: right;
  padding: 20px 3vw;
`

const StyledCloseOutline = styled(CloseOutline)`
  float: right;
  color: white;
  size: 2.5em;
  display: block;

  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

/*
The padding is slightly weird; however, the logo's left-padding should match that of the deadline
So, if that changes, so should this value
*/
const HomeLink = styled.div`
  float: left;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.black};
  text-align: center;
  padding: 20px 1%;
  text-decoration: none;
  font-size: 18.5px;
  font-weight: bold;
  color: white;
  &:hover {
    color: ${({ theme }) => theme.blue};
  }
`

const Button = styled.div`
  display: inline-flex;
`

const Logo = styled.img`
  padding-left: 10px;
`

const StyledMenu = styled(Menu)`
  float: right;
  display: flex;
  align-items: center;
  padding-top: 
  color: white;
  size: 2.5em;
  display: block;
`

function NavBar({
  handle,
  isFullScreen,
  atHome,
}: {
  handle: FullScreenHandle
  isFullScreen: boolean
  atHome: boolean
}) {
  const [mobileWidth, setMobileWidth] = useState(
    window.matchMedia('(max-width: 800px)').matches,
  )
  useEffect(() => {
    window
      .matchMedia('(max-width: 800px)')
      .addEventListener('change', (e) => setMobileWidth(e.matches))
  }, [])

  const [showMobileNavbar, setMobileNavbar] = useState(false)

  function MouseTrack(): boolean {
    const [y, setY] = useState()
    useEffect(() => {
      const update = (e) => {
        setY(e.y)
      }
      window.addEventListener('mousemove', update)
      window.addEventListener('touchmove', update)
      return () => {
        window.removeEventListener('mousemove', update)
        window.removeEventListener('touchmove', update)
      }
    })
    return y && y <= 100 ? true : false
  }

  return (
    <>
      <NavBox isFullScreen={!isFullScreen} inBounds={MouseTrack()}>
        <Link to="/">
          <HomeLink>
            <Button>
              Climate Clock
              <Logo src={clock} alt="climate_clock_logo" height="25px" width="25px"/>
            </Button>
          </HomeLink>
        </Link>
        {atHome ? (
          <FullScreenButton>
            {isFullScreen ? (
              <EnterFullscreen handle={handle} />
            ) : (
              <ExitFullscreen handle={handle} />
            )}
          </FullScreenButton>
        ) : (
          ' '
        )}
        {mobileWidth ? (
          [
            !showMobileNavbar ? (
              <StyledMenu
                size="2.5em"
                onClick={() => {
                  setMobileNavbar(!showMobileNavbar)
                }}
              />
            ) : (
              <StyledCloseOutline
                size="2.5em"
                onClick={() => {
                  setMobileNavbar(!showMobileNavbar)
                }}
              />
            ),
          ]
        ) : (
          <>
            <Link to="/settings">
              <PageLink>Settings</PageLink>
            </Link>
            <Link to="/lifelines">
              <PageLink>Lifelines</PageLink>
            </Link>
          </>
        )}
      </NavBox>
      {mobileWidth && <MobileBar showMobileNavbar={showMobileNavbar} />}
    </>
  )
}

export default NavBar
