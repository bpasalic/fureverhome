package hr.fer.backend.service;

import hr.fer.backend.entity.AdoptApplEntity;
import hr.fer.backend.repository.AdoptApplRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdoptApplService {
    private final AdoptApplRepo adoptApplRepo;

    public List<AdoptApplEntity> getAllAppForDog(Long id) {
        return adoptApplRepo.findByDogId(id).orElseThrow(()->new RuntimeException("No applications yet:("));
    }

    public AdoptApplEntity createAppl(AdoptApplEntity adoptApplEntity) {
        return adoptApplRepo.save(adoptApplEntity);
    }

    public AdoptApplEntity updateAppl(Long id, AdoptApplEntity adoptApplEntity) {
        Optional<AdoptApplEntity> existingAppl = adoptApplRepo.findById(id);

        if (existingAppl.isPresent()) {
            AdoptApplEntity applToUpdate = existingAppl.get();
            applToUpdate.setDogId(adoptApplEntity.getDogId());
            applToUpdate.setName(adoptApplEntity.getName());
            applToUpdate.setEmail(adoptApplEntity.getEmail());
            applToUpdate.setPhone(adoptApplEntity.getPhone());
            applToUpdate.setCity(adoptApplEntity.getCity());
            applToUpdate.setMessage(adoptApplEntity.getMessage());
            return adoptApplRepo.save(applToUpdate);
        } else {
            throw new RuntimeException("Adoption Application not found");
        }
    }

    @Transactional
    public void deleteByDogId(Long id) {
        adoptApplRepo.deleteByDogId(id);
    }

    public void delete(Long id) {
        adoptApplRepo.deleteById(id);
    }
}
