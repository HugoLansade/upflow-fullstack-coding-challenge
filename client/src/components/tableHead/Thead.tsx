import React from 'react'
import {Column, Invoice, headProps} from "./../../types/Types"

export default function Thead({columns, sort} : headProps) {

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
