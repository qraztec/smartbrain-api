const handleRegister = (req,res, db, bcrypt) => {
    const {email, password, name} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect for submission')
    }
    const hash = bcrypt.hashSync(password);
    console.log("got here 1")
    db.transaction(trx => {
        console.log("got here 2")
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            }).
            then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
        
        .catch(err => res.status(400).json('unable to register'))
    
}
module.exports = {
    handleRegister: handleRegister
}