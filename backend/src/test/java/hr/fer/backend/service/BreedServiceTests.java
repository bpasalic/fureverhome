package hr.fer.backend.service;


import hr.fer.backend.entity.BreedEntity;
import hr.fer.backend.repository.BreedRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class BreedServiceTests {
    @InjectMocks
    private BreedService breedService;

    @Mock
    private BreedRepo breedRepo;

    @Test
    public void testGetBreedById() {
        long breedId = 1L;
        BreedEntity mockBreed = new BreedEntity(breedId, "ovčar");

        // Mock the behavior of the repository to return the mock employee
        Mockito.when(breedRepo.findById(breedId)).thenReturn(Optional.of(mockBreed));

        // Act
        BreedEntity result = breedService.getBreed(breedId);

        // Assert
        assertNotNull(result);
        assertEquals(breedId, result.getId());
        assertEquals("ovčar", result.getName());
    }
}