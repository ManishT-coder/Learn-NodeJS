const User= require('../models/user');

async function handleGetAllusers(req, res) {
    const allUsers = await User.find({});
    res.json(allUsers); 
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }
    return res.json(user);
};

async function handleUpdateUserById(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id,{"lastName": "Updated"});
    return res.status(200).json({
        message: 'User updated successfully',
    });
}

async function handleDeleteUserById(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        message: 'User deleted successfully',
      });
}

async function handleCreateNewUser(req, res) {
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
        id: result._id
    });
}

module.exports = {
    handleGetAllusers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
} 
