package com.example.data1500oblig1v24;

import com.sun.source.tree.TryTree;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

// REST-controller til å styre get- og post-mappings.
@RestController
public class KinoBillettController {

    KinoBillett[] registrerteBilletter;
    String[] tilgjengeligeFilmer;

    // Initierer JDBC
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Ved initiering av kontroller initieres også arrayene, og filmer array fylles med elementer.
    @PostConstruct
    public void oppstart() {
        registrerteBilletter = new KinoBillett[10];

        tilgjengeligeFilmer = new String[10];
        tilgjengeligeFilmer[0] = "Pippi Langstrømpe 2: Dommedagen";
        tilgjengeligeFilmer[1] = "Professor Cosmin og Cosmonautene";
        tilgjengeligeFilmer[2] = "Oslo-Bergen med Bergensbanen 6t";
        tilgjengeligeFilmer[3] = "Gamle damer som sparker fotball";
        tilgjengeligeFilmer[4] = "Oslo-Bergen med den trans-Sibirske jernbane 238t";
        tilgjengeligeFilmer[5] = "Subway Surfers Doom Scrolling 8t";
        tilgjengeligeFilmer[6] = "Kristians 4-års bursdag (2002)";
    }

    @GetMapping("/getTilgjengeligeFilmer")
    public String[] getFilmer() {
        return tilgjengeligeFilmer;
    }

    @PostMapping("/postKinoBillett")
    public void opprettBillett (KinoBillett kinoBillett) {
        System.out.println(kinoBillett.toString());
        for (int i = 0; i < registrerteBilletter.length; i++) {
            if (registrerteBilletter[i] == null) {
                registrerteBilletter[i] = kinoBillett;
                break;
            }
        }

        try {
            String sql = "insert into KinoBillett (FILM, ANTALL, FORNAVN, " +
                    "ETTERNAVN, TELEFON_NR, EPOST) values (?,?,?,?,?,?)";
            jdbcTemplate.update(sql, kinoBillett.getFilm(), kinoBillett.getAntall(),
                    kinoBillett.getFornavn(), kinoBillett.getEtternavn(),
                    kinoBillett.getTelefonNr(), kinoBillett.getEpost());

        } catch (Exception e1) {
            System.out.println("SQL-spørring feilet: "+e1);
        }
    }

    @GetMapping("/getRegistrerteBilletter")
    public KinoBillett[] sendBilletter () {
        return registrerteBilletter;
    }

    // Sletter alle lagrede elementer i billett-registeret.
    @GetMapping("/getDeleteAllRegistrerteBilletter")
    public void deleteAllBilletter() {
        for (int i = 0; i < registrerteBilletter.length; i++) {
            registrerteBilletter[i] = null;
        }
        System.out.println("Alle registrerte billetter slettet");
    }


}