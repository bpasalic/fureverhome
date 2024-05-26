package hr.fer.backend.service;
import hr.fer.backend.entity.DogEntity;
import hr.fer.backend.repository.DogRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class DogService {
    @Autowired
    private final DogRepo dogRepo;

    public List<DogEntity> getAllDogs() {
        return dogRepo.findAll();
    }

    public DogEntity getDog(Long id) {
        return dogRepo.findById(id).orElseThrow(()->new RuntimeException("Dog not found."));
    }

    public DogEntity createDog(DogEntity dog) {
        return dogRepo.save(dog);
    }
    public void deleteDogById(Long id) {
        dogRepo.deleteById(id);
    }

    public DogEntity updateDog(DogEntity dog, Long id) {
        DogEntity oldDog = dogRepo.findById(id).get();
        if(Objects.nonNull(dog.getName()) && !"".equalsIgnoreCase(dog.getName())) {
            oldDog.setName(dog.getName());
        }
        oldDog.setSize(dog.getSize());
        oldDog.setBreed(dog.getBreed());
        oldDog.setAge(dog.getAge());
        oldDog.setCity(dog.getCity());
        oldDog.setGender(dog.getGender());
        oldDog.setDescription(dog.getDescription());
        return dogRepo.save(oldDog);
    }
}
