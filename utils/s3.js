const knox = require("knox-s3");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets"); // secrets.json is in .gitignore
}

const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: "spicedling"
});

exports.upload = function(request, response, next) {
    if (!request.file) {
        return response.sendStatus(500);
    }
    const s3Request = client.put(request.file.filename, {
        "Content-Type": request.file.mimetype,
        "Content-Length": request.file.size,
        "x-amz-acl": "public-read"
    });
    const stream = fs.createReadStream(request.file.path);
    stream.pipe(s3Request);

    s3Request.on("response", s3Response => {
        console.log(s3Response.statusCode, request.file.filename);
        if (s3Response.statusCode == 200) {
            next();
            //fs.unlink(request.file.path, () => {});
        } else {
            response.sendStatus(500);
        }
    });
};
