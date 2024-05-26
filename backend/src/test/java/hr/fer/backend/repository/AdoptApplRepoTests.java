package hr.fer.backend.repository;

import hr.fer.backend.entity.AdoptApplEntity;
import hr.fer.backend.entity.DogEntity;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class AdoptApplRepoTests {
    @Autowired
    private AdoptApplRepo adoptApplRepo;

    @Autowired
    private DogRepo dogRepo;

    private DogEntity dogEntity;
    private AdoptApplEntity adoptApplEntity;

    @BeforeEach
    public void setUp() {
        // Arrange: Create and save a DogEntity
        dogEntity = new DogEntity();
        dogEntity.setName("Test Dog");
        dogEntity.setGender("m");
        dogEntity.setAge(2);
        dogEntity.setSize("v");
        dogEntity.setDescription("bla");
        dogEntity.setCity("grad");
        dogEntity.setId(1L);
        dogRepo.save(dogEntity);

        // Arrange: Create and save an AdoptApplEntity associated with the DogEntity
        adoptApplEntity = new AdoptApplEntity();
        adoptApplEntity.setDogId(dogEntity.getId());
        adoptApplEntity.setName("Test Applicant");
        adoptApplEntity.setEmail("email@email.com");
        adoptApplEntity.setCity("Grad");
        adoptApplEntity.setPhone("099999999");
        adoptApplEntity.setMessage("poruka");
        adoptApplRepo.save(adoptApplEntity);
    }

    @AfterEach
    public void tearDown() {
        // Clean up the database after each test
        adoptApplRepo.deleteAll();
        dogRepo.deleteAll();
    }


    @Test
    public void testFindByDogId() {

        // Act: Retrieve the list by dog ID
        Optional<List<AdoptApplEntity>> result = adoptApplRepo.findByDogId(1L);

        // Assert: Check that the result is not null and contains the expected data
        assertTrue(result.isPresent());
        List<AdoptApplEntity> adoptions = result.get();
        assertNotNull(adoptions);
        assertTrue(adoptions.size() > 0);
        assertTrue(adoptions.stream().anyMatch(adopt -> "Test Applicant".equals(adopt.getName())));
    }
}