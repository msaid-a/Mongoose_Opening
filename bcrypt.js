const bcrypt = require('bcryptjs')

let password = 'hello123'
let hash = '$2a$08$f2cMUmn1okWBC2tNeTKlQOA025AYh2TrdOaMOFUOz6QUKYTl9NGeS'

// Hasing
// bcrypt.hash(password,8)
//     .then(res=> {
//         console.log({password, res})
//     })

// compare
bcrypt.compare(password, hash)
    .then(res => {
        console.log(res)
    })