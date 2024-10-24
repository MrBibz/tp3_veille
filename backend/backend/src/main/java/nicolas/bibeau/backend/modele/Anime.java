package nicolas.bibeau.backend.modele;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Anime {
    private int mal_id, episodes;
    private String title, title_japanese, status, synopsis;
    private List<Genre> genres;
}