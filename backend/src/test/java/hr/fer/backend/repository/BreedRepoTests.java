package hr.fer.backend.repository;

import java.util.List;

import hr.fer.backend.entity.BreedEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Sort;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class BreedRepoTests {

    @Autowired
    private BreedRepo breedRepository;

    @Test
    public void testGetBreedsNotNull() {
        List<BreedEntity> breedEntityList = breedRepository.findAll(Sort.by("name"));

        assertNotNull(breedEntityList);
    }
}