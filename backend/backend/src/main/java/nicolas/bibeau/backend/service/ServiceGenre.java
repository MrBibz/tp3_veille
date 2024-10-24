package nicolas.bibeau.backend.service;

import nicolas.bibeau.backend.modele.Anime;
import nicolas.bibeau.backend.modele.AnimeResponse;
import nicolas.bibeau.backend.modele.Genre;
import nicolas.bibeau.backend.modele.GenreResponse;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceGenre extends ServiceAnime {

    private final HttpClient client = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<Genre> getGenres() {
        try {
            String URL_GENRES = "https://api.jikan.moe/v4/genres/anime";
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(URL_GENRES))
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            GenreResponse genreResponse = objectMapper.readValue(response.body(), GenreResponse.class);
            return genreResponse.getData();
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public List<Anime> rechercheParGenre(int id, int pageRequise) {
        List<Anime> resultats = new ArrayList<>();

        try {
            try {
                String urlRechercheParGenre = URL_API + "?genre=" + id + "&page=" + pageRequise;
                System.out.println(URL_API + "?genre=" + id + "&page=" + pageRequise);
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