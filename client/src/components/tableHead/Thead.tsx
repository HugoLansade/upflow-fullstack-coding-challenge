import React from 'react'

export default function Thead() {

//ATTENTION LORSQUE L ON APPUIE SUR LE BUTTON ON LANCE UN SORT QUI CONCERNE LE TBODY ALORS QU4ON LCIQUE DANS LE THEAD 






    return (
        <thead id="global-thead" >
            <tr className='thead-row row'>
                {/* <th className='thead-unit-box'> <span>Number</span> <button>Sort croissant</button></th>    
                <th className='thead-unit-box'> <span>Customer</span> <button>Sort a-z</button></th> 
                <th className='thead-unit-box'> <span>Status</span> </th>
                <th className='thead-unit-box'> <span>Issue</span> </th> 
                <th className='thead-unit-box'> <span>Due</span> </th> 
                <th className='thead-unit-box'> <span>Title</span> <button>Sort a-z</button> </th> 
                <th className='thead-unit-box'> <span>Outstanding Amount</span> <button>Sort croissant</button></th> 
                <th className='thead-unit-box'> <span>Currency</span> </th> */}
                <th className='thead-unit-box'> <div className='thead-unit-box-in'><span>Number</span> <button className='btn-sort'><img src="./img/sort.svg" alt="sort-btn" /></button> </div> </th>    
                <th className='thead-unit-box'> <div className='thead-unit-box-in'><span>Customer</span> <button className='btn-sort'><img src="./img/sort.svg" alt="sort-btn" /></button></div></th> 
                <th className='thead-unit-box'> <span>Status</span> </th>
                <th className='thead-unit-box'> <span>Issue</span> </th> 
                <th className='thead-unit-box'> <span>Due</span> </th> 
                <th className='thead-unit-box'> <div className='thead-unit-box-in'><span>Title</span> <button className='btn-sort'><img src="./img/sort.svg" alt="sort-btn" /></button> </div></th> 
                <th className='thead-unit-box'> <div className='thead-unit-box-in'><span>Outstanding Amount</span> <button className='btn-sort'><img src="./img/sort.svg" alt="sort-btn" /></button></div></th> 
                <th className='thead-unit-box'> <span>Currency</span> </th>
                <th className='thead-unit-box'> </th>
                <th className='thead-unit-box'> </th>
            </tr>
        </thead>
    )
}
