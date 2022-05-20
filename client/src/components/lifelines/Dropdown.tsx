import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button'
import '@reach/menu-button/styles.css'
import styled from 'styled-components'
import { PencilFill } from '@styled-icons/bootstrap'
import { TrashAlt } from '@styled-icons/boxicons-solid'
import { Show } from '@styled-icons/boxicons-regular/Show'
import { ChevronDown } from '@styled-icons/boxicons-solid'

export const StyledMenuList = styled(MenuList)`
  border-radius: 5.25px;
  padding: 0px;

  box-shadow: 0px 5px 10px;
`

export const StyledMenuButton = styled(MenuButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-color: ${({ theme }) => theme.secondaryBackground};
  color: ${({ theme }) => theme.secondaryText};
  background-color: ${({ theme }) => theme.background};
  border-radius: 5.25px;
  padding: 10px 10px 10px 10px;
  margin-right: 3px;
  margin-left: 3px;
  height: 33px;

  h3 {
    font-family: ${({ theme }) => theme.secondaryFonts};
    color: ${({ theme }) => theme.secondaryText};
    font-size: 1em;
    font-weight: lighter;
    margin-right: 5px;
  }
`

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const StyledTrash = styled(TrashAlt)`
  color: ${({ theme }) => theme.headerText};
  height: 16px;
  margin-right: 5px;
`

export const StyledShow = styled(Show)`
  color: ${({ theme }) => theme.headerText};
  height: 16px;
  margin-right: 5px;
`

export const StyledPencilFill = styled(PencilFill)`
  color: ${({ theme }) => theme.headerText};
  height: 16px;
  margin-right: 5px;
`

export const StyledChevronDown = styled(ChevronDown)`
  color: ${({ theme }) => theme.secondaryText};
  height: 22px;
  margin-right: 5px;
`

export const disabledMenuText = styled.h3`
  color: ${({ theme }) => theme.secondaryText};
`

export const MenuText = styled.h3`
  color: ${({ theme }) => theme.headerText};
  font-size: 1em;
  font-family: ${({ theme }) => theme.secondaryFonts};
  font-weight: lighter;
  margin-left: 5px;
`

export const StyledMenu = styled(Menu)`
  color: theme.secondaryBackground;
`

export const LifelineDropdown = ({isDisplayed}) => {
  return (
    <div>
      <Menu>
        <StyledMenuButton>
          <h3>Actions</h3>
          <StyledChevronDown />
        </StyledMenuButton>
        <StyledMenuList>
          <StyledMenuItem onSelect={() => alert('Show')}>
            <StyledShow />
            <MenuText>Show</MenuText>
          </StyledMenuItem>
          <StyledMenuItem onSelect={() => alert('Edit')}>
            <StyledPencilFill />
            <MenuText>Edit</MenuText>
          </StyledMenuItem>
          <StyledMenuItem onSelect={() => alert('Delete')}>
            <StyledTrash />
            <MenuText>Delete</MenuText>
          </StyledMenuItem>
        </StyledMenuList>
      </Menu>
    </div>
  )
}