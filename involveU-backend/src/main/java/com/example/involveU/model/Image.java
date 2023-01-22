package com.example.involveU.model;

import java.sql.Blob;

public class Image {

    String imageName;

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public Blob getImage() {
        return image;
    }

    public void setImage(Blob image) {
        this.image = image;
    }

    Blob image;



}
