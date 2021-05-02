const httpStatus = require('http-status');
const Comment = require('./comment.model');
const Post = require('../post/post.model');

function create(req, res) {
  const comment = new Comment(req.body);
  comment.save()
    .then((oComment) => {
      Post.findByIdAndUpdate({ _id: req.body.posts }, { $inc: { comment: 1 } })
      // eslint-disable-next-line no-unused-vars
        .then((oData) => {
          console.log('comment increase in post');
        });
      if (oComment) {
        return res.json(oComment);
      }
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Some error accrued while commenting on post please try after some time or email us email is given on contact us detail.' });
    })
    .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err }));
}

function getCommentByPost(req, res) {
  Comment.find({ posts: req.params.postId }).populate({ path: 'users', match: { isActive: true }, select: 'firstName lastName' })
    .exec((err, users) => {
      if (users) {
        return res.json(users);
      }
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'No such comment related to this post!' });
    });
}

function getRecentComment(req, res) {
  Comment.find().populate({ path: 'users', match: { isActive: true }, select: 'firstName lastName' }).populate({ path: 'posts', select: 'postName' })
    .exec((err, users) => {
      if (users) {
        return res.json(users);
      }
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'No such recent comment!' });
    });
}

function deleteComment(req, res, next) {
  Comment.findOneAndRemove({ _id: req.params.commentId })
    .then((oComment) => {
      Post.findByIdAndUpdate({ _id: oComment.postId }, { $inc: { comment: -1 } })
      // eslint-disable-next-line no-unused-vars
        .then((oData) => {
          console.log('comment decrease from post');
        });
      if (oComment) {
        return res.status(httpStatus.OK).send({ message: 'Comment has been deleted successfully' });
      }
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Some error accrued while deleting Comment' });
    })
    .catch(e => next(e));
}
module.exports = {
  create,
  getCommentByPost,
  deleteComment,
  getRecentComment,
};
