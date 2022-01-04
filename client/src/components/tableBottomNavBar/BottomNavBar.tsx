import React from 'react'

export default function BottomNavBar() {
    return (
        <div className='bottom-nav'> 
                <button className='btn-arrow'><img src="./../../img/arrow.svg" alt="arrow-left" className='arrow-left arrow'/></button>
                <span> <strong>1-25</strong> of 500 invoices</span>
                <button className='btn-arrow'><img src="./../../img/arrow.svg" alt="arrow-right" className='arrow-right arrow'/></button>

        </div>
    )
}
