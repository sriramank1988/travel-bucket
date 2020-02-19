const express = require("express")
const app = express()
const axios = require("axios")
const port = 8080
const clientID = '4dd63b646b0043412be0'
const clientSecret = '38c0d44c22477f4abd8da92c5b90dae6cac0557f'
app.set('views','./views')
app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'))
app.get("/", (req,res) => {
    res.render('login')
})
app.get('/oauth/redirect', (req, res) => {
    const requestToken = req.query.code
    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        const accessToken = response.data.access_token
        axios({
            method: 'get',
            url: 'https://api.github.com/user',
            headers: {
                Authorization: 'token ' + accessToken
            }
        })
        .then(({ data }) => {
            res.render('bucketlist', { data })
        })
        // .catch(e => console.log(e))
       // res.redirect(`/bucketlist.html?access_token=${accessToken}`)
    })
})
  

app.listen(port, () =>{
    console.log(`listening in port ${port}`)
})