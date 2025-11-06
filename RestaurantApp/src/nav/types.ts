import type { MenuItem } from '../types';

export type RootStackParamList = {
  MainTabs: undefined;
  Details: { item: MenuItem };
  Tickets: { itemId: string; qty: number };
};

export type MainTabParamList = {
  Browse: undefined;
  Favourites: undefined;
  Info: undefined;
};
