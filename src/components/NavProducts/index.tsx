import React from 'react';
import logo from '../../assets/logoKukan.png';
import Beer from '../../assets/svg/beer.svg';
import Belisquete from '../../assets/svg/belisquete.svg';
import BurgerIcon from '../../assets/svg/burger.svg';
import Drinks from '../../assets/svg/drinks.svg';
import Juice from '../../assets/svg/juice.svg';
import MilkShake from '../../assets/svg/milkshakes.svg';
import StarIcon from '../../assets/svg/star.svg';
import {
  Container,
  Logo,
  LogoImage,
  NavItem,
  NavItemText,
  NavList,
} from './styles';

const itens = [
  {name: 'Os mais pedidos', Icon: StarIcon},
  {name: 'Burgers', Icon: BurgerIcon},
  {name: 'Porções', Icon: Belisquete},
  {name: 'MilkShake', Icon: MilkShake},
  {name: 'Bebidas', Icon: Drinks},
  {name: 'Cerveja', Icon: Beer},
  {name: 'Suco', Icon: Juice},
];

interface NavProductsProps {
  onSelectGroup: (index: number) => void;
  activeIndex: number;
}

function NavProducts({onSelectGroup, activeIndex}: NavProductsProps) {
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
              <Icon width={24} height={24} />
              <NavItemText>{item.name}</NavItemText>
            </NavItem>
          );
        })}
      </NavList>
    </Container>
  );
}

export default NavProducts;
