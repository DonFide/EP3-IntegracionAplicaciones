const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: {
        type:String,
        require:true
    },
    lastName: {
        type:String,
        require:true
    }, 
    email: {
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true
    }
})

userSchema.methods.encryptPassword = async (password) => {
    const salt =bcrypt.genSaltSync(7)
    return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema)