import { AxiosResponse } from 'axios';
import React, {useState, useEffect, useMemo} from 'react'
import APIHandler from "../../api/APIHandler";
import "./Tbody.css"
import axios from 'axios';
import { GetServerSideProps } from 'next'




export default function Tbody() {

    const [allInvoices, setAllInvoices] = useState<any[]>([]);
    const [invoices, setInvoices] = useState<any[]>([]);
    let invoicePerPage = 25;
    // const memorizedData = useMemo(() => {
    //     return fetchAllInvoices(); 
    // } , [allInvoices])

    async function  fetchAllInvoices() { //on recupère les datas que l'on stocke dans memorized mais quand es ce que allData change alors?
        try {
            const resDb = await axios.get("http://localhost:4001/allInvoice")
            console.log("END resDb --------------")

            console.log(resDb.data)
            setAllInvoices(resDb.data)
            // return resDb.data;
        } catch (error) {
            console.log(error)
        }        
    }


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
        
        // setAllInvoices(tempInvoice);
      }, []);

    return (
        <tbody id="global-tbody">
            {!allInvoices.length ? (
             <tr className='tbody-row row'>
                 Loading data ..
             </tr>
             ) : (
                allInvoices.slice(0,invoicePerPage).map((invoice,index) => {
                    return (
                        <tr className='tbody-row row'>
                            <td className='tbody-unit-box' key={index}> <span key={invoice.id}>{invoice.number}</span></td>    
                            <td className='tbody-unit-box' key={index}> <span key={invoice.id}>Customer1</span></td> 
                            <td className='tbody-unit-box' key={index}> <span  key={invoice.id}className='status'>{invoice.status}</span></td>
                            <td className='tbody-unit-box' key={index}> <span key={invoice.id}>{invoice.issue}</span> </td> 
                            <td className='tbody-unit-box' key={index}> <span key={invoice.id}>{invoice.due}</span> </td> 
                            <td className='tbody-unit-box' key={index}> <span key={invoice.id}>{invoice.title}</span> </td> 
                            <td className='tbody-unit-box' key={index}> <span key={invoice.id}>{invoice.outstandingAmount}</span></td> 
                            <td className='tbody-unit-box' key={index}> <span key={invoice.id}>{invoice.currency}</span> </td>
                        </tr>
                    )
                })
             )
            }            
            </tbody>        
    )
}