package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Backlog;
import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.exceptions.BacklogException;
import io.agileintelligence.ppmtool.repositories.BacklogRepository;
import io.agileintelligence.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Transactional
    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        // Project tasks added to a Project, project != null (backlog exists)
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

        if (backlog == null) {
            throw new BacklogException("Backlog for Project ID '" + projectIdentifier + "' not exists.");
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
}
