import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

import APIHandler from "../api/APIHandler";
import Thead from "./tableHead/Thead"
import Tbody from "./tableBody/Tbody"
import BottomNavBar from "./tableBottomNavBar/BottomNavBar"
import {Column, BottomNav, Data, Invoice} from "./../types/Types"


// export type Action =
// { type: 'SORT'; 
//       isDescending?: boolean; 
//       sortedType : string; // sort by number or alphabeticaly
//       idColumn : number};

//   export type State = {

//     dataOnPage : boolean;

//   };


export default function Grid() {
    const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);

    const [invoiceOnPage, setinvoiceOnPage] = useState<Invoice[]>([]);

    const [page, setPage] = useState<number>(1);
    const [isPrevious, setisPrevious] = useState<boolean>(false);
    const [isNext, setisNext] = useState<boolean>(true);

    const [isSorted, setisSorted] = useState<boolean>(false);



    async function  fetchAllInvoices() { //on recupère les datas que l'on stocke dans memorized mais quand es ce que allData change alors?
        try {
            // const resDb = await APIHandler.get("/allInvoice")
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
        .then(() => {
            console.log("now")
            // screenLimit();
        }).catch((err) => {
            console.log(err)
        });
        console.log("on mount --------------")  
        
      }, []);

    function nextPage(){
        if(tableNavigation.isNext){
            setPage(tableNavigation.page + tableNavigation.displayedRows);
            setisPrevious(true); //now there is a page before
            console.log("Next page")
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
            console.log("Previous page")
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

      useEffect(() => {

        setinvoiceOnPage(allInvoices.slice(page -1, page + tableNavigation.displayedRows))
      }, [allInvoices,page,isSorted])


    //   const reducer = () =>
    //   (state: State, action: Action) : Data[] => {
    //     switch (action.type) {
    //       case 'SORT':
    //         return allInvoices.sort((a,b) => a.number - b.number);

    //         //   // We have 2 sort types : Ascending/descending for numbers or alphabeticaly.
    //         //   // We should know what is the intention of the user first
    //         //   if(action.sortedType === 'Letter'){
    //         //       console.log("Sort letters")
    //         //   } else if (action.sortedType === 'Number') {
    //         //       console.log("Sort nulbers")
      
    //         //       //For now we will sort specific values associated to data we ve been seeding 
    //         //       //Later we should sort only a column and then display the all tbody according to this column so that all data are aline
    //         //      return allInvoices.sort((a,b) => a.number - b.number);
    //         //   }  else if (action.sortedType === 'Date') {
    //         //       console.log("Sort dates")
      
    //         //   } else {
    //         //       alert('Typo in sort');
    //         //   }
      
      
    //           break;
      
    //       default :
    //           alert('Bug in switch reducer');
      
    //       }
    //   }
    //   const [state, dispatch] = useReducer(reducer, {
    //     dataOnPage : allInvoices,
    // })
    //   const initialState = {
    //     dataOnPageX: allInvoices,
    
    // }
    // (isDescending : boolean, sortedType : string, idColumn :string) => dispatch({type : 'SORT',isDescending : column.isDescending , sortedType : column.sortType, idColumn : column.key })
    
    function sort(isDescending : boolean, sortedType : string, key : keyof Invoice, column : Column ) {
        if(sortedType === 'Letter'){
            console.log("Sort letters")
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
            console.log("Sort numbers")
            // let sorted =allInvoices.sort((a,b) => a.number - b.number)
            if(isDescending) {
                let result = allInvoices.sort((a :any, b:any) =>a[key] - b[key]);
                      setAllInvoices(result) ;
            } else {
                let result = allInvoices.sort((a :any, b:any) =>b[key] - a[key]);
                      setAllInvoices(result) ;
            }
        }  else if (sortedType === 'Date') {
            console.log("Sort dates")
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
        console.log('change the sort order')
        console.log(column.isDescending)

        column.isDescending = !column.isDescending;
        console.log(column.isDescending)
        setisSorted(true);
    }

    function getFamilyName(name :any) {
        return name.split(' ').slice(0)
      }

    // const FamilyNameSorter = {
    //     desc: (data : any[], key : string) => {
    //         let result = data.sort(function (_a, _b) {
    //           const a = getFamilyName(_a.key);
    //           const b = getFamilyName(_b.key);
    //           if ( a <= b ) {
    //             return 1;
    //           } else if ( a > b) {
    //             return -1;
    //           }
    //           return 0; // to prevent typescript issues
    //         });
    //         console.log("result", result)
    //         return result;
    //       },
         
    //     asc: (data : Invoice[], key : keyof Invoice) => {
    //     return data.sort(function (_a, _b) {
    //         const a = getFamilyName(_a[key]);
    //         console.log(typeof(a))
    //         const b = getFamilyName(_b[key]);
    //         if ( a >= b ) {
    //         return 1;
    //         } else if ( a < b) {
    //         return -1;
    //         }
    //         console.log("result2")

    //         return 0; // to prevent typescript issues
    //     })
    //     }
    //     };
    //     let data = [
    //         { id: 3, name: 'Satoshi Yamamoto', class: 'B' },
    //         { id: 1, name: 'Taro Tanak', class: 'A' },
    //         { id: 2, name: 'Ken Asada', class: 'A' },
    //         { id: 4, name: 'Masaru Tokunaga', class: 'C' },
    //         { id: 2, name: 'Aen Asada', class: 'F' },
    //         { id: 2, name: 'Ben Asada', class: 'E' },
    //         { id: 2, name: 'Ken Asada', class: 'D' }

    //       ]
        //   console.log("FamilyNameSorter.asc(data,)");
        
        // console.log(FamilyNameSorter.asc(data,"name"));


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
    // dispatch : (
    //     {
    //         type: 'SORT'; 
    //         isDescending?: boolean; 
    //         sortedType : string; // sort by number or alphabeticaly
    //         idColumn : string
    //     });