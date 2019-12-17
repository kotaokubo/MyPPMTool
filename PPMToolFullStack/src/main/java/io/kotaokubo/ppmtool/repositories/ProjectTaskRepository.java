package io.kotaokubo.ppmtool.repositories;

import io.kotaokubo.ppmtool.domain.Backlog;
import io.kotaokubo.ppmtool.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {

    List<ProjectTask> findByProjectIdentifierOrderByPriority(String id);
}
