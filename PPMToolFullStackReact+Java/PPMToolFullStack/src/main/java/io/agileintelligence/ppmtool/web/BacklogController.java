package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.ProjectTask;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import io.agileintelligence.ppmtool.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.naming.Binding;
import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {
    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{project_id}")
    public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask,
                                            BindingResult result, @PathVariable String project_id,
                                            Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);

        if (errorMap != null) {
            return errorMap;
        }

        ProjectTask addedProjectTask = projectTaskService.addProjectTask(project_id, projectTask, principal.getName());

        return new ResponseEntity<ProjectTask>(addedProjectTask, HttpStatus.CREATED);
    }

    @GetMapping("/{project_id}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String project_id, Principal principal) {

        return projectTaskService.findBacklogById(project_id, principal.getName());
    }

    @GetMapping("/{project_id}/{pt_id}")
    public ResponseEntity<?> getProjectTask(@PathVariable String project_id, @PathVariable String pt_id, Principal principal) {
        ProjectTask projectTask =  projectTaskService.findPTByProjectSequence(project_id, pt_id, principal.getName());

        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{project_id}/{pt_id}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
            @PathVariable String project_id, @PathVariable String pt_id, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);

        if (errorMap != null) {
            return errorMap;
        }

        ProjectTask updatedTask = projectTaskService.updateByProjectSequence(projectTask, project_id, pt_id, principal.getName());
        return new ResponseEntity<ProjectTask>(updatedTask, HttpStatus.OK);

    }

    @DeleteMapping("/{project_id}/{pt_id}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String project_id, @PathVariable String pt_id,
                                               Principal principal) {
        projectTaskService.deleteByProjectSequence(project_id, pt_id,principal.getName());
        return new ResponseEntity<String>("Project Task '" + pt_id + "' has been successfully deleted", HttpStatus.OK);
    }
}
