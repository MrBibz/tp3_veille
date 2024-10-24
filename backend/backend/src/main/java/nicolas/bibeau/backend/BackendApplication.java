package nicolas.bibeau.backend;

import nicolas.bibeau.backend.modele.Genre;
import nicolas.bibeau.backend.service.ServiceGenre;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);

		ServiceGenre serviceGenre = new ServiceGenre();

		for (Genre genre : serviceGenre.getGenres()) {
			System.out.println(genre.getName());
		}
	}
}