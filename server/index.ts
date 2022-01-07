import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())

//READ
app.get('/allInvoice', async (req, res) => {
  // console.log('getting invoice')
  const allInvoice = await prisma.invoice.findMany()
  // console.log('Done -- result :')
  // console.log(allInvoice.length)
  res.json(allInvoice)
})

//DELETE
app.delete('/invoice/:id', async (req, res) => {
  console.log('delete')
  const { id } = req.params
  const invoiceDeleted = await prisma.invoice.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(invoiceDeleted)

})

//EDIT
// app.put('/publish/:id', async (req, res) => {
//   const { id } = req.params
//   const invoiceUpdated = await prisma.invoice.update({
//     where: { id: Number(id) },
//     data: { },
//   })
//   res.json(invoiceUpdated)
// })

const server = app.listen(4001, () =>
console.log(
  'Server ready at: http://localhost:4001',
),
)

/******************************************************************************************************* */
/******************************************************************************************************* */
// Function for creating random data

function randomNumber(max:number, min:number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomStatus() {
  let statusArray = ["Due","Indispute","Overdue","Paid","Unsent","Voided","WrittenOff"];
  let index = randomNumber(statusArray.length,0);
  return statusArray[index];
}

function randomCurrency() {
  let currencyArray = ["EUR","USD","GBP"];
  let index = randomNumber(currencyArray.length,0);
  return currencyArray[index];
}

function randomDate(start:Date, end:Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

function randomName(){
  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}


// (number: Number, status: String, issue : DateTime, due : DateTime, title : String?, outAmount : Number, currency : String ) {
async function createRandomInvoice() {


  for (let index = 0; index < 210; index++) {
  let number = randomNumber(999999,100000);
  let status = randomStatus();
  let issue = randomDate(new Date(2018, 0, 1), new Date())
  let due = randomDate(new Date(2018, 0, 1), new Date())
  let outstandingAmount = randomNumber(50000,20000)
  let currency = randomCurrency()
  let title = randomName();
  let customer = randomName();

  await prisma.invoice.create({
    data: {
      number: number,
      customer : customer,
      // status: status,
      issue: issue,
      due: due,
      title : title,
      outstandingAmount : outstandingAmount,
      // currency: "currency"
    },
  })
  console.log("OK 1")

}
  // const allInvoice = await prisma.invoice.findMany()

  // console.dir(allInvoice, { depth: null })

}

// CREATION DE DATA
  // createRandomInvoice()
  // .catch((e) => {
  //   throw e
  // })
  // .finally(async () => {
  //   console.log("OK")
  //   await prisma.$disconnect()
  // })
  

/******************************************************************************************************* */
/******************************************************************************************************* */



console.log("************************************")





// We want 3 possibilities READ, UPDATE, DELETE

/*************************************************** */
//                   READ ALL                        //
/*************************************************** */
/*
router.get("/", async (req : express.Request, res: express.Response) => {
  console.log("there")
  res.send('Im alive')

  // res.send('Im ok')

  // try {
  //   const allInvoices = await prisma.invoice.findMany()
  //   res.status(200).json(allInvoices);
  // } catch (err) {
  //   console.log(err)
  // }
});


async function read() {
  const allInvoice = await prisma.invoice.findMany()
  console.log(">>>>>>>>>>>>>>>")

  console.log(allInvoice)
}

//READ ONE
async function readOne(id:number){
  const invoice = await prisma.invoice.findUnique({
    where: {
      id: id,
    },
  })
  console.log("The one with id = ", id)
  console.log(invoice)
}

// DELETE ONE
async function removeOne(id:number) {
  const invoice = await prisma.invoice.delete({
    where: {
      id: id,
    },
  })
  console.log("delete = ", id)
  console.log(invoice)

}

readOne(115)
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

  console.log('LAAAAAAAAA')

  // import {useState, useEffect} from 'react'

// const [allData, setAllData] = useState([]);
// const [data, setData] = useState([]);


// useEffect(() => {
//   getAllData()
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
//   fillData(25);
//   console.log("Final result Data.length-------------------------")

//   console.log(data.length)
// }, [])
let allData:string[] = [];
let pageData:string[] = [];
function fillData(limit : number) {
  let arr = [];
  for (let i = 0; i < limit; i++) {
    arr[i] = allData[0]
  }
  pageData = arr;
  console.log("Final result Data.length-------------------------")
  console.log("Result length :", pageData.length)

}

*/