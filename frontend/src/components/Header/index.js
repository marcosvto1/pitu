import React from 'react';
import { Logo, HeaderContainer } from './styles';
function Header(props) {
  return (
    <HeaderContainer>
      <Logo src="https://gtswiki.gt-beginners.net/decal/png/20/51/25/7070670107206255120_1.png" alt='Pitu - Encurtador de url' />
      <h1>Pituzeira</h1>
  <p>{props.children}</p>
    </HeaderContainer>
  )
}


export default Header;