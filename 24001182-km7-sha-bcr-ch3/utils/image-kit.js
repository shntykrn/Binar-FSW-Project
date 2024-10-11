const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : "public_pOsEgCtV6cyfjcvsKwGLQpOZfqY=",
    privateKey : "private_faFqUKPDPqynhb6ZXSow24eO1Bc=",
    urlEndpoint : "https://ik.imagekit.io/shntykrn/",
});

exports.imageUpload = async (file) => {
    const uploadFile = await imagekit.upload({
        file : file.data,
        fileName : file.name,
    });
    return uploadFile?.url;
}