import { AxiosResponse } from 'axios';
import React, {useState, useEffect, useMemo} from 'react'
import APIHandler from "../../api/APIHandler";
import "./Tbody.css"
import axios from 'axios';
import { GetServerSideProps } from 'next'

import {BottomNav} from "./../../types/Types"




export default function Tbody({navigation}  : any, {data} : any) {

    const [allInvoices, setAllInvoices] = useState<any[]>([]);
    // const [invoices, setInvoices] = useState<any[]>([]);

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

    const handleDelete = async (id:number) => {
        try {
          const a = await APIHandler.delete(`/invoice/${id}`);
          console.log("pass")
          console.log(a)

        //   fetchAllInvoices();
        } catch (err) {
          console.error(err);
        }
      };

    // async function delete(id: number): Promise<void> {
    //     await axios.(`http://localhost:3001/post/${id}`, {
    //       method: 'DELETE',
    //     })
    //     await Router.push('/')
    //   }

    // const screenLimit = (invoiceOnScreen? : number) => {
    //     console.log('all invoice :')
    //     allInvoices.filter( el => 
    //         el.id < invoiceOnScreen
    //         )
    //     console.log(allInvoices)
    // }

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

    return (
        <tbody id="global-tbody" className='scroller'>
            {!allInvoices.length ? (
             <tr className='tbody-row row'>
                 <td className='tbody-unit-box'><span>Loading data ..</span>   </td>              
             </tr>
             ) : (
                allInvoices.slice(navigation.page,navigation.displayedRows).map((invoice: { number: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; status: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; issue: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; due: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; outstandingAmount: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; currency: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; id: number; },index: any) => {
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
                            <td className='tbody-unit-box' > <span >Customer1</span></td> 
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