export interface PedidoTable {
  id: string;
  status: string;
  mesa: Mesa;
  produtos: Produto[];
}

interface Mesa {
  numero: number;
  id: string;
}

interface Produto {
  produto: Produto2;
  quantidade: number;
  status: string;
  adicionais?: Adicionais[];
}

interface Produto2 {
  nome: string;
  preco: number;
  descricao: string;
  codigo: string;
}

interface Adicionais {
  adicional: Adicional;
  quantidade: number;
  preco: number;
}

interface Adicional {
  nome: string;
  preco: number;
  codIntegra: string;
}
