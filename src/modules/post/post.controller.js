const fs = require('fs');

const path = require('path');
const httpStatus = require('http-status');
const multiparty = require('multiparty');
const multer = require('multer');
const Post = require('./post.model');
const APIError = require('../../helpers/APIError');

const storage = multer.diskStorage({ // multers disk storage settings
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    const datetimestamp = Date.now();
    cb(null, `${file.fieldname}-${datetimestamp}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
  },
});

// eslint-disable-next-line no-unused-vars
const upload = multer({ // multer settings;
  storage,
}).single('thumbnailImage');

/**
 * Get book
 * @returns {Book}
 */
function findById(req, res, next, id) {
  Post.findById(id)
    .exec()
    .then((post) => {
      if (post) {
        return res.json(post);
      }
      const err = new APIError('No such post exists!', httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    })
    .catch(e => next(e));
}

/*
function getByPostType(req, res) {
  console.log('---------------', req.params.postType)
  Post.find({ postType: req.params.postType })
    .exec()
    .then((oPost) => {
      if (oPost) {
        console.log('**************', oPost)
        return res.json(oPost);
      }
      const err = new APIError('No such post exists!', httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    });
} */
/**
 * Create new post
 */
function create(req, res) {
  const post = new Post();
  let data = {};
  const form = new multiparty.Form(req);

  form.parse(req, (err, fields) => {
    data = {
      postType: fields.postType[0],
      postName: fields.postName[0],
      author: fields.author[0],
      blog: fields.blog[0],
      isActive: fields.activePost[0] || false,
      verify: fields.verifiedPost[0] || false,
      metaTag: fields.metaTag[0],
      updateAt: Date.now(),
      description: fields.description[0],
      readingTime: fields.readingTime[0],
    };
    Object.assign(post, data);
  });
  // eslint-disable-next-line consistent-return
  upload(req, res, (err) => {
    if (err) {
      return res.json({ error_code: 1, err_desc: err });
    }
    if (req.file && req.file.path) {
      post.thumbnailImage = req.file.path;
    } else {
      return res.status(httpStatus.OK).send({ message: 'Please select thumbnail Image' });
    }
    Post.findOne({ postName: post.postName })
      .exec()
      .then((foundPost) => {
        if (foundPost) {
          return res.status(httpStatus.OK).send({ message: 'Post name must be unique' });
        }
        return post.save()
          .then((savedPost) => {
            if (savedPost) {
              return res.status(httpStatus.OK).send({ message: 'Post has been added successfully.' });
            }
            return res.status(httpStatus.OK).send({ message: 'Some error accrued while added post.' });
          });
      })
      // eslint-disable-next-line no-shadow
      .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err }));
  });
}
/**
 * Update existing post
 * @param req
 * @param res
 * @param next
 */
function update(req, res) {
  const post = new Post();
  let data = {};
  const form = new multiparty.Form(req);
  form.parse(req, (err, fields) => {
    data = {
      postType: fields.postType[0],
      postName: fields.postName[0],
      author: fields.author[0],
      blog: fields.blog[0],
      isActive: fields.activePost[0] || false,
      verify: fields.verifiedPost[0] || false,
      metaTag: fields.metaTag[0],
      updateAt: Date.now(),
      _id: req.params.postId,
      description: fields.description[0],
      readingTime: fields.readingTime[0],
    };
    Object.assign(post, data);
  });

  // eslint-disable-next-line consistent-return
  upload(req, res, (err) => {
    if (err) {
      return res.json({ error_code: 1, err_desc: err });
    }
    if (req.file && req.file.path) {
      post.thumbnailImage = req.file.path;
    } else {
      return res.status(httpStatus.OK).send({ message: 'Please select thumbnail Image' });
    }
    Post.findOneAndUpdate({ _id: req.params.postId }, post)
      .then((oPost) => {
        if (oPost) {
          return res.status(httpStatus.OK).send({ message: 'Post has been updated successfully' });
        }
        return res.status(httpStatus.BAD_REQUEST).send({ message: 'Some error accrued while update post' });
      })
      // eslint-disable-next-line no-shadow
      .catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err }));
  });
}

/**
 * Get post list.
 * @return {Post[]}
 */
function list(req, res, next) {
  Post.find().sort({ createdAt: -1 })
    .then(oPosts => res.json(oPosts))
    .catch(e => next(e));
}

function getMostViewed(req, res, next) {
  Post.find()
    .then(oMostViewed => res.json(oMostViewed))
    .catch(e => next(e));
}

/**
 * Get random post
 * @return {Post}
 */
function getRandomPost(req, res) {
  Post.aggregate([{ $sample: { size: 5 } }])
    .then((oRandomPost) => {
      if (oRandomPost) {
        return res.json(oRandomPost);
      }
      const err = new APIError('No such post type exists!', httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    });
}

/**
 * Get post by postType
 * @return {Promise<Post[]>}
 */
function getByPostType(req, res) {
  Post.find({ postType: req.params.postType })
    .then((posts) => {
      if (posts) {
        return res.json(posts);
      }
      const err = new APIError('No such post type exists!', httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    });
}

/**
 * Get Post Detail By Id
 * @return {Promise<Post[]>}
 */
function getByPostDetailById(req, res) {
  Post.find({ _id: req.params.id })
    .then((oPost) => {
      if (oPost) {
        return res.json(oPost);
      }
      const err = new APIError('No such post exists!', httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    });
}

/**
 * Get All Post By Author
 * @return {Promise<Post[]>}
 */
function getAllPostByAuthor(req, res) {
  Post.find({ author: req.params.author })
    .then((oPost) => {
      if (oPost) {
        return res.json(oPost);
      }
      const err = new APIError(`No such post exists related author ${req.params.author}`, httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    });
}

/**
 * Get recommended post(Get post by postType what user now reading)
 * @return {Post}
 */
function getRecommendedPost(req, res) {
  Post.aggregate([{ $match: { postType: req.params.recommended } }])
    .then((oRecommendedPost) => {
      if (oRecommendedPost) {
        return res.json(oRecommendedPost);
      }
      const err = new APIError('No such post available for recommended!', httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    });
}

/**
 * Get Post Count
 */
function getPostCount(req, res) {
  Promise.all([
    Post.countDocuments().exec(),
    Post.countDocuments({ postType: 'VUEPHP' }).exec(),
    Post.countDocuments({ postType: 'TESTING' }).exec(),
    Post.countDocuments({ postType: 'NODE' }).exec(),
    Post.countDocuments({ postType: 'HTML CSS' }).exec(),
    Post.countDocuments({ postType: 'REACT' }).exec(),
    Post.countDocuments({ postType: 'ANGULAR' }).exec(),
    Post.countDocuments({ postType: 'JAVASCRIPT' }).exec(),
    Post.countDocuments({ postType: 'TYPESCRIPT' }).exec(),
  ])
    .then((counts) => {
      if (counts) {
        const data = {
          totalPost: counts[0],
          totalVuePhp: counts[1],
          totalTesting: counts[2],
          totalNode: counts[3],
          totalHtmlCss: counts[4],
          totalReact: counts[5],
          totalAngular: counts[6],
          totalJavascript: counts[7],
          totalTypeScript: counts[8],
        };
        return res.json(data);
      }
      const err = new APIError('No such post count available', httpStatus.NOT_FOUND, true);
      return Promise.reject(err);
    });
}

/**
 * Delete post
 * @return {Post}
 */
function remove(req, res, next) {
  Post.findOneAndRemove({ _id: req.params.postId })
    .then((deletePost) => {
      if (deletePost) {
        fs.exists(path.join(deletePost.thumbnailImage), (exists) => {
          if (exists) {
            console.log('File exists. Deleting now ...');
            fs.unlink(path.join(deletePost.thumbnailImage), (err) => {
              if (err) {
                console.log(`failed to delete local image:${err}`);
              } else {
                console.log('successfully deleted local image');
              }
            });
          } else {
            console.log('File not found, so not deleting.');
          }
        });
        return res.status(httpStatus.OK).send({ message: 'Post has been deleted successfully' });
      }
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Some error accrued while deleting post' });
    })
    .catch(e => next(e));
}

module.exports = {
  findById,
  create,
  update,
  list,
  getByPostType,
  remove,
  getRandomPost,
  getMostViewed,
  getByPostDetailById,
  getAllPostByAuthor,
  getRecommendedPost,
  getPostCount,
};
