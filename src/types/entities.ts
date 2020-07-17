export interface ProductData {
  _id: any;
  title: string;
  description: string;
  isNewRelease?: boolean;
  keywords?: string;
  brand: {
    id: number;
    name: string;
    initials: string;
  };
  priceFrom: Number;
  priceTo: Number;
  photoStill: String;
}
