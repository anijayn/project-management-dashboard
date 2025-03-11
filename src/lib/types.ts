export interface Property {
  id: string;
  name: string;
  assetType: string;
  model: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface AssetEnum {
  [key: string]: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name?: string;
}