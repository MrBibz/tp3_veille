package nicolas.bibeau.backend.presentation;

import nicolas.bibeau.backend.modele.Anime;
import nicolas.bibeau.backend.modele.Genre;
import nicolas.bibeau.backend.service.ServiceAnime;
import nicolas.bibeau.backend.service.ServiceGenre;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ControleurAnime {

    private final ServiceAnime serviceAnime;

    public ControleurAnime(ServiceAnime serviceAnime) {
        this.serviceAnime = serviceAnime;
    }

    @GetMapping("/animes/page/{pageRequise}")
    public ResponseEntity<List<Anime>> getTousLesAnimes(@PathVariable int pageRequise) {
        List<Anime> animes = serviceAnime.getTousLesAnimes(pageRequise);
        return ResponseEntity.ok(animes);
    }
}
