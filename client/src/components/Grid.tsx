import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

import APIHandler from "../api/APIHandler";
import Thead from "./tableHead/Thead"
import Tbody from "./tableBody/Tbody"
import BottomNavBar from "./tableBottomNavBar/BottomNavBar"
import {Column, BottomNav, Data, Invoice} from "./../types/Types"

import { resizeGrid } from '../ResizableGrid/ResizeGrid';

let columns : Column[] = [
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

export default function Grid() {
    const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
    const [invoiceOnPage, setinvoiceOnPage] = useState<Invoice[]>([]);

    const [page, setPage] = useState<number>(1);
    const [isPrevious, setisPrevious] = useState<boolean>(false);
    const [isNext, setisNext] = useState<boolean>(true);

    const [isSorted, setisSorted] = useState<boolean>(false);


    resizeGrid()

    async function  fetchAllInvoices() { //on recupère les datas que l'on stocke dans memorized mais quand es ce que allData change alors?
        try {
            const resDb = await APIHandler.get("/allInvoice")
            // console.log("END resDb --------------")

            // console.log(resDb.data)
            setAllInvoices(resDb.data)
            // return resDb.data;
        } catch (error) {
            console.log(error)
        }        
    }

    useEffect( () => {
        fetchAllInvoices()
      }, []);

    function nextPage(){
        if(tableNavigation.isNext){
            setPage(tableNavigation.page + tableNavigation.displayedRows);
            setisPrevious(true); //now there is a page before
            if(Math.ceil(tableNavigation.page / tableNavigation.displayedRows) +1  === Math.ceil(tableNavigation.totalRows / tableNavigation.displayedRows)){

                setisNext(false);
                tableNavigation.displayedRows = tableNavigation.totalRows;
            }        
        } else {
            console.log("No next page")
        }
    }

    function previousPage(){        
        if(tableNavigation.isPrevious){
            setPage(tableNavigation.page - tableNavigation.displayedRows);
            setisNext(true); //now there is a page after
            if(Math.floor(tableNavigation.page / tableNavigation.displayedRows) === 1){
                setisPrevious(false);
            }        
        } else {
            console.log("No previous page")
        }
    }

   

    const tableNavigation : BottomNav = {
        page: page, //variable
        displayedRows : 25, //variable
        totalRows: allInvoices.length, 
        isNext : isNext,
        isPrevious : isPrevious,
        nextPage: () => nextPage(),
        previousPage: () => previousPage(),
    }

    

      useEffect(() => {
        setinvoiceOnPage(allInvoices.slice(page -1, page + tableNavigation.displayedRows))
      }, [allInvoices,page,isSorted])


    function sort(isDescending : boolean, sortedType : string, key : keyof Invoice, column : Column ) {
        if(sortedType === 'Letter'){
            if(isDescending) {
                let result = allInvoices.sort(function (_a, _b) {

                    const a = getFamilyName(_a[key]);
                    const b = getFamilyName(_b[key]);
                    if ( a <= b ) {
                      return 1;
                    } else if ( a > b) {
                      return -1;
                    }
                    return 0; // to prevent typescript issues
                  });
                  setAllInvoices(result);
            } else {
                let result = allInvoices.sort(function (_a, _b) {
                    const a = getFamilyName(_a[key]);
                    const b = getFamilyName(_b[key]);
                    if ( a >= b ) {
                        return 1;
                    } else if ( a < b) {
                        return -1;
                    }
                    return 0; // to prevent typescript issues
                  });
                  setAllInvoices(result) ;
            }
            
        } else if (sortedType === 'Number') {
            if(isDescending) {
                let result = allInvoices.sort((a :any, b:any) =>a[key] - b[key]);
                      setAllInvoices(result) ;
            } else {
                let result = allInvoices.sort((a :any, b:any) =>b[key] - a[key]);
                      setAllInvoices(result) ;
            }
        }  else if (sortedType === 'Date') {
            // let year = 2;
            // let month = 1;
            // let day = 0;
            // let date = allInvoices.
            //     date.sort((a,b) => a.split("/")[year] - b.split("/")[year])
            //     .sort((a,b) => {
            //     if(a.split("/")[year]=== b.split("/")[year]){
            //         return a.split("/")[month] - b.split("/")[month]
            //     }
            //     })
            //     .sort((a,b) => {
            //     if(a.split("/")[month]=== b.split("/")[month]){
            //         return a.split("/")[day] - b.split("/")[day]
            //     } 
            //     })
        } else {
            alert('Typo in sort');
        }
        resetHeadersSort(column.key);
        column.isDescending = !column.isDescending;
        setisSorted(!isSorted);
    }

    function getFamilyName(name :any) {
        return name.split(' ').slice(0)
      }

      function resetHeadersSort(key: string) {
          columns.map(el => 
            {
                if(el.isSortable && el.key !== key) 
                return el.isDescending = true;
            }
            )
      }

      /****************RESIZABLE TABLE GRID***************** */




    return (
        <div id="global-container">
            <div className="global-grid">
                <table className="general-table" > 
                    <Thead columns={columns} sort={sort} />
                    <Tbody navigation={tableNavigation} data={invoiceOnPage}/> 
                </table>       
                <BottomNavBar navigation={tableNavigation}/>

            </div>
        </div>
    )
}
