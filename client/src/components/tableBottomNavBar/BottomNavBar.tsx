import React from 'react'


export default function BottomNavBar({navigation} : any) {
    return (
        <div className='bottom-nav'> 
                <button className={navigation.isPrevious ? 'btn-arrow': 'btn-arrow-hide'} onClick={() => navigation.previousPage()}><img src="./../../img/arrow.svg" alt="arrow-left" className='arrow-left arrow'/></button>
                <span> <strong>{navigation.page}- {!navigation.isNext ? navigation.totalRows : navigation.page + navigation.displayedRows}</strong> of {navigation.totalRows} invoices</span>
                <button className={navigation.isNext ? 'btn-arrow': 'btn-arrow-hide'} onClick={() => navigation.nextPage()}><img src="./../../img/arrow.svg" alt="arrow-right" className='arrow-right arrow'/></button>
        </div>
    )
}
