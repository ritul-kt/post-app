
export interface Detail {
    name: string;
    id: string;
  }
  
  export interface Info {
    name: string;
    id: string;
    detail: Detail[];
  }
  
  export interface Option {
    name: string;
    id: number;
    info: Info[];
  }
  