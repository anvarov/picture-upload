// const fs = require('fs');
const fetch = require('node-fetch');
const signer = require('aws-sdk/lib/signers/v4');
const AWS = require('aws-sdk');
const date = new Date();


const putObject = (file) => {
    const req = new AWS.HttpRequest('https://82838jdzsc.execute-api.us-east-2.amazonaws.com/upload-picture', 'us-east-2');
    req.body = file.data;
    req.method = 'POST'
    req.headers = {
        'content-type':file.mimetype,
        'host': '82838jdzsc.execute-api.us-east-2.amazonaws.com',
        'accept':'application/json'
    }

    const signed = new signer(req, 'execute-api', {
        signatureVersion: 4,
    });
    
    signed.addAuthorization({ accessKeyId:'AKIAQPETPWZH6TR27DE4', secretAccessKey: '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'}, date)
    return fetch('https://82838jdzsc.execute-api.us-east-2.amazonaws.com/upload-picture', {...signed.request}).then( async (res) => {
        return await res.json();
    }).catch(err => {
        return { err };
    });
}

module.exports = putObject;


// function getSignatureKey(key, dateStamp, regionName, serviceName) {
//     var kDate = crypto.HmacSHA256(dateStamp, "AWS4" + key);
//     var kRegion = crypto.HmacSHA256(regionName, kDate);
//     var kService = crypto.HmacSHA256(serviceName, kRegion);
//     var kSigning = crypto.HmacSHA256("aws4_request", kService);
//     return kSigning;
// }

// fs.readFile('./download.png', (err, data) => {
//     if (err) {
//         console.log('file not found')
//         return err;
//     }
//     const canonicalRequest = 'POST' + '\n' +
//                             URI.normalize('/upload-picture') + '\n' + 
//                             'name=test' + '\n' + 
//                             'content-type:image/png' + '\n' +
//                             '82838jdzsc.execute-api.us-east-2.amazonaws.com' + '\n' +
//                             `x-amz-date:${date}` + '\n' +
//                             'content-type;host;x-amz-date' + '\n' + 
//                             Crypto.enc.Hex.stringify(sha256(''));
//     const canonicalRequestHash = Crypto.enc.Hex.stringify(sha256(canonicalRequest));
//     console.log(canonicalRequest, 'requestc')
//     const stringToSign = 'AWS4-HMAC-SHA256' + '\n' +
//                         `${date}` + '\n' +
//                         `${date.slice(0, 10)}/us-east-2/execute-api/aws4_request` + '\n' +
//                         canonicalRequestHash;
//     const signature = Crypto.enc.Hex.stringify(Crypto.HmacSHA256(stringToSign, kSigning));
//     // console.log(signature)
//     fetch('https://82838jdzsc.execute-api.us-east-2.amazonaws.com/upload-picture?name=test', {
//         headers: {
//             'Authorization': `AWS4-HMAC-SHA256 Credential=AKIAQPETPWZH6TR27DE4/${date.slice(0,10)}/us-east-2/execute-api/aws4_request, SignedHeaders=content-type;host;x-amz-date, Signature=${signature}`,
//             'X-Amz-Date': date,
//             'Content-Type': 'imgage/png',
//             'Host':'82838jdzsc.execute-api.us-east-2.amazonaws.com'
//         },
//         method: 'POST'
//     }).then( async (res) => {
//         console.log(res.json().then(data => console.log(data)))
//         console.log(res, 'res');
//     }).catch(err => {
//         console.log(err.headers, 'error')
//     });
// });

// console.log(date);


                  

// console.log(signer());
