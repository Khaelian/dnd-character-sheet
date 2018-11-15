"use strict";

var _storage = require("@google-cloud/storage");

const bucketName = `saturdaynightnaturals.appspot.com`; // console.log(`Downloading .env from bucket '${bucketName}'`)

const storage = new _storage.Storage({
  projectId: 'saturdaynightdnd'
});
storage.bucket(bucketName).getFiles().then(files => {
  console.log('files', files);
}).catch(err => {
  console.log('error getting files', err);
});
storage.getBuckets().then(buckets => {
  console.log(buckets);
}).catch(err => {
  console.log('error getting buckets', err);
}); // gcs.bucket(bucketName)
//   .file('.env')
//   .download({destination: '.env'})
//   .then(() => {
//     console.log('Successfully downloaded .env')
//   }).catch((err) => {
//     console.log(`Error retrieving .env: ${err}`)
//   })