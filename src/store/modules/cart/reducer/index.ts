/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-param-reassign */
import produce from 'immer';

export interface Product {
  id: number;
  nome: string;
  preco: number;
  amount: number;
  image: string;
  priceFormatted: string;
}

export interface Cart {
  cart: Product[];
}

export interface Action {
  type: string;
  payload: Product
}

export default function cart(state = [] as Product[], action: Action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return produce(state, (draft: Product[]) => {
        const prodIndex = draft.findIndex((p: Product) => action.payload.id === p.id);

        if (prodIndex >= 0) {
          draft[prodIndex].amount += 1;
        } else {
          draft.push({
            ...action.payload,
            amount: 1,
          });
        }
      });
      case 'REDUCE_TO_CART':
        return produce(state, (draft: Product[]) => {
          const prodIndex = draft.findIndex((p: Product) => action.payload.id === p.id);
  
          if (prodIndex >= 0) {
            draft[prodIndex].amount -= 1;
          } else {
            draft.push({
              ...action.payload,
              amount: -1,
            });
          }
        });
        case 'REMOVE_TO_CART':
          return produce(state, (draft: Product[]) => {
            const prodIndex = draft.findIndex((p: Product) => action.payload.id === p.id);
            
            if(prodIndex > -1){
              console.log(prodIndex)
              draft.splice(prodIndex, 1);
            }
            
          });
        case 'CLEAR_TO_CART':
          return produce(state, (draft: Product[]) => {
           
            draft.map((p) => (
              draft.shift()
            ));
          
        });
    default:
      return state;
  }
}
