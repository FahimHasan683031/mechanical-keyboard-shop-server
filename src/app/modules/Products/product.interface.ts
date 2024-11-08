// Type definition for a Product object with necessary attributes
export type TProduct = {
  image: string;              
  title: string;              
  brand: string;              
  price: number;              
  rating: number;             
  description: string;       
  category: string;           
  availableQuantity: number;  
};

// Type definition for query parameters used in product search/filtering
export type QueryParams = {
  name?: string;  
  brand?: string;  
};


