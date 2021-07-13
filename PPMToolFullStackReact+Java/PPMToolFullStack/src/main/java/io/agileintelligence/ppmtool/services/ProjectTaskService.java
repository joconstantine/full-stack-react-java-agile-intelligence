package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import io.agileintelligence.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ProjectTaskService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectService projectService;

    @Transactional
    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {
        // Project tasks added to a Project, project != null (backlog exists)
        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();

        if (backlog == null) {
            throw new ProjectNotFoundException("Backlog for Project ID '" + projectIdentifier + "' not exists.");
        }
        // set backlog
        projectTask.setBacklog(backlog);
        // PT sequence = project ID + sequence no.
        Integer backlogSequence = backlog.getPTSequence();
        backlogSequence++; //increase by 1
        // Update the BL Sequence
        projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        //Update Backlog
        backlog.setPTSequence(backlogSequence);

        // Initiate priority if null
        if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }

        // Initiate status if null
        if (projectTask.getStatus() == null || projectTask.getStatus().equals("")) {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> findBacklogById(String projectId, String username) {
        Project project = projectService.findProjectByIdentifier(projectId, username);

        if (project == null) {
            throw new ProjectNotFoundException("Project with ID '" + projectId + "' does not exist");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority((projectId));
    }

    public ProjectTask findPTByProjectSequence(String projectId, String sequence, String username) {

        // make sure we are searching on the right backlog
        Backlog backlog = projectService.findProjectByIdentifier(projectId, username).getBacklog();
        if (backlog == null) {
            throw new ProjectNotFoundException("Project with ID '" + projectId + "' does not exist");
        }

        // make sure that our task exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task '" + sequence + "' does not exist");
        }

        // make sure that the backlog/project id in the path corresponds to the right project
        if (!projectTask.getBacklog().getProjectIdentifier().equals(projectId)) {
            throw new ProjectNotFoundException("Project Task '" + sequence + "' does not exist " +
                    "in project '" + projectId + "'");
        }

        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String projectId, String sequence, String username) {
        ProjectTask projectTask = findPTByProjectSequence(projectId, sequence, username);
        if (!updatedTask.getProjectSequence().equals(projectTask.getProjectSequence())) {
            throw new ProjectNotFoundException("Something wrong happened.");
        }
        projectTask = updatedTask;

        return projectTaskRepository.save(projectTask);
    }

    public void deleteByProjectSequence(String projectId, String sequence, String username) {
        ProjectTask projectTask = findPTByProjectSequence(projectId, sequence, username);

        projectTaskRepository.delete(projectTask);
    }
}
