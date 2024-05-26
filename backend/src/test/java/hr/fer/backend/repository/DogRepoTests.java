package hr.fer.backend.repository;

import hr.fer.backend.entity.BreedEntity;
import hr.fer.backend.entity.DogEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;



@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class DogRepoTests {

    @Autowired
    private DogRepo dogRepo;

    @Test
    public void testGetDogsNotNull() {
        List<DogEntity> dogs = dogRepo.findAll(Sort.by("name"));

        assertNotNull(dogs);
    }
}