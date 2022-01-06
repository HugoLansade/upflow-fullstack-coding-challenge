import React, { useState, useEffect, HtmlHTMLAttributes } from 'react'
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
    issue : string
    due : string
    title : string
    outstandingAmount : number
    currency : "USD" | "GBP" | "UR"
    id : string
}




export default function Grid() {
    const [allInvoices, setAllInvoices] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isPrevious, setisPrevious] = useState<boolean>(false);
    const [isNext, setisNext] = useState<boolean>(true);


    async function  fetchAllInvoices() { //on recupère les datas que l'on stocke dans memorized mais quand es ce que allData change alors?
        try {
            const resDb = await APIHandler.get("/allInvoice")
            console.log("END resDb --------------")

            console.log(resDb.data)
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
        totalRows: 56, //allInvoices.length ? allInvoices.length : 200
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
                sortType: "Number"
            },
            {
                 key : "customer",
                 name: "Customer",
                 isSortable: true,
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
                sortType: "Date"
           },
           {
                key : "due",
                name: "Due",
                isSortable: true,
                sortType: "Date"
           },
           {
                key : "title",
                name: "Title",
                isSortable: true,
                sortType: "Letter"
           },
           {
                key : "outstandingAmount",
                name: "Outstanding Amount",
                isSortable: true,
                sortType: "Number"
            },
            {
                key : "currency",
                name: "Currency",
                isSortable: false
            },
    ]

    
    

    return (
        <div id="global-container">
            <div className="global-grid">
                <table className="general-table" > 
                    <Thead columns={columns}/>
                    <Tbody navigation={tableNavigation} data={allInvoices}/>      
                </table>       
                <BottomNavBar navigation={tableNavigation}/>

            </div>
        </div>
    )
}
