export type ProductNavigationProps = {
  id?: string;
}

export type OrderNavigationProps = {
  id: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Cardápio: undefined;
      'Cadastrar Produto': undefined;
      order: OrderNavigationProps;
      orders: undefined;
      'Home Admin': undefined;
      'Home Waiter': undefined;
    }
  }
}