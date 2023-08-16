const AWS = require('aws-sdk');

exports.uploadToS3 = (data, filename) =>{
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
    console.log(BUCKET_NAME,IAM_USER_KEY,IAM_USER_SECRET);

    let s3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME,
        region:'us-east-1'
    })
    
    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }
    return new Promise((resolve, reject) => {
        s3Bucket.upload(params, (err, s3response) => {
            if (err) {
                console.error("S3 Error",err);
                reject(err)
            } else {
                console.log("success", s3response);
                resolve(s3response.Location);
            }
        })
    });

}