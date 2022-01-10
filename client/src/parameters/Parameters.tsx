import {Column, BottomNav, Data, Invoice} from "./../types/Types"

const columns : Column[] = [
    {
        key : "number",
        name: "Number",
        isSortable: true,
        isDescending :true,
        sortType: "Number"
    },
    {
         key : "customer",
         name: "Customer",
         isSortable: true,
         isDescending :true,
         sortType: "Letter"
    },
   {
        key : "status",
        name: "Status",
        isSortable: false
   },
   {
        key : "issue",
        name: "Issue",
        isSortable: true,
        isDescending :true,
        sortType: "Date"
   },
   {
        key : "due",
        name: "Due",
        isSortable: true,
        isDescending :true,
        sortType: "Date"
   },
   {
        key : "title",
        name: "Title",
        isSortable: true,
        isDescending :true,
        sortType: "Letter"
   },
   {
        key : "outstandingAmount",
        name: "Outstanding Amount",
        isSortable: true,
        isDescending :true,
        sortType: "Number"
    },
    {
        key : "currency",
        name: "Currency",
        isSortable: false
    },
]