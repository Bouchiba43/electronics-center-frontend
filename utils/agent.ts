import axios, { AxiosResponse } from 'axios';
import basketService from './basketService';
import { Product } from '@/models/product';
import type { Basket } from "@/models/basket";
import { Dispatch } from "redux";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api/';

const idle = () => new Promise(resolve => setTimeout(resolve, 100));
const responseBody = (response: AxiosResponse) => response.data;


axios.interceptors.response.use(
    async (response) => {
        await idle();
        return response;
    },
);


const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Store = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`),
};

const Basket = {
    get: async() => {
        try{
            return await basketService.getBasket();
        }catch(error){
            console.error("Failed to get Basket: ", error);
            throw error;
        }
    },
    addItem: async(product: Product, dispatch: Dispatch)=>{
        try{
            const result = await basketService.addItemToBasket(product, 1, dispatch);
            console.log(result);
            return result;
        }catch(error){
            console.error("Failed to add new item to basket:", error);
            throw error;
        }
    },
    removeItem: async (itemId: number, dispatch: Dispatch)=>{
        try{
            await basketService.remove(itemId, dispatch);
        }catch(error){
            console.error("Failed to remove an item from basket:", error);
            throw error;
        }
    },
    incrementItemQuantity: async (itemId: number, quantity: number = 1, dispatch: Dispatch) => {
        try {
          await basketService.incrementItemQuantity(itemId, quantity, dispatch);
        } catch (error) {
          console.error("Failed to increment item quantity in basket:", error);
          throw error;
        }
      },
      decrementItemQuantity: async (itemId: number, quantity: number = 1, dispatch: Dispatch) => {
        try {
          await basketService.decrementItemQuantity(itemId, quantity, dispatch);
        } catch (error) {
          console.error("Failed to decrement item quantity in basket:", error);
          throw error;
        }
      },
      setBasket: async (basket: Basket, dispatch: Dispatch) => {
        try {
          await basketService.setBasket(basket, dispatch);
        } catch (error) {
          console.error("Failed to set basket:", error);
          throw error;
        }
      },
      deleteBasket: async(basketId: string) =>{
        try{
          await basketService.deleteBasket(basketId);
        } catch(error){
          console.log("Failed to delete the Basket");
          throw error;
        }
      }
}

const agent = {
    Store,
    Basket,
};



export default agent;
