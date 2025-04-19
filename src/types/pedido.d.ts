export interface Pedido {
  id: string;
  status: string;
  pdvCodPedido: string;
  mesa: Mesa;
  produtos: Produto[];
}

export interface Mesa {
  numero: number;
  id: string;
}

export interface Produtos {
  produto: Produto2;
  obs: string;
  adicionais: Adicionais[];
  quantidade: number;
  status: string;
}

export interface Produto {
  nome: string;
  preco: number;
  descricao: string;
  codigo: string;
}

export interface Adicionais {
  adicional: Adicional;
  quantidade: number;
  preco: number;
}

export interface Adicional {
  nome: string;
  preco: number;
  codIntegra: string;
}
