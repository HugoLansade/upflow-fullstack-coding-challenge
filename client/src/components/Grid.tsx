import React, { useState, useEffect, HtmlHTMLAttributes } from 'react'
import axios from 'axios'

import Thead from "./tableHead/Thead"
import Tbody from "./tableBody/Tbody"
import BottomNavBar from "./tableBottomNavBar/BottomNavBar"
import { stringify } from 'querystring'
import {Column} from "./../types/Types"


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
                    <Tbody/>      
                </table>       
                <BottomNavBar/>

            </div>
        </div>
    )
}
