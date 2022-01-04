import React, { useState, useEffect, HtmlHTMLAttributes } from 'react'
import axios from 'axios'

import Thead from "./tableHead/Thead"
import Tbody from "./tableBody/Tbody"
import BottomNavBar from "./tableBottomNavBar/BottomNavBar"

interface Invoice {
    number : number
    customer : string
    status : "Overdue" | "Paid" | "Unpaid" | "In dispute" | "Unsent" | "Voided" | "Written off"
    issue : string
    due : string
    title : string
    outstandingAmount : number
    currency : "USD" | "GBP" | "UR"
    id : string
}


// interface ServerResponse {
//     data: User
// }

interface User {
    address : {
        city : string
    }
    email : string
    username : string
    phone : string
    id : number
}

export default function Grid() {
    // const [allUsers, setallUsers] = useState<ServerResponse[]>([]);
    const [allUsers, setallUsers] = useState<User[]>([]);

    // const [userOnScreen, setuserOnScreen] = useState<User[]>([])
    const [userOnScreen, setuserOnScreen] = useState<User[]>([])

    const limitUserOnScreen = 5;

    useEffect(() => {
        // fetchUsers()
        // assignUserOnScreen();
    }, [])

    const fetchUsers = () => {
       
            axios.get("https://fakestoreapi.com/users")
            .then((res) => {
                setallUsers(res.data)
                // console.log("resdata")
                // console.log(res.data)
                // console.log("allusers")
                // console.log(allUsers)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const assignUserOnScreen = () => {
        let tempUser = [];
        for (let i = 0; i < limitUserOnScreen; i++) {
            tempUser.push(allUsers[i]);  
            console.log(allUsers[i])    
        }
        setuserOnScreen(tempUser)
        console.log("userOnScreen")

        console.log(userOnScreen)
        console.log(userOnScreen[0])
        console.log(userOnScreen[0].address.city)
        console.log(userOnScreen[0].username)

    }

    // console.log("alluser end")
    // console.log(allUsers)
    // console.log("--------------------------")
    // allUsers.forEach(el => console.log(el.username))
    console.log("--------------------------")
    
/****************************** RESIZE LES COLUMNS************work in progress************/
    // //Resize box 
    // let generalTable = document.getElementsByClassName(".general-table")
    // // let tables = document.getElementsByTagName("table")
    // resizableGrid(generalTable);

    // function resizableGrid(table:HTMLCollectionOf<Element>) { //HTMLCollectionOf<Element> //HTMLCollection
    //     // let row = table.getElementsByTagName("tr")[0];
    //     let row = table.getElementsByClassName(".thead-row");
    // console.log("-------row-------------------")
    // console.log(row)
    // console.log(row.children)


    //     let cols = row ? row.children : undefined;
    //     if (!cols) return;
    // }
/****************************** END RESIZE LES COLUMNS************work in progress************/


    return (
        <div id="global-container">
            <div className="global-grid">
                {/* <h1>Welcome</h1> */}
                <table className="general-table" > 
                {/* cellpadding="0" cellspacing="0" */}
                    <Thead/>
                    <Tbody/>      
                </table>       
                <BottomNavBar/>

            </div>
        </div>
    )
}
