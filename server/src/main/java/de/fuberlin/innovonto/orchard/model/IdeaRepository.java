package de.fuberlin.innovonto.orchard.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IdeaRepository extends CrudRepository<Idea, UUID> {
    Iterable<Idea> findAllByIdeaContest(String ideaContest);
}
