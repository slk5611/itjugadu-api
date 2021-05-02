const express = require('express');
const expressJwt = require('express-jwt/lib');
const config = require('./config');
const userRoutes = require('./modules/user/user.routes');
const authRoutes = require('./modules/auth/auth.routes');
const postRoutes = require('./modules/post/post.routes');
const contactRoutes = require('./modules/contact/contact.routes');
const newsletterRoutes = require('./modules/newsletter/newsletter.routes');
const dashboardRoutes = require('./modules/dashboard/dashboard.routes');
const commentRoutes = require('./modules/comment/comment.routes');
const metadataRoutes = require('./modules/metadata/metadata.routes');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount post routes at /posts
router.use('/posts', postRoutes);

router.use('/contacts', contactRoutes);

router.use('/newsletters', newsletterRoutes);

router.use('/dashboard', dashboardRoutes);

router.use('/comments', commentRoutes);

router.use('/metadata', metadataRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// Validating all the APIs with jwt token.
router.use(expressJwt({ secret: config.jwtSecret }));

// If jwt is valid, storing user data in local session.
router.use((req, res, next) => {
  const authorization = req.header('authorization');
  res.locals.session = JSON.parse(Buffer.from((authorization.split(' ')[1]).split('.')[1], 'base64').toString()); // eslint-disable-line no-param-reassign
  next();
});

// mount user routes at /users
router.use('/users', userRoutes);

// mount book routes at /books

module.exports = router;
