export type ProductNavigationProps = {
  id?: string;
}

export type OrderNavigationProps = {
  id: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      'Home Admin': undefined;
      'Home Waiter': undefined;
      'Home Cashier': undefined;
      Cardápio: undefined;
      'Cadastrar Produto': ProductNavigationProps;
      'Novo Pedido': OrderNavigationProps;
      Pedidos: undefined;
    }
  }
}