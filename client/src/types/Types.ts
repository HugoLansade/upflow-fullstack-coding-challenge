export type Column = {
    key: keyof Invoice;
    name: string;
    isSortable: boolean;
    isDescending?: boolean; 
    sortType?: "Letter" | "Number" | "Date" | null;
}

export type Invoice = {
    number : number
    customer : string
    status : "Overdue" | "Paid" | "Unpaid" | "In dispute" | "Unsent" | "Voided" | "Written off"
    issue : Date
    due : Date
    title : string
    outstandingAmount : number
    currency : "USD" | "GBP" | "UR"
    id : number
}

export type BottomNav = {
    page: number;
    displayedRows : number; //default 25
    totalRows: number;
    isNext : boolean;
    isPrevious : boolean;
    nextPage: () => void;
    previousPage: () => void;
}

export type headProps = {
    columns: Column[];
    sort : (isDescending : boolean, sortedType : string, key : keyof Invoice, column : Column ) => void;
  };

export type bodyProps = {
    data: any[];
    navigation : any;
  };

  export type Data = {
    key? :string
    id: number;        
    number: number; 
    status : string;
    issue : Date;
    due : Date;
    title : string;
    outstandingAmount : number;
    currency : string;
}