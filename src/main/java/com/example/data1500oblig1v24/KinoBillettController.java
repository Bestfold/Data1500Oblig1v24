package com.example.data1500oblig1v24;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// REST-controller to handle communication to and from server through mappings.
@RestController
public class KinoBillettController
{
    // Initializing repository.
    @Autowired
    KinoBillettRepository kinoBillettRepository;

    // Posts a KinoBillett to DB using repository method.
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

    // Gets KinoBillett based on id.
    @GetMapping("/getBillettById")
    public KinoBillett getBillettById (long id)
    {
        return kinoBillettRepository.findKinoBillettById(id);
    }

    // Puts KinoBillett to update on DB.
    @PutMapping("/putBillettToDB")
    public void putBillettToDB (@RequestBody KinoBillett editedBillett)
    {
        System.out.println("Put request, arg: "+editedBillett);
        kinoBillettRepository.updateKinoBillett(editedBillett);
    }


    // Deletes single KinoBillett based on id.
    @DeleteMapping("/deleteBillettById")
    public void deleteBillettById (long id)
    {
        kinoBillettRepository.deleteKinoBillettById(id);
    }


    // Deletes all saved elements in DB.
    @DeleteMapping("/deleteAllRegistrerteBilletter")
    public void deleteAllBilletter()
    {
        kinoBillettRepository.deleteAllKinoBillett();
    }
}