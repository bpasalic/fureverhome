package hr.fer.backend.service;

import hr.fer.backend.entity.BreedEntity;
import hr.fer.backend.repository.BreedRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class BreedService {
    private final BreedRepo breedRepo;

    public List<BreedEntity> getAllBreeds() {
        return breedRepo.findAll(Sort.by("name"));
    }

    public BreedEntity getBreed(Long id) {
        return breedRepo.findById(id).orElseThrow(()->new RuntimeException("Breed not found."));
    }

    public BreedEntity createBreed(BreedEntity breedEntity) {
        BreedEntity existingBreed = breedRepo.findByName(breedEntity.getName());
        if (existingBreed != null) {
            throw new RuntimeException("Breed name must be unique. A breed with this name already exists.");
        }
        return breedRepo.save(breedEntity);
    }

    public BreedEntity updateBreed(BreedEntity breed, Long id) {
        BreedEntity oldBreed = breedRepo.findById(id).get();
        if(Objects.nonNull(breed.getName()) && !"".equalsIgnoreCase(breed.getName())) {
            oldBreed.setName(breed.getName());

        }
        return breedRepo.save(oldBreed);
    }
    @Transactional
    public void deleteBreedById(Long id) {
        breedRepo.deleteById(id);
    }
}
