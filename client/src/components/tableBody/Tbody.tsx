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

    const handleDelete = async (id:number) => {
        try {
          await axios.delete(`http://localhost:4001/invoice/${id}`);
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
        
        // setAllInvoices(tempInvoice);
      }, []);

    return (
        <tbody id="global-tbody" className='scroller'>
            {!allInvoices.length ? (
             <tr className='tbody-row row'>
                 <td className='tbody-unit-box'><span>Loading data ..</span>   </td>              
             </tr>
             ) : (
                allInvoices.slice(0,invoicePerPage).map((invoice,index) => {
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