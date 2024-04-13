package com.example.data1500oblig1v24;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.EnumNaming;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


// Lager konstruktører og get-set-ere.
//@NoArgsConstructor
//@AllArgsConstructor
//@Data

//@Entity
//@Table(name="kinobillett")
public class KinoBillett
{

    //@Id
    //@GeneratedValue(strategy = GenerationType.AUTO) // Genererer automatisk PK.
    private long id;

    private String film;
    private int antall;
    private String fornavn;
    private String etternavn;
    private String telefonNr;
    private String epost;




    // Konstruktører for com.example.data1500oblig1v24.KinoBillett-objektet.

    public KinoBillett(){};

    public KinoBillett(String film, int antall, String fornavn, String etternavn, String telefonNr, String epost)
    {
        //this.id = id;
        this.film = film;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefonNr = telefonNr;
        this.epost = epost;
    }


    // Get- Set-metoder


    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public String getFilm() {
        return film;
    }
    public void setFilm(String film) {
        this.film = film;
    }

    public int getAntall() {
        return antall;
    }
    public void setAntall(int antall) {
        this.antall = antall;
    }

    public String getFornavn() {
        return fornavn;
    }
    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }
    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public String getTelefonNr() {
        return telefonNr;
    }
    public void setTelefonNr(String telefonNr) {
        this.telefonNr = telefonNr;
    }

    public String getEpost() {
        return epost;
    }
    public void setEpost(String epost) {
        this.epost = epost;
    }


    // toString() for com.example.data1500oblig1v24.KinoBillett
    @Override
    public String toString()
    {
        String utString = "";

        utString +=  "Film: "+film+"\tAntall: "+antall+"\tFornavn: "+
                fornavn+"\tEtternavn: "+etternavn+"\tTelefonNr: "+telefonNr+"\tEpost: "+epost;

        return utString;
    }
}
