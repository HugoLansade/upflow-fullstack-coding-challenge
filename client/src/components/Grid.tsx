import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

import APIHandler from "../api/APIHandler";
import Thead from "./tableHead/Thead"
import Tbody from "./tableBody/Tbody"
import BottomNavBar from "./tableBottomNavBar/BottomNavBar"
import {Column, BottomNav} from "./../types/Types"


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

export interface Data {
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


    async function  fetchAllInvoices() { //on recupère les datas que l'on stocke dans memorized mais quand es ce que allData change alors?
        try {
            const resDb = await APIHandler.get("/allInvoice")
            console.log("END resDb --------------")
            randomName(true)
//             let start = new Date(2018, 0, 1); let end= new Date();
//             const date1 =new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString()
//   console.log(date1)

            console.log(resDb.data)
            setAllInvoices(resDb.data)
            // return resDb.data;
        } catch (error) {
            console.log(error)
        }        
    }


    function randomDate(start:Date, end:Date) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
      }
      function randomCustomer(){
        const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        return alphabet[Math.floor(Math.random() * alphabet.length)];
      }
      function randomName(iscustomer: boolean){
        const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        console.log("random name")
        console.log(alphabet[Math.floor(Math.random() * alphabet.length)] + iscustomer ? "customer" : "title")

        return alphabet[Math.floor(Math.random() * alphabet.length)] + iscustomer ? "customer" : "title";
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
      }, [allInvoices, page])


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
    
    function sort(isDescending : boolean, sortedType : string, key : keyof Invoice ) {
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
                  console.log("result", result)
                  return result;
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
                  console.log("result", result)
                  return result;
            }
            
        } else if (sortedType === 'Number') {
            console.log("Sort numbers")
            setAllInvoices(allInvoices.sort((a,b) => a.number - b.number));  
        }  else if (sortedType === 'Date') {
            console.log("Sort dates")
        } else {
            alert('Typo in sort');
        }
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

    function getFamilyName(name :any) {
        console.log("Name", name)
        let result = name.split(' ').slice(0)
        console.log("Result", result)

        return result
      }

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