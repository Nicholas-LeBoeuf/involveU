package com.example.involveU.model;
import java.io.*;
import java.nio.file.StandardCopyOption;
import java.util.zip.DataFormatException;
import java.util.zip.Inflater;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.web.bind.annotation.ResponseBody;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.EnvironmentVariableCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

public class S3Util {

    private static final String BUCKET = "involveu-image";
    private static final String accessKeyId = "AKIAUBDAJ3HEHCZV4XND";
    private static final String secretAccessKey = "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";
    Region region = Region.US_EAST_1;
    public void uploadFile(String fileName, InputStream inputStream) throws IOException {

        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKeyId, secretAccessKey);
        S3Client client = S3Client.builder().region(region).credentialsProvider(StaticCredentialsProvider.create(awsCreds)).build();

        PutObjectRequest request = PutObjectRequest.builder().bucket(BUCKET).key(fileName).acl("public-read").build();

        client.putObject(request, RequestBody.fromInputStream(inputStream, inputStream.available()));
    }

    public byte[] downloadFile(String keyName) throws IOException {

        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKeyId, secretAccessKey);
        S3Client client = S3Client.builder().region(region).credentialsProvider(StaticCredentialsProvider.create(awsCreds)).build();

        GetObjectRequest request = GetObjectRequest.builder().bucket(BUCKET).key(keyName).build();

        ResponseInputStream<GetObjectResponse> inputStream = client.getObject(request);

        ByteArrayOutputStream buffer = new ByteArrayOutputStream();

        int nRead;
        byte[] data = new byte[16384];

        ByteArrayOutputStream outputStream = null;
        while ((nRead = inputStream.read(data, 0, data.length)) != -1) {buffer.write(data, 0, nRead);}

        return buffer.toByteArray();
    }

    public boolean deleteImg(String filePath) {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(accessKeyId, secretAccessKey);
        S3Client client = S3Client.builder().region(region).credentialsProvider(StaticCredentialsProvider.create(awsCreds)).build();

        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(BUCKET)
                .key(filePath)
                .build();
        client.deleteObject(deleteObjectRequest);

        return false;
    }

}