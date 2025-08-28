export interface CreateAddressDTO {
    userId: number;
    street: string;
    streetNumber: string;
    city: string;
    province: string;
    postalCode: string;
    floor?: string;
    apartment?: string;
  }
  
  export interface UpdateAddressDTO {
    street?: string;
    streetNumber?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    floor?: string;
    apartment?: string;
  }
  