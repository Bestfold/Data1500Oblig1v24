package com.example.data1500oblig1v24;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// REST-controller til å styre get- og post-mappings.
@RestController
public class KinoBillettController
{
    // Initializing repository.
    @Autowired
    KinoBillettRepository kinoBillettRepository;

    // Posts a KinoBillett to DB using repository method. @PostMapping is used here instead of
    // @PutMapping, because of simplicity, as jQuery does not have a $.put function.
    @PostMapping("/postKinoBillett")
    public void opprettBillett (KinoBillett kinoBillett)
    {
        System.out.println(kinoBillett.toString());

        kinoBillettRepository.insertKinoBillett(kinoBillett);
    }

    // Gets all registered KinoBilletter from DB and sends them to View.
    @GetMapping("/getRegistrerteBilletter")
    public List<KinoBillett> getBilletter() {

        return kinoBillettRepository.findAllKinoBillett();
    }

    // Deletes all saved elements in DB.
    // GetMapping is used instead of DeleteMapping for simplicity as there is no premade
    // AJAX request in jQuery. "$.delete" is not a function.
    @GetMapping("/getDeleteAllRegistrerteBilletter")
    public void deleteAllBilletter()
    {
        kinoBillettRepository.deleteAllKinoBileltt();
    }
}