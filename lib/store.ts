import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
  shippingAddress: User["address"];
}

interface EcommerceState {
  // Products
  products: Product[];
  categories: string[];

  // Cart
  cart: CartItem[];

  // User
  user: User | null;
  isAuthenticated: boolean;

  // Orders
  orders: Order[];

  // UI State
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string;

  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // User actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => void;

  // Order actions
  createOrder: (shippingAddress: User["address"]) => string;

  // Product actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;

  // Initialize data
  initializeData: () => void;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    image:
      "https://vibegaming.com.bd/wp-content/uploads/2025/01/H628BT-5-Copy.png?height=300&width=300",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    category: "Electronics",
    stock: 50,
    rating: 4.5,
    reviews: 128,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    image:
      "https://gadgetnmusic.com/wp-content/uploads/2021/09/6091632280064.jpg?height=300&width=300",
    description:
      "Advanced fitness tracking with heart rate monitor, GPS, and smartphone integration.",
    category: "Electronics",
    stock: 30,
    rating: 4.3,
    reviews: 89,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    image:
      "https://levin.com.bd/cdn/shop/files/web-1_a73407d9-bb26-40f7-ba12-ef51a60aaed9.jpg?v=1730885085&width=2048?height=300&width=300",
    description:
      "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
    category: "Clothing",
    stock: 100,
    rating: 4.7,
    reviews: 203,
  },
  {
    id: "4",
    name: "Premium Coffee Beans",
    price: 24.99,
    image:
      "https://ferbysfoods.com/wp-content/uploads/2024/01/coffe-ferbys.jpg?height=300&width=300",
    description:
      "Single-origin arabica coffee beans, freshly roasted for the perfect cup.",
    category: "Food & Beverage",
    stock: 75,
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "5",
    name: "Yoga Mat Pro",
    price: 49.99,
    image:
      "https://www.gymstick.com/media/catalog/product/cache/0618255a1bb123b22a1271e4745709b5/6/1/61022-g.jpg?height=300&width=300",
    description:
      "Non-slip yoga mat with extra cushioning for comfortable practice.",
    category: "Sports",
    stock: 40,
    rating: 4.6,
    reviews: 94,
  },
  {
    id: "6",
    name: "Wireless Phone Charger",
    price: 39.99,
    image:
      "https://m.media-amazon.com/images/I/61nQKdOLByL.jpg?height=300&width=300",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    category: "Electronics",
    stock: 60,
    rating: 4.4,
    reviews: 67,
  },
];

export const useEcommerceStore = create<EcommerceState>()(
  persist(
    (set, get) => ({
      // Initial state
      products: [],
      categories: [],
      cart: [],
      user: null,
      isAuthenticated: false,
      orders: [],
      isLoading: false,
      searchQuery: "",
      selectedCategory: "",

      // Cart actions
      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1 }],
          });
        }
      },

      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      // User actions
      login: async (email, password) => {
        set({ isLoading: true });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock authentication
        if (email && password) {
          const user: User = {
            id: "1",
            name: "John Doe",
            email: email,
            address: {
              street: "123 Main St",
              city: "New York",
              state: "NY",
              zipCode: "10001",
              country: "USA",
            },
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          orders: [],
        });
      },

      register: async (name, email, password) => {
        set({ isLoading: true });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (name && email && password) {
          const user: User = {
            id: Date.now().toString(),
            name,
            email,
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      updateProfile: (userData) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...userData },
          });
        }
      },

      // Order actions
      createOrder: (shippingAddress) => {
        const { cart, user } = get();
        if (!user || cart.length === 0) return "";

        const orderId = Date.now().toString();
        const total = cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        const order: Order = {
          id: orderId,
          userId: user.id,
          items: [...cart],
          total,
          status: "pending",
          createdAt: new Date().toISOString(),
          shippingAddress,
        };

        set({
          orders: [...get().orders, order],
          cart: [],
        });

        return orderId;
      },

      // Product actions
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
      },

      // Initialize data
      initializeData: () => {
        const categories = Array.from(
          new Set(mockProducts.map((p) => p.category))
        );
        set({
          products: mockProducts,
          categories,
        });
      },
    }),
    {
      name: "ecommerce-store",
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        orders: state.orders,
      }),
    }
  )
);
