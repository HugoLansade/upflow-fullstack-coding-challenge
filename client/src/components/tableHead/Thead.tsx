import React from 'react'
import {Column} from "./../../types/Types"

interface propsHeader {
    columns : Column[];
}

export default function Thead({columns} : any) {

    return (
        <thead id="global-thead" >
            <tr className='thead-row row'>
                {columns.map((column :Column, index : number) => {
                    return (
                        <th className='thead-unit-box'>
                            <div className='thead-unit-box-in'>
                                <span>{column.name}</span>
                                {column.isSortable &&
                                    <button className='btn-sort'>
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
