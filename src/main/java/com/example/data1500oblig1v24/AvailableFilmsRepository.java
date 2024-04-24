package com.example.data1500oblig1v24;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class AvailableFilmsRepository
{
    // Uses the Jdbc template to communicate and format to and from SQL-DB.
    @Autowired
    JdbcTemplate jdbcTemplate;


    class AvailableFilmsRowMapper implements RowMapper<AvailableFilms>
    {
        // RowMapper for String: AvailableFilms
        @Override
        public AvailableFilms mapRow(ResultSet rs, int rowNum) throws SQLException
        {
            AvailableFilms availableFilms = new AvailableFilms();
            availableFilms.setFilm(rs.getString("film"));
            availableFilms.setTitleSimple(rs.getString("titleSimple"));
            availableFilms.setHours(rs.getInt("hours"));
            availableFilms.setImageUrl(rs.getString("imageUrl"));
            return availableFilms;
        }
    }

    // Finds all films from DB.
    public List<AvailableFilms> findAllAvailableFilms()
    {
        try
        {
            String sql = "select * from AvailableFilms";
            return jdbcTemplate.query(sql, new AvailableFilmsRowMapper());
        }
        catch (Exception e)
        {
            System.out.println("SQL Query failed with exception: "+e);
            return null;
        }
    }

    // Finds a film from DB based on attribute titleSimple.
    public AvailableFilms findAvailableFilmByTitleSimple (String titleSimple)
    {
        try
        {
            String sql = "select * from AvailableFilms where titleSimple = ?";
            return jdbcTemplate.queryForObject(sql, new Object[]{titleSimple},
                    new AvailableFilmsRowMapper());
        }
        catch (Exception e)
        {
            System.out.println("SQL Query failed with exception: "+e);
            return null;
        }
    }
}
