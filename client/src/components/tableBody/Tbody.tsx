import { AxiosResponse } from 'axios';
import React, {useState, useEffect, useMemo} from 'react'
import APIHandler from "../../api/APIHandler";
import "./Tbody.css"
import axios from 'axios';
import { GetServerSideProps } from 'next'

import {BottomNav, Invoice, Column, bodyProps} from "./../../types/Types"

export default function Tbody({
    data,
    navigation,
  }: bodyProps ) {

    // const [countDelete, setcountDelete] = useState<number>(0)

    const handleDelete = async (id:number) => {
        try {
        await APIHandler.delete(`/invoice/${id}`);
        //   fetchAllInvoices();
        } catch (err) {
          console.error(err);
        }
        // setcountDelete(countDelete + 1)
      };
     

     

    return (
        <tbody id="global-tbody" className='scroller'>
            {!data.length ? (              
             <tr className='tbody-row row'>
                 <td className='tbody-unit-box'><span>Loading data ..</span>   </td>              
             </tr>
             ) : (
                data.map((invoice: any, index :number) => {                   
                    return (
                        <tr className='tbody-row row' key={invoice.id}>
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