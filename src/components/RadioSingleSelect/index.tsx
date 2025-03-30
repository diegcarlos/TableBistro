import {useEffect, useState} from 'react';
import {Container, Radio, RadioContent, RadioText, Title} from './styled';

interface RadioSelectSingleProps {
  onChange?: (value: {id: number; text: string}) => void;
  dataRadio: {
    title: string;
    data: {id: number; text: string}[];
  };
}

export function RadioSelectSingle(props: RadioSelectSingleProps) {
  const {dataRadio, onChange} = props;
  const [select, setSelect] = useState(0);
  useEffect(() => {
    return () => {
      setSelect(0);
    };
  }, []);
  return (
    <Container>
      <Title>{dataRadio?.title}</Title>
      {dataRadio?.data?.map(item => (
        <RadioContent
          key={item.id}
          onPress={() => {
            setSelect(item.id);
            onChange?.(item);
          }}>
          <Radio check={select === item.id} />
          <RadioText>{item.text}</RadioText>
        </RadioContent>
      ))}
    </Container>
  );
}
