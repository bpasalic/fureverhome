package hr.fer.backend.repository;

import hr.fer.backend.entity.DogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DogRepo extends JpaRepository<DogEntity, Long> {
    Optional<DogEntity> findById(Long id);

}
