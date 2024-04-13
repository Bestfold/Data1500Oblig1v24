package com.example.data1500oblig1v24;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class KinoBillettRepository
{
    // Uses the Jdbc template to communicate and format to and from SQL-DB.
    @Autowired
    JdbcTemplate jdbcTemplate;

    class KinoBillettRowMapper implements RowMapper<KinoBillett>
    {
        // RowMapper for KinoBillett object.
        @Override
        public KinoBillett mapRow(ResultSet rs, int rowNum) throws SQLException
        {
            KinoBillett kinoBillett = new KinoBillett();
            kinoBillett.setId(rs.getLong("id"));
            kinoBillett.setFilm(rs.getString("film"));
            kinoBillett.setAntall(rs.getInt("antall"));
            kinoBillett.setFornavn(rs.getString("fornavn"));
            kinoBillett.setEtternavn(rs.getString("etternavn"));
            kinoBillett.setTelefonNr(rs.getString("telefon_nr"));
            kinoBillett.setEpost(rs.getString("epost"));
            return kinoBillett;
        }
    }

    // Returns all KinoBillett from DB.
    public List<KinoBillett> findAllKinoBillett()
    {
        List<KinoBillett> registeredKinoBilletter;
        try
        {
            String sql = "select * from KinoBillett order by ETTERNAVN";
            registeredKinoBilletter = jdbcTemplate.query(sql, new KinoBillettRowMapper());
            return registeredKinoBilletter;
        }
        catch (Exception e)
        {
            System.out.println("SQL Query failed with exception: "+e);
            return null;
        }
    }

    // Inserts KinoBillett into DB.
    public void insertKinoBillett (KinoBillett kinoBillett)
    {
        try
        {
            String sql = "insert into KinoBillett(FILM, ANTALL, FORNAVN, ETTERNAVN," +
                    " TELEFON_NR, EPOST) values(?,?,?,?,?,?)";
            jdbcTemplate.update(sql,kinoBillett.getFilm(), kinoBillett.getAntall(),
                    kinoBillett.getFornavn(), kinoBillett.getEtternavn(),
                    kinoBillett.getTelefonNr(), kinoBillett.getEpost());
        }
        catch (Exception e)
        {
            System.out.println("SQL Insert failed with exception: "+e);
        }
    }

    // Deletes all registered KinoBillett in DB.
    public void deleteAllKinoBileltt ()
    {
        try
        {
            String sql = "delete from KinoBillett";
            jdbcTemplate.update(sql);
        }
        catch (Exception e)
        {
            System.out.println("SQL Delete failed with exception: "+e);
        }
    }
}
