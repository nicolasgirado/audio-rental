import * as multer from 'multer';

export const uploadImg = multer({
	limits: { fileSize: 1000000 }, // bytes
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Invalid file format. Please upload .jpg, .jpeg or .png images'));
		}
		cb(undefined, true);
	}
});
