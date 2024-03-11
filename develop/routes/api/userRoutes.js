const router = require('express').Router()
const {getSingleUser, getUsers, createUser, deleteUser, addFriend, delFriend, updateUser} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser)
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)
router.route('/:userId/friends/:friendId').post(addFriend).delete(delFriend)


module.exports = router