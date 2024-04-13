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


    class AvailableFilmsRowMapper implements RowMapper<String>
    {
        // RowMapper for String: AvailableFilms
        @Override
        public String mapRow(ResultSet rs, int rowNum) throws SQLException
        {
            return rs.getString("film");
        }
    }

    // Finds all films from DB.
    public List<String> findAllAvailableFilms()
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
}
