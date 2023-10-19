package com.example.involveU.model;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.core.ResponseInputStream;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class S3Util {

    private String bucketName; // Instance variable to hold the bucket name
    private static final String accessKeyId = "AKIAUBDAJ3HEDPM7IYGG";
    private static final String secretAccessKey = "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";
    Region region = Region.US_EAST_1;
    S3Client client;

    public S3Util(String bucketName) {
        this.bucketName = bucketName;
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKeyId, secretAccessKey);
        client = S3Client.builder().region(region).credentialsProvider(StaticCredentialsProvider.create(awsCreds)).build();
    }

    public void uploadFile(String fileName, InputStream inputStream) throws IOException {
        PutObjectRequest request = PutObjectRequest.builder().bucket(bucketName).key(fileName).acl("public-read").build();
        client.putObject(request, RequestBody.fromInputStream(inputStream, inputStream.available()));
    }

    public byte[] downloadFile(String keyName) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        GetObjectRequest request = GetObjectRequest.builder().bucket(bucketName).key(keyName).build();
        try {
            ResponseInputStream<GetObjectResponse> inputStream = client.getObject(request);
            buffer = new ByteArrayOutputStream();
            int nRead;
            byte[] data = new byte[16384];
            while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
                buffer.write(data, 0, nRead);
            }
        } catch(Exception e) {
            System.out.println(keyName);
        }
        return buffer.toByteArray();
    }

    public boolean deleteImg(String filePath) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder().bucket(bucketName).key(filePath).build();
        try {
            client.deleteObject(deleteObjectRequest);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }

    public void createFolders(String folderName) {
        PutObjectRequest request = PutObjectRequest.builder().bucket(bucketName).key(folderName).build();
        client.putObject(request, RequestBody.empty());
    }

    public void uploadFile(String fileName, InputStream inputStream, String clubName) throws IOException {
        PutObjectRequest request = PutObjectRequest.builder().bucket(bucketName).key(clubName + "/" + fileName).acl("public-read").build();
        client.putObject(request, RequestBody.fromInputStream(inputStream, inputStream.available()));
    }
}
