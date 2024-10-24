package nicolas.bibeau.backend.modele;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

import java.util.List;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AnimeResponse {
    private List<Anime> data;
    private Pagination pagination;
}