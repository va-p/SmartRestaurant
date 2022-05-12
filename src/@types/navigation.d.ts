export type ProductNavigationProps = {
  id?: string;
}

export type OrderNavigationProps = {
  id: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      'Cadastrar Produto': ProductNavigationProps;
      order: OrderNavigationProps;
      orders: undefined;
    }
  }
}