package nicolas.bibeau.backend.presentation;

import nicolas.bibeau.backend.modele.Anime;
import nicolas.bibeau.backend.modele.Genre;
import nicolas.bibeau.backend.service.ServiceGenre;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ControleurGenre {

    private final ServiceGenre serviceGenre;

    public ControleurGenre(ServiceGenre serviceGenre) {
        this.serviceGenre = serviceGenre;
    }

    @GetMapping("/genres")
    public ResponseEntity<List<Genre>> getGenres() {
        List<Genre> genres = serviceGenre.getGenres();
        return ResponseEntity.ok(genres);
    }

    @GetMapping("/recherche-par-genre/{id}/page/{pageRequise}")
    public ResponseEntity<List<Anime>> rechercheParGenre(@PathVariable int id, @PathVariable int pageRequise) {
        System.out.println("Recherche par genre: " + id + " page: " + pageRequise);
        List<Anime> animes = serviceGenre.rechercheParGenre(id, pageRequise);
        return ResponseEntity.ok(animes);
    }
}
