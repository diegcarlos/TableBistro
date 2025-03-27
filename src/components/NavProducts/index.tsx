import React from 'react';
import {SvgProps} from 'react-native-svg';
import logo from '../../assets/logoKukan.png';
import {
  Container,
  Logo,
  LogoImage,
  NavItem,
  NavItemText,
  NavList,
} from './styles';

interface NavItem {
  name: string;
  Icon?: React.FC<SvgProps>;
}

interface NavProductsProps {
  onSelectGroup: (index: number) => void;
  activeIndex: number;
  itens: NavItem[];
}

function NavProducts({
  onSelectGroup,
  activeIndex,
  itens = [],
}: NavProductsProps) {
  return (
    <Container>
      <Logo>
        <LogoImage resizeMode="cover" source={logo} />
      </Logo>
      <NavList>
        {itens.map((item, index) => {
          const Icon = item.Icon;
          return (
            <NavItem
              onPress={() => onSelectGroup(index)}
              isActive={activeIndex === index}
              key={index}>
              {Icon && <Icon width={24} height={24} />}
              <NavItemText>{item.name}</NavItemText>
            </NavItem>
          );
        })}
      </NavList>
    </Container>
  );
}

export default NavProducts;
