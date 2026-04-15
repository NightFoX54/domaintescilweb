export type CartItemKind = "domain" | "hosting" | "ssl";

export type DomainCartConfig = {
  domain: string;
  years: number;
  action?: "register" | "transfer";
};

export type HostingCartConfig = {
  plan: "baslangic" | "standart" | "profesyonel";
  product: "linux" | "wordpress" | "joomla";
  domain?: string;
  years?: 1 | 2 | 3;
};

export type SSLCartConfig = {
  plan:
    | "Positive SSL"
    | "Positive SSL Wildcard"
    | "Instant SSL Pro"
    | "EV SSL";
  type: "DV" | "OV" | "EV";
  domain?: string;
  years?: 1 | 2 | 3;
};

export type CartItem =
  | {
      id: string;
      kind: "domain";
      title: string;
      priceDisplay?: string;
      config: DomainCartConfig;
    }
  | {
      id: string;
      kind: "hosting";
      title: string;
      priceDisplay?: string;
      config: HostingCartConfig;
    }
  | {
      id: string;
      kind: "ssl";
      title: string;
      priceDisplay?: string;
      config: SSLCartConfig;
    };

