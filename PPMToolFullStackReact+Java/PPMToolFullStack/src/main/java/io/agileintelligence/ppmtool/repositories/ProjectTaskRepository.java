package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {

        Iterable<ProjectTask> findByProjectIdentifierOrderByPriority(String projectId);

        ProjectTask findByProjectSequence(String projectSequence);
}
