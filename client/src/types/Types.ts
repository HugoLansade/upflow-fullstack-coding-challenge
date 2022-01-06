export type Column = {
    key: string;
    name: string;
    isSortable: boolean;
    sortType?: "Letter" | "Number" | "Date" | null;
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