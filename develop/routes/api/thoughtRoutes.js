const router = require('express').Router()
const {getSingleThought, getThoughts, createThought, deleteThought, updateThought, addReaction, delReaction} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts).post(createThought)
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)
router.route('/:thoughtId/reaction').post(addReaction)
router.route('/:thoughtId/reaction/:reactionId').delete(delReaction)





module.exports = router