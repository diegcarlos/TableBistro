import React from 'react';
import {SvgProps} from 'react-native-svg';
import {useAuth} from '../../context/AuthContext';
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
  const {settings} = useAuth();
  return (
    <Container>
      <Logo>
        <LogoImage resizeMode="cover" source={{uri: settings.logo}} />
      </Logo>
      <NavList>
        {itens.map((item, index) => {
          const Icon = item.Icon;
          return (
            <NavItem
              onPress={() => onSelectGroup(index)}
              isActive={activeIndex === index}
              key={item.name}>
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
