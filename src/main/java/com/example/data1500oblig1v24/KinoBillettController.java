package com.example.data1500oblig1v24;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// REST-controller til å styre get- og post-mappings.
@RestController
public class KinoBillettController
{

    List<KinoBillett> registrerteBilletter;
    List<String> tilgjengeligeFilmer;

    // Initierer JDBC
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Ved initiering av kontroller initieres også arrayene, og filmer array fylles med elementer.
    @PostConstruct
    public void oppstart()
    {
        //registrerteBilletter = new KinoBillett[10];
        /*
        tilgjengeligeFilmer = new String[10];
        tilgjengeligeFilmer[0] = "Pippi Langstrømpe 2: Dommedagen";
        tilgjengeligeFilmer[1] = "Professor Cosmin og Cosmonautene";
        tilgjengeligeFilmer[2] = "Oslo-Bergen med Bergensbanen 6t";
        tilgjengeligeFilmer[3] = "Gamle damer som sparker fotball";
        tilgjengeligeFilmer[4] = "Oslo-Bergen med den trans-Sibirske jernbane 238t";
        tilgjengeligeFilmer[5] = "Subway Surfers Doom Scrolling 8t";
        tilgjengeligeFilmer[6] = "Kristians 4-års bursdag (2002)";
         */
    }

    @GetMapping("/getTilgjengeligeFilmer")
    public List<String> getFilmer()
    {
        // Henter lagrede tilgjengelige filmer fra db-tabell.
        try
        {
            String sql = "select * from TilgjengeligeFilmer";
            jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(String.class));
        }
        catch (Exception e1)
        {
            System.out.println("Henting av tilgjengelige filmer feilet"+e1);
        }

        return tilgjengeligeFilmer;
    }

    @PostMapping("/postKinoBillett")
    public void opprettBillett (KinoBillett kinoBillett)
    {
        System.out.println(kinoBillett.toString());

        // Sende billett til db med JDBC.
        try
        {
            String sql = "insert into KinoBillett (FILM, ANTALL, FORNAVN, " +
                    "ETTERNAVN, TELEFON_NR, EPOST) values (?,?,?,?,?,?)";
            jdbcTemplate.update(sql, kinoBillett.getFilm(), kinoBillett.getAntall(),
                    kinoBillett.getFornavn(), kinoBillett.getEtternavn(),
                    kinoBillett.getTelefonNr(), kinoBillett.getEpost());

        }
        catch (Exception e1)
        {
            System.out.println("SQL-spørring feilet: "+e1);
        }
    }

    // Hent registrerte billetter fra db og send dem til view.
    @GetMapping("/getRegistrerteBilletter")
    public List<KinoBillett> getBilletter() {
        try
        {
            String sql = "select * from KinoBillett order by etternavn";
            registrerteBilletter = jdbcTemplate.query(sql, new BeanPropertyRowMapper(KinoBillett.class));
            return registrerteBilletter;

        }
        catch (Exception e1) {
            System.out.println("Select reg. billetter fra db mislyktes: "+e1);
            List<KinoBillett> tomListe = null;
            return tomListe;
        }
    }

    // Sletter alle lagrede elementer i billett-registeret.
    @GetMapping("/getDeleteAllRegistrerteBilletter")
    public void deleteAllBilletter()
    {
        try
        {
            // Tømmer List<>
            registrerteBilletter.clear();

            String sql = "delete from KinoBillett";

            // Sender sql-kommando.
            jdbcTemplate.update(sql);
            System.out.println("Alle registrerte billetter slettet");
        }
        catch (Exception e1)
        {
            System.out.println("Delete alle reg. billetter mislykket: "+e1);
        }

        /*
        for (int i = 0; i < registrerteBilletter.length; i++) {
            registrerteBilletter[i] = null;
        }
         */
    }
}