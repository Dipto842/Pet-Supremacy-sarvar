const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000
const stripe = require("stripe")(process.env.DB_API_SIKRETKAY)
const jwt = require('jsonwebtoken');
app.use(cors())

app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_PET}:${process.env.DB_PASS}@cluster0.ssb3nmc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const petlist = client.db("pet").collection("petlist");
    const mypetlists = client.db("pet").collection("mypetlists");
    const petadop = client.db("pet").collection("petadop");
    const Donation = client.db("pet").collection("Donation");
    const userInpho = client.db("pet").collection("userInpho");
    const paymentseve = client.db("pet").collection("paymentseve");

  


    // jwt token

app.post('/jwt',(req,res)=>{
  const body = req.body
  const token = jwt.sign(body,process.env.DB_JWT_SICURITKEY,{
    expiresIn:'2h'
  })
  res.send({token})
})

// token Verifiy
const tokenveriy=(req,res,next)=>{
  if(!req.headers.Authorization){
    return res.state(401).send(alert('forbidden access'))
  }

  const token = req.headers.Authorization.split(' ')[1]
}
    // end jwt

    app.get('/petlis/:email',async(req,res)=>{
      const emai=req.params.email
      const quear = { email: emai }
      
      
      const ruser = await petlist.find(quear).toArray()
       res.send(ruser)
          })


    app.get('/petli/:id', async (req,res) => {

      const Id = req.params.id;
     console.log(Id);
     
      
      const quear = {_id: new ObjectId(Id)  }
  
      const ruser = await petlist.findOne(quear)
      res.send(ruser)
    })

    app.post('/petlist',async(req,res)=>{
const boddy=req.body
const resar = await petlist.insertOne(boddy)
res.send(resar)
    })


    

 app.get('/petadot/:UserEmal', async(req,res)=>{
  const UserEmal = req.params.UserEmal


const quear = { UserEmali:UserEmal}

  const resar = await petadop.find(quear).toArray()
  res.send(resar)


 })

   
    app.patch('/upredlist/:id',async(req,res)=>{
      const data = req.body
      const id = req.params.id
      const filtar = {_id: new ObjectId(id)}
      const updateDog= {
        $set:{
          name:data.name,
          age:data.age,
          image:data.image,
          location:data.location,
          Category:data.Category,
          Short:data.Short,
          Long:data.Long,
         
        }
      }
      const rejar= await petlist.updateOne(filtar,updateDog)
      res.send(rejar)
    })
   
    // app.patch('/petlist/:id',async(req,res)=>{
    //   const data = req.body
    //   const id = req.params.id
    //   const filtar = {_id: new ObjectId(id)}
    //   const updateDog= {
    //     $set:{
    //       adopted:true
         
    //     }
    //   }
    //   const rejar= await petlist.updateOne(filtar,updateDog)
    //   res.send(rejar)
    // })



app.delete('/petlist/:id',async(req,res)=>{
  const id = req.params.id
  const find= {_id:new ObjectId(id)}
  const rejar = await petlist.deleteOne(find)
  res.send(rejar)
})

    app.post('/userInpho', async (req, res) => {
      const boddy = req.body
      const email = { email: boddy.email }
      const fine = await userInpho.findOne(email)
      if (fine) {
        return res.send({ message: 'ok', insertedId: null })
      }
      const rejar = await userInpho.insertOne(boddy)
      res.send(rejar)
    })
    app.get('/userInpho',async(req,res)=>{
 
      
      const rejer = await userInpho.find().toArray()
      res.send(rejer)
    })

    app.get('/petlist', async (req, res) => {
      const rejer = await petlist.find().toArray()
      res.send(rejer)
    })

    // adoptet
    app.patch('/adoptet/:id',async(req,res)=>{
      const id =req.params.id
     
      const filtar= {_id:new ObjectId(id)}

      const upinfrom ={
        $set:{
          adopted:true
        }
      }
      const rejar = await petlist.updateOne(filtar,upinfrom)
      res.send(rejar)
    })

    app.get('/petadot', async (req, res) => {
      const email = req.params.email
      const quear = {email:email}
      const rejer = await petadop.find(quear).toArray()
      res.send(rejer)
    })

    app.post('/petadot', async (req, res) => {
      const newassarmen = req.body
      

      const rejar = await petadop.insertOne(newassarmen)
      res.send(rejar)
    })
 
    app.patch('/Pause/:id',async(req,res)=>{
      const id = req.params.id
      const filtar= {_id:new ObjectId(id)}
      const updateDog={
        $set:{
          Pause:false
        }
      }
      const rejar = await Donation.updateOne(filtar,updateDog)
      res.send(rejar)
    })
    app.patch('/unPause/:id',async(req,res)=>{
      const id = req.params.id
      const filtar= {_id:new ObjectId(id)}
      const updateDog={
        $set:{
          Pause:true
        }
      }
      const rejar = await Donation.updateOne(filtar,updateDog)
      res.send(rejar)
    })

    app.get('/Donation/:email',async(req,res)=>{
const email = req.params.email
const quear = {email:email}
const resar = await Donation.find(quear).toArray()
res.send(resar)
    })
    app.get('/Donati/:id', async (req, res) => {
      const perams = req.params.id
      const quear = { _id: new ObjectId(perams) }
      const rejar = await Donation.findOne(quear)
      res.send(rejar)
    })

    app.post('/Donation',async(req,res)=>{
      const body = req.body
      const rejar =await Donation.insertOne(body)
      res.send(rejar)
    })
    app.get('/Donation', async (req, res) => {
      res.send(await Donation.find().toArray())
    })

    app.delete('/deletdonechon/:id',async (req,res)=>{
      const id = req.params.id
      const filtar = {_id: new ObjectId(id)}
      const rejar= await Donation.deleteOne(filtar)
res.send(rejar)
    })
    app.patch('/DonationUpred/:id',async(req,res)=>{
      const data = req.body
      const id = req.params.id
      const filtar= {_id: new ObjectId(id)}

      const upinfrom={
      $set:{
        name: data.name,
        maxDonationAmount: data.maxDonationAmount,
        image: data.image,
        donatedAmount: data.donatedAmount,
      }
      }
      const rejar = await Donation.updateOne(filtar,upinfrom)
      res.send(rejar)
    })

    // mack admin 
    app.patch('/admin/:id',async (req,res)=>{
      const id = req.params.id
      const quear = {_id: new ObjectId(id)}
      const updateDog = {
        $set:{
          role:'admin'
        }
      }
      const rejar = await userInpho.updateOne(quear,updateDog)
      res.send(rejar)
    })

    // pemetmethor
    app.post("/create-payment-intent",async(req,res)=>{
      const { price } = req.body
      const amount = parseInt(price *100)
  
      
      const paymentIntent =await stripe.paymentIntents.create( {
        amount: amount,
       
        currency:'usd',
        payment_method_types:['card']

      })
      res.send({
        clientSecret: paymentIntent.client_secret,
      })
    })

    app.post('/paymentIntent',async (req,res)=>{
      const body= req.body
      const rejar = await paymentseve.insertOne(body)
      res.send(rejar)
    })
    app.get('/paymentIntentinph',async(req,res)=>{
      const rejar = await paymentseve.find().toArray()
      res.send(rejar)
    })
    // app.get('/paymentIntentinp/:id',async(req,res)=>{
    //   const id = req.params.id
     
      
    //   const filtar = {Id: id}
    
     
    //   const rejar = await paymentseve.findOne(filtar)
    //   res.send(rejar)
    // })
 
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);









app.get('/', (req, res) => {
  res.send('pet is rune')
})

app.listen(port, () => {
  console.log(`pet is run port ${port}`)
})