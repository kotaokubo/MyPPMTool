package io.kotaokubo.ppmtool.services;

import io.kotaokubo.ppmtool.domain.Backlog;
import io.kotaokubo.ppmtool.domain.Project;
import io.kotaokubo.ppmtool.domain.ProjectTask;
import io.kotaokubo.ppmtool.exceptions.ProjectNotFoundException;
import io.kotaokubo.ppmtool.repositories.BacklogRepository;
import io.kotaokubo.ppmtool.repositories.ProjectRepository;
import io.kotaokubo.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;


    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {

        //PTs to be added to a specific project, project != null, BL exists
        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();
        //set the bl to pt
        projectTask.setBacklog(backlog);
        //we want our project sequence to be like this: IDPRO-1  IDPRO-2  ...100 101
        Integer BacklogSequence = backlog.getPTSequence();
        // Update the BL SEQUENCE
        BacklogSequence++;

        backlog.setPTSequence(BacklogSequence);

        //Add Sequence to Project Task
        projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        //Fix bug with priority in Spring Boot Server, needs to check null first
        //INITIAL priority when priority null
        if(projectTask.getPriority() == null ||projectTask.getPriority() == 0){
            projectTask.setPriority(3);
        }
        //INITIAL status when status is null
        if (projectTask.getStatus() == null) {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> findBacklogById(String id, String username) {

        projectService.findProjectByIdentifier(id, username);

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    /*
     * GET ProjectTask
     * Arg backlog_id, pt_id
     */
    public ProjectTask findPTByProjectSequence(String backlog_id, String pt_id, String username) {

        projectService.findProjectByIdentifier(backlog_id, username);

        // タスクの存在判定
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task: '"+pt_id+"'not found");
        }

        // パスが正しいプロジェクトに対応していることを確認
        if (!projectTask.getProjectIdentifier().equals(backlog_id)) {
            throw new ProjectNotFoundException("Project Task: '"+pt_id+"'does not exist in project: '" +backlog_id);
        }
        
        return projectTask;
    }

    /*
     * Update ProjectTask
     * Arg updatedTask, backlog_id, pt_id
     */
    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlog_id, String pt_id, String username) {

        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id, username);

        projectTask = updatedTask;
        return projectTaskRepository.save(projectTask);
    }

    /*
     * delete ProjectTask
     * Arg backlog_id, pt_id
     */
    public void deletePTByProjectSequence(String backlog_id, String pt_id, String username) {

        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id, username);
        
        projectTaskRepository.delete(projectTask);
    }
}