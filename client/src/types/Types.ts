export type Column = {
    key: string;
    name: string;
    isSortable: boolean;
    sortType?: "Letter" | "Number" | "Date" | null;
}