import { AxiosResponse } from 'axios';
import React, {useState, useEffect, useMemo} from 'react'
import APIHandler from "../../api/APIHandler";
import "./Tbody.css"
import axios from 'axios';
import { GetServerSideProps } from 'next'

import {BottomNav} from "./../../types/Types"


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

type Props = {
    data: any[];
    navigation : any;
  };

export default function Tbody({
    data,
    navigation,
  }: Props ) {

    const handleDelete = async (id:number) => {
        try {
        await APIHandler.delete(`/invoice/${id}`);
        //   fetchAllInvoices();
        } catch (err) {
          console.error(err);
        }
      };


    return (
        <tbody id="global-tbody" className='scroller'>
            {!data.length ? (
             <tr className='tbody-row row'>
                 <td className='tbody-unit-box'><span>Loading data ..</span>   </td>              
             </tr>
             ) : (
                data.map((invoice: any, index :number) => {
                // data.slice(0,25).map((invoice: { number: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; status: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; issue: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; due: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; outstandingAmount: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; currency: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; id: number; },index: any) => {
                   
                    return (
                        // <tr className='tbody-row row'>
                        //     <td className='tbody-unit-box' key={index}> <span key={invoice.id}>{invoice.number}</span></td>    
                        //     <td className='tbody-unit-box' key={index}> <span key={invoice.id}>Customer1</span></td> 
                        //     <td className='tbody-unit-box' key={index}> <span  key={invoice.id}className='status'>{invoice.status}</span></td>
                        //     <td className='tbody-unit-box' key={index}> <span key={invoice.id}>{invoice.issue}</span> </td> 
                        //     <td className='tbody-unit-box' key={index}> <span key={invoice.id}>{invoice.due}</span> </td> 
                        //     <td className='tbody-unit-box' key={index}> <span key={invoice.id}>{invoice.title}</span> </td> 
                        //     <td className='tbody-unit-box' key={index}> <span key={invoice.id}>{invoice.outstandingAmount}</span></td> 
                        //     <td className='tbody-unit-box' key={index}> <span key={invoice.id}>{invoice.currency}</span> </td>
                        //     <td className='tbody-unit-box' key={index}> <img className='btn-action' src="./img/edit-btn.svg" alt="edit-btn" /></td>
                        //     <td className='tbody-unit-box' key={index}> <img className='btn-action' onClick={() => handleDelete(invoice.id)} src="./img/delete-btn.svg" alt="delete-btn" /></td>                            
                        // </tr>
                        <tr className='tbody-row row'>
                            <td className='tbody-unit-box' > <span >{invoice.number}</span></td>    
                            <td className='tbody-unit-box' > <span >{invoice.customer}</span></td> 
                            <td className='tbody-unit-box' > <span  className='status'>{invoice.status}</span></td>
                            <td className='tbody-unit-box' > <span >{invoice.issue}</span> </td> 
                            <td className='tbody-unit-box' > <span >{invoice.due}</span> </td> 
                            <td className='tbody-unit-box' > <span >{invoice.title}</span> </td> 
                            <td className='tbody-unit-box' > <span >{invoice.outstandingAmount}</span></td> 
                            <td className='tbody-unit-box' > <span >{invoice.currency}</span> </td>
                            <td className='tbody-unit-box' > <img className='btn-action' src="./img/edit-btn.svg" alt="edit-btn" /></td>
                            <td className='tbody-unit-box' > <img className='btn-action' onClick={() => handleDelete(invoice.id)} src="./img/delete-btn.svg" alt="delete-btn" /></td>                            
                        </tr>
                    )
                })
             )
            }            
            </tbody>        
    )
}