import React from 'react';
import {View} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {useAuth} from '../../context/AuthContext';
import BarLoader from '../BarLoader';
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
  loading?: boolean;
}

function NavProducts({
  onSelectGroup,
  activeIndex,
  itens = [],
  loading = false,
}: NavProductsProps) {
  const {settings} = useAuth();
  return (
    <Container>
      <Logo>
        <LogoImage resizeMode="cover" source={{uri: settings.logo}} />
      </Logo>
      <NavList>
        {loading ? (
          <View style={{marginTop: 20, height: 100}}>
            <BarLoader size={40} color="#E11D48" />
          </View>
        ) : (
          itens.map((item, index) => {
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
          })
        )}
      </NavList>
    </Container>
  );
}

export default NavProducts;
