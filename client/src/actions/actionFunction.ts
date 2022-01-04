import { useEffect, useReducer, useMemo } from 'react';


export type Action =
  | { type: 'NEXT_PAGE';
      data: Data[] }
  | { type: 'PREVIOUS_PAGE';
      data: Data[] }
  | { type: 'SORT'; 
      isDescending?: boolean; 
      sortedType : string; // sort by number or alphabeticaly
      data: Data[] };

  export type State = {

    dataOnPage : Data[];

    // We initialise our parameters for travelling through the tab
    page: number;
    displayedPage : number; //default 25
    totalRows: number;
    isNext : boolean;
    isPrevious : boolean;
    nextPage: () => void;
    previousPage: () => void;

    // We initialise our parameters for sorting data
    sortedColumn? : string | null; //Which column is actually sorted
    isDescending : boolean; // by default we have the higher values at the top if sorted
    sortOn: boolean; // by default no sort prevent 

  };

  export interface Data {
    id: number;        
    number: number; 
    status : string;
    issue : Date;
    due : Date;
    title : string;
    outstandingAmount : number;
    currency : string;
}


const reducer = () =>
(state: State, action: Action) => {
  switch (action.type) {
    case 'NEXT_PAGE':
        // If we already are at the end dont do anything (Bonus : change the color of the button so we understand it's not clickable)
        // Else get page in useMemo that respect the actual criteria (sort or not) 
        // Display the 25 next to the actual position
        if(!state.isNext){
            break;
            // If no next page then we dont return anything
        }
        return {
            page : state.page + state.displayedPage,
            dataOnPage : state.dataOnPage = action.data.splice(state.page -1, state.page + state.displayedPage)
        }
        break;

    case 'PREVIOUS_PAGE':
    // If we already are at the start dont do anything (Bonus : change the color of the button so we understand it's not clickable)
    // Else get page in useMemo that respect the actual criteria (sort or not) 
    // Display the 25 previous to the actual position
        if(!state.isPrevious){
            break;
            // If no next page then we dont return anything
        }
        return {
            page : state.page - state.displayedPage,
            dataOnPage : state.dataOnPage = action.data.splice(state.page -1, state.page + state.displayedPage)
        }
        break;

    case 'SORT':
        // We have 2 sort types : Ascending/descending for numbers or alphabeticaly.
        // We should know what is the intention of the user first
        if(action.sortedType === 'Letter'){
            //sortLetter
        } else if (action.sortedType === 'Number') {
            action.data.sort((a,b) => a.id - b.id);
        }  else if (action.sortedType === 'Date') {
            //sortDate
        } else {
            alert('Typo in sort');
        }


        break;

    default :
        alert('Bug in switch reducer');

    }
}

// const sortNumber = (data : string ) => {
//     data.sort((a, b) => b.id - a.id);
// }

// const sortAlphabeticaly = (data : string) => {
//     //SOL 2 POUR LES alphabets
// function compareStrings(a, b) {
//     // Assuming you want case-insensitive comparison
//     a = a.toLowerCase();
//     b = b.toLowerCase();
  
//     return (a < b) ? -1 : (a > b) ? 1 : 0;
//   }
  
//   data.sort(function(a, b) {
//     return compareStrings(a.email, b.email);
//   })
  
// }

// const reducer = createReducer();
 
// const [state, dispatch] = useReducer(reducer, { 
//     //INITIALISATION DES PARAMETRES
//     dataOnPage: null,
//     page: 1,
//     displayedPage : 25, //default 25
//     totalRows: null,
//     isNext : true,
//     isPrevious : false,
//     nextPage: () => {},
//     previousPage: () => {},
//     sortedColumn :  null, //Which column is actually sorted
//     isDescending : true, // by default we have the higher values at the top if sorted
//     sortOn: false, // by default no sort prevent 

// });
