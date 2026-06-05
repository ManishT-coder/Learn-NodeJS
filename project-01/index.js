const express = require('express');
const users = require('./MOCK_DATA.json');
const fs   = require('fs');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userdb')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => 
    console.error('Error connecting to MongoDB:', err));





app.use(express.urlencoded({extended: false}));

//Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
},
{timestamps: true}
);

const User = mongoose.model('User', userSchema);


// Routes

app.get('/users', async(req, res) => {
    const allUsers = await User.find({});
    const html = `
    <ul>
        ${allUsers.map((user) => `<li> ${user.firstName} -  ${user.email}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});


//REST API


app.route('/api/users/:id')
.get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    return res.json(user);
}).patch(async (req, res) => {
    // const id = Number(req.params.id);

    // const userIndex = users.findIndex(user => user.id === id);

    // if (userIndex === -1) {
    //     return res.status(404).json({
    //         message: 'User not found'
    //     });
    // }

    // users[userIndex] = {
    //     ...users[userIndex],
    //     ...req.body,
    //     ...req.query
    // };
    const user = await User.findByIdAndUpdate(req.params.id,{"lastName": "Updated"});
    return res.status(200).json({
        message: 'User updated successfully',
        // user: users[userIndex]
    });
})

.delete(async (req, res) => {
    // const id = Number(req.params.id);

    // const userIndex = users.findIndex(user => user.id === id);

    // if (userIndex === -1) {
    //     return res.status(404).json({
    //         message: 'User not found'
    //     });
    // }

    // const deletedUser = users[userIndex];
    // users.splice(userIndex, 1);

    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        message: 'User deleted successfully',
        // user: deletedUser
    });
}); 

app.post('/api/users', async (req, res) => {
    const body = req.body;
    if(
        !body||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.job_title ||
        !body.gender
    ) {
        return res.status(400).json({
            message: 'All fields are required'
        });
      }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender
    });

    console.log('User created:', result);
    return res.status(201).json({
        message: 'User created successfully',
    });
});

app.get('/api/users',async (req, res) => {
    const allUsers = await User.find({});
    // Set custom header
    // Always add X- prefix to custom headers to avoid conflicts with standard headers
    res.setHeader('X-Myname', 'Manish');
    res.json(allUsers);
});


  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 