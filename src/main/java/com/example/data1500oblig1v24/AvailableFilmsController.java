package com.example.data1500oblig1v24;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AvailableFilmsController
{
    @Autowired
    AvailableFilmsRepository availableFilmsRepository;

    // Gets available films to portray in the dropdown menu.
    @GetMapping("/getAvailableFilms")
    public List<AvailableFilms> getFilmer()
    {
        // Uses the repository method to find from DB.
        return availableFilmsRepository.findAllAvailableFilms();
    }

    // Gets AvailableFilms object based on film-name
    @GetMapping("/getAvailableFilmsByTitleSimple")
    public AvailableFilms getFilmsByName (@RequestParam String titleSimple)
    {
        return availableFilmsRepository.findAvailableFilmByTitleSimple(titleSimple);
    }
}
