export type Column = {
    key: keyof Invoice;
    name: string;
    isSortable: boolean;
    isDescending?: boolean; 
    sortType?: "Letter" | "Number" | "Date" | null;
}

interface Invoice {
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