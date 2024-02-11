import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { JwtPayload } from 'jsonwebtoken';

interface CommerceStore {
    token: string,
    setToken: (token: string) => void

    cart: {},
    emptyCart: () => void,
    addOneToCart: (productId: string) => void,
    subtractOneFromCart: (productId: string) => void,
    favoritesToggled: Boolean,
    toggleFavoritesFilter: () => void,
    searchFilter: string,
    setSearchFilter: (searchString: string) => void,
    categoryFilter: string,
    setCategoryFilter: (category: string) => void,
    userName: string,
    setUserName: (userName: string) => void,
    userEmail: string,
    setUserEmail: (userEmail: string) => void,
    userPassword: string,
    setUserPassword: (userPassword: string) => void,
    userConfirmPassword: string,
    setUserConfirmPassword: (userConfirmPassword: string) => void,

    showCart: boolean,
    setShowCart: (value: boolean) => void,

    decodedToken: JwtPayload | null;
    setDecodedToken: (decodedToken: JwtPayload | null) => void;

    forHiding: boolean,
    setForHiding: (value: boolean) => void,
}

export const useCommerceStore = create<CommerceStore>(
    // @ts-ignore
    persist(
        (set, get) => ({

            decodedToken: null,
            setDecodedToken: (decodedToken) => set({ decodedToken }),

            token: '',
            setToken: (token) => set((state) => ({ token: token })),

            forHiding: true,
            setForHiding: (value: boolean) => set((state) => {
                return {
                    forHiding: value,

                }
            }),

            cart: {},
            emptyCart: () => set((state) => { return { cart: {} } }),
            addOneToCart: (productId) => set((state) => {
                if (!productId || "undefined" === productId) {
                    return state.cart;
                }
                // @ts-ignore
                let newCount = (state.cart[productId] || 0) + 1
                return {
                    cart: { ...state.cart, [productId]: newCount }
                }
            }),
            subtractOneFromCart: (productId) => set((state) => {
                if (!productId || "undefined" === productId) {
                    return state.cart;
                }
                // @ts-ignore
                let newCount = (state.cart[productId] || 0) - 1
                // TODO prevent going negative
                return {
                    cart: { ...state.cart, [productId]: newCount > 0 ? newCount : 0 }
                }
            }),
            // favorites
            favoritesToggled: false,
            toggleFavoritesFilter: () => set((state) => {
                return {
                    favoritesToggled: !state.favoritesToggled
                }
            }),

            // search state
            searchFilter: '',
            setSearchFilter: (searchString) => set((state) => {
                return {
                    searchFilter: searchString
                }
            }),

            // category filter
            categoryFilter: '',
            setCategoryFilter: (category) => set((state) => {
                return {
                    categoryFilter: category
                }
            }),

            userName: '',
            setUserName: (userName) => set((state) => {
                return {
                    userName: userName
                }
            }),
            userEmail: '',
            setUserEmail: (userEmail) => set((state) => ({ userEmail: userEmail })),
            userPassword: '',
            setUserPassword: (userPassword) => set((state) => ({ userPassword: userPassword })),
            userConfirmPassword: '',
            setUserConfirmPassword: (userConfirmPassword) => set((state) => ({ userConfirmPassword: userConfirmPassword })),
            showCart: false,
            setShowCart: (value: boolean) => set((state) => {
                return {
                    showCart: value,
                    // cart:{}
                }
            }),
        }),
        {
            name: 'mern-ecom-app', // name of the item in the storage (must be unique)
        },
    ),
)