export interface Offer {
  allegroLocally: {
    location: {
      label: string;
    };
  };
  id: string;
  images: {
    alt: string,
    url: string;
  }[];
  name: string;
  publication: {
    endingAt: string;
    startingAt: string;
  };
  seller: {
    id: string;
  };
  sellingMode: {
    buyNow?: {
      active: boolean;
      price: {
        sale: {
          amount: string;
          currency: string;
        };
      };
    };
    advertisment?: {
      active: boolean;
      price: {
        amount: string;
        currency: string;
      }
    };
    cart: {
      active: boolean;
    };
  };
  shipping: {
    priceWithDeliveryLabel: String;
  };
  view: {
    type: String;
    url: String;
  }
}