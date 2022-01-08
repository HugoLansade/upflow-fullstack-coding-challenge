import React from 'react'
import {Column} from "./../../types/Types"


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
type Props = {
    columns: Column[];
    sort : (isDescending : boolean, sortedType : string, key : keyof Invoice, column : Column ) => void;
  };

export default function Thead({columns, sort} : Props) {

    return (
        <thead id="global-thead" >
            <tr className='thead-row row'>
                {columns.map((column :Column, index : number) => {
                    return (
                        <th className='thead-unit-box' key={column.key}>
                            <div className='thead-unit-box-in'>
                                <span>{column.name}</span>
                                {column.isSortable &&
                                    <button className={column.isDescending ? 'btn-sort-desc' : 'btn-sort-asc'} onClick={() => sort(column.isDescending!, column.sortType!, column.key, column)}>
                                        <img src="./img/sort.svg" alt="sort-btn" />
                                    </button>                             
                                }
                            </div> 
                        </th>
                    )
                })}
                 <th className='thead-unit-box'></th>
                 <th className='thead-unit-box'></th>
            </tr>
        </thead>
    )
}
