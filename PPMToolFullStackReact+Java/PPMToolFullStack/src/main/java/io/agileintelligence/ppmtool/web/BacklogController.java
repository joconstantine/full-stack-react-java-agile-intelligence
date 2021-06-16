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
                                            BindingResult result, @PathVariable String project_id) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);

        if (errorMap != null) {
            return errorMap;
        }

        ProjectTask addedProjectTask = projectTaskService.addProjectTask(project_id, projectTask);

        return new ResponseEntity<ProjectTask>(addedProjectTask, HttpStatus.CREATED);
    }

    @GetMapping("/{project_id}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String project_id) {

        return projectTaskService.findBacklogById(project_id);
    }

    @GetMapping("/{project_id}/{pt_id}")
    public ResponseEntity<?> getProjectTask(@PathVariable String project_id, @PathVariable String pt_id) {
        ProjectTask projectTask =  projectTaskService.findPTByProjectSequence(project_id, pt_id);

        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }
}
