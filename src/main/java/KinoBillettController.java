import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// REST-controller til å styre get- og post-mappings.
@RestController
public class KinoBillettController {

    @PostConstruct


    @PostMapping("/recieveKinoBillett")
    public void opprettBillett (@RequestBody KinoBillett kinoBillett) {
        System.out.println(kinoBillett.toString());


    }

}