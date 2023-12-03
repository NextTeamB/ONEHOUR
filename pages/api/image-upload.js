import aws from "aws-sdk";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fileName, imgType } = req.body;
    aws.config.update({
      // aws 설정 업데이트
      accessKeyId: process.env.MY_AWS_ACCESS_KEY,
      secretAccessKey: process.env.MY_AWS_SECRET_KEY,
      region: "ap-northeast-2",
      signatureVersion: "v4",
    });
    const s3 = new aws.S3();
    const urlResponse = await s3.createPresignedPost({
      // S3 버킷의 presigned Url 생성
      Bucket: process.env.AWS_IMAGE_BUCKET,
      Fields: { key: imgType + "/" + fileName }, // 파일 저장 경로 - aws의 presigned Url을 설정할 때 사용됨
      Expires: 60, // seconds
      Conditions: [
        // 정책 설정
        ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
      ],
    });
    res.status(200).json(urlResponse);
  }
}
