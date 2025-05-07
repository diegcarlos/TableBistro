import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '..';
import LogoutIcon from '../../assets/svg/logout.svg';
import TableIcon from '../../assets/svg/table.svg';
import {ButtonRed} from '../../components/ButtonRed';
import {useAuth} from '../../context/AuthContext';
import PasswordCheck from './PasswordCheck';
import {Container, Title} from './styled';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AdminScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {signOut} = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGoToInsertTable = () => {
    navigation.navigate('InsertTable');
  };

  const handleLogout = async () => {
    try {
      // Espera o signOut completar antes de navegar
      await signOut();

      // Usa setTimeout para garantir que a navegação aconteça no próximo ciclo
      navigation.replace('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (!isAuthenticated) {
    return <PasswordCheck onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <Container>
      <Title>Painel de Administração</Title>

      <View style={styles.buttonsContainer}>
        <ButtonRed onPress={handleGoToInsertTable} style={styles.mainButton}>
          <View style={styles.buttonContent}>
            <TableIcon width={32} height={32} fill="#F9F9F9" />
            <Text style={styles.mainButtonText}>Alterar Mesa</Text>
          </View>
        </ButtonRed>

        <ButtonRed
          onPress={handleLogout}
          style={[styles.mainButton, styles.logoutButton]}>
          <View style={styles.buttonContent}>
            <LogoutIcon width={32} height={32} fill="#F9F9F9" />
            <Text style={styles.mainButtonText}>Deslogar</Text>
          </View>
        </ButtonRed>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
    padding: 20,
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    elevation: 4,
  },
  mainButton: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#3A3A3A',
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mainButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F9F9F9',
  },
  logoutButton: {
    backgroundColor: '#C83A2E',
    borderColor: '#C83A2E',
  },
});

export default AdminScreen;
