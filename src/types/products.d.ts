export interface Category {
  id: string;
  status: boolean;
  nome: string;
  ativo: boolean;
  imagem: string;
  cor: string;
  ordem: number;
  temPromocao: boolean;
  externoId: string;
  restaurantCnpj: string;
  delete: boolean;
  createAt: string;
  updateAt: string;
  impressoraId: string;
  produtos: Product[];
  adicionais: Adicionai[];
  Impressora: Impressora;
}

export interface Product {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  preco: number;
  categoriaId: string;
  externoId: string;
  codigo: string;
  restaurantCnpj: string;
  delete: boolean;
  createAt: string;
  updateAt: string;
  categoria: {id: string};
  ativo: boolean;
}

export interface Adicionai {
  id: string;
  titulo: string;
  ativo: boolean;
  qtdMinima: number;
  qtdMaxima: number;
  obrigatorio: boolean;
  createAt: string;
  updateAt: string;
  categoriaId: string;
  opcoes: Opc[];
}

export interface Opc {
  id: string;
  nome: string;
  ativo: boolean;
  preco: number;
  codIntegra: string;
  createAt: string;
  updateAt: string;
  adicionalHeaderId: string;
}

export interface Impressora {
  id: string;
  nome: string;
  ip: string;
  porta: number;
  delete: boolean;
  createAt: string;
  updateAt: string;
  restaurantCnpj: string;
}
