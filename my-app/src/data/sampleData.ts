// Sample Store data
export interface Store {
    id: number;
    name: string;
    city: string;
    state: string;
  }
  
  export const initialStores: Store[] = [
    { id: 1, name: 'Atlanta Outfitters', city: 'Atlanta', state: 'GA' },
    { id: 2, name: 'Chicago Charm Boutique', city: 'Chicago', state: 'IL' },
    { id: 3, name: 'Houston Harvest Market', city: 'Houston', state: 'TX' },
    { id: 4, name: 'Seattle Skyline Goods', city: 'Seattle', state: 'WA' },
    { id: 5, name: 'Miami Breeze Apparel', city: 'Miami', state: 'FL' },
    { id: 6, name: 'Denver Peaks Outdoor', city: 'Denver', state: 'CO' },
    { id: 7, name: 'Boston Harbor Books', city: 'Boston', state: 'MA' },
    { id: 8, name: 'Los Angeles Luxe', city: 'Los Angeles', state: 'CA' },
    { id: 9, name: 'Phoenix Sunwear', city: 'Phoenix', state: 'AZ' },
    { id: 10, name: 'Nashville Melody Music Store', city: 'Nashville', state: 'TN' },
    { id: 11, name: 'New York Empire Eats', city: 'New York', state: 'NY' },
    { id: 12, name: 'Dallas Ranch Supply', city: 'Dallas', state: 'TX' },
    { id: 13, name: 'San Francisco Bay Trends', city: 'San Francisco', state: 'CA' },
  ];
  
  // Sample SKU data
  export interface SKU {
    id: number;
    name: string;
    price: number;
    cost: number;
  }
  
  export const initialSKUs: SKU[] = [
    { id: 1, name: 'Cotton Polo Shirt', price: 139.99, cost: 10.78 },
    { id: 2, name: 'Tassel Fringe Handbag', price: 134.99, cost: 20.79 },
    { id: 3, name: 'Minimalist Leather Watch', price: 49.99, cost: 49.89 },
    { id: 4, name: 'Foldable Travel Hat', price: 194.99, cost: 56.16 },
    { id: 5, name: 'Striped Cotton Socks', price: 9.99, cost: 6.91 },
    { id: 6, name: 'Sherpa Lined Hooded Coat', price: 174.99, cost: 128.09 },
    { id: 7, name: 'Fleece-Lined Parka', price: 59.99, cost: 17.40 },
    { id: 8, name: 'Perforated Leather Belt', price: 44.99, cost: 4.50 },
    { id: 9, name: 'Yoga Leggings', price: 164.99, cost: 172.58 },
    { id: 10, name: 'Graphic Print T-Shirt', price: 109.99, cost: 53.35 },
    { id: 11, name: 'Luxury Silk Tie', price: 54.99, cost: 20.95 },
    { id: 12, name: 'Silk Embroidered Kimono', price: 74.99, cost: 12.30 },
  ];
  
  // Planning data interface
  // We'll store salesUnits keyed by storeId, skuId, and week.
  export interface PlanningData {
    [key: string]: number; // key format: `${storeId}_${skuId}_W01`, value is sales units
  }
  
  // We start with everything at 0
  export const initialPlanningData: PlanningData = {};
  