package nicolas.bibeau.backend.modele;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Pagination {
    private int last_visible_page;
    private boolean has_next_page;

    public boolean hasNextPage() {
        return has_next_page;
    }
}