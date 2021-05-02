const AWS = require('aws-sdk');

const space = new AWS.S3({
  // Get the endpoint from the DO website for your space
  endpoint: 'nyc3.digitaloceanspaces.com',
  useAccelerateEndpoint: false,
  // Create a credential using DO Spaces API key (https://cloud.digitalocean.com/account/api/tokens)
  credentials: new AWS.Credentials('F3VNPW5GMY3GE7YRVKT3', 'ig9MIML08r45n9kLuOTLpR4xTz3VLCZEFpg5xhuno5E', null),
});

// Name of your bucket here
const BucketName = 'itjugadu-thumbnail1';

exports.uploadImage = (req, res) => new Promise((resolve, reject) => {
  let imageUrl = '';
  const uploadParameters = {
    Bucket: BucketName,
    ContentType: 'multipart/form-data',
    Body: req.file.buffer,
    ACL: 'public-read',
    Key: req.body.postName.replace(/ /g, '_'),
  };

  space.upload(uploadParameters, (error, data) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      reject();
      return;
    }
    // eslint-disable-next-line consistent-return
    imageUrl = data.Location;
    // eslint-disable-next-line no-unreachable
    resolve(data.Location);
  });
  return imageUrl;
});
