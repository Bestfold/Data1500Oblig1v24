package com.example.data1500oblig1v24;

public class AvailableFilms {
    private String film;
    private String titleSimple;
    private int hours;
    private String imageUrl;


    // Constructors
    public AvailableFilms() {}

    public AvailableFilms(String film, String titleSimple, int hours, String imageUrl)
    {
        this.film = film;
        this.titleSimple = titleSimple;
        this.hours = hours;
        this.imageUrl = imageUrl;
    }


    // Getters and setters
    public String getFilm() {
        return film;
    }
    public void setFilm(String film) {
        this.film = film;
    }

    public String getTitleSimple() {
        return titleSimple;
    }
    public void setTitleSimple(String titleSimple) {
        this.titleSimple = titleSimple;
    }

    public int getHours() {
        return hours;
    }
    public void setHours(int hours) {
        this.hours = hours;
    }

    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
