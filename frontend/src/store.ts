import { create } from 'zustand';

interface User {
  email: string;
  name : string;
  // Add other properties as needed
}

// Define the product type
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
};

interface CommerceStore {
  token: User | null;
  setToken: (user: User | null) => void;
  cart: Record<string, number>;
  addOneToCart: (productId: string) => void;
  removeOneFromCart: (productId: string) => void;
  name: string;
  setNames: (name: string) => void;

  products: Product[];
  setProducts: (products: Product[]) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minPrice: number;
  setMinPrice: (minPrice: number) => void;
  maxPrice: number;
  setMaxPrice: (maxPrice: number) => void;
  filteredProducts: any[];
  searchTerm: string; 
  setSearchTerm: (searchTerm: string) => void; 
}

export const useCommerceStore = create<CommerceStore>((set) => ({
  token: null,
  setToken: (user) => set((state) => ({ token: user })),
  name: '',
  setNames: (name) => set((state) => ({ name: name })),

  products: [],
  setProducts: (products) => set({ products }),
  selectedCategory: 'All',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  minPrice: 0,
  setMinPrice: (minPrice) => set({ minPrice }),
  maxPrice: 0,
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  filteredProducts: [],
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),

  cart: {},
  addOneToCart: (productId) =>
    set((state) => {
      // @ts-ignore
      let newCount = (state.cart[productId] || 0) + 1;
      return {
        cart: { ...state.cart, [productId]: newCount },
      };
    }),
  removeOneFromCart: (productId) =>
    set((state) => {
      // @ts-ignore
      let newCount = (state.cart[productId] || 0) - 1;
      // TODO prevent going negative
      return {
        cart: { ...state.cart, [productId]: newCount },
      };
    }),

    

}));


// import { create } from 'zustand'

// interface CommerceStore {
//     token: string,
//     setToken: (token: string) => void
//     cart: {},
//     addOneToCart: (productId: string) => void,
//     removeOneFromCart: (productId: string) => void,
//     name : string,
//     setNames: (name: string) => void 


// }

// export const useCommerceStore = create<CommerceStore>((set) => ({
//     token: '',
//     setToken: (token) => set((state) => ({ token: token })),
//     name :'',
//     setNames: (name)=> set((state)=> ({name : name})),

//     cart: {},
//     addOneToCart: (productId) => set((state) => {
//         // @ts-ignore
//         let newCount = (state.cart[productId] || 0) + 1
//         return {
//             cart: { ...state.cart, [productId]: newCount }
//         }
//     }),
//     removeOneFromCart: (productId) => set((state) => {
//         // @ts-ignore
//         let newCount = (state.cart[productId] || 0) - 1
//         // TODO prevent going negative
//         return {
//             cart: { ...state.cart, [productId]: newCount }
//         }
//     }),
// }))