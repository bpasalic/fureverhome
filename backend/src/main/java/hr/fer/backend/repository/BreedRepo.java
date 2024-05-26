package hr.fer.backend.repository;

import hr.fer.backend.entity.BreedEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface BreedRepo extends JpaRepository<BreedEntity, Long> {
    Optional<BreedEntity> findById(Long id);
    BreedEntity findByName(String name);
}
