package nicolas.bibeau.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import nicolas.bibeau.backend.modele.Anime;
import nicolas.bibeau.backend.modele.AnimeResponse;
import nicolas.bibeau.backend.modele.GenreResponse;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@Service
@Getter
public class ServiceAnime {

    protected final HttpClient client = HttpClient.newHttpClient();
    protected final ObjectMapper objectMapper = new ObjectMapper();

    protected final String URL_API = "https://api.jikan.moe/v4/anime";

    public List<Anime> getTousLesAnimes(int pageRequise) {
        List<Anime> resultats = new ArrayList<>();

        try {
            try {
                String urlRechercheParGenre = URL_API + "?page=" + pageRequise;
                System.out.println(URL_API + "?page" + pageRequise);
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(urlRechercheParGenre))
                        .build();
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                AnimeResponse animeResponse = objectMapper.readValue(response.body(), AnimeResponse.class);
                if (animeResponse.getData() != null) {
                    resultats.addAll(animeResponse.getData());
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            return resultats;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
