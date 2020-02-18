package pl.put.poznan.rulework.service;

import org.rulelearn.approximations.*;
import org.rulelearn.data.InformationTableWithDecisionDistributions;
import org.rulelearn.measures.dominance.EpsilonConsistencyMeasure;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.put.poznan.rulework.model.Project;
import pl.put.poznan.rulework.model.ProjectsContainer;

import java.util.UUID;

@Service
public class UnionsWithSingleLimitingDecisionService {

    private static final Logger logger = LoggerFactory.getLogger(UnionsWithSingleLimitingDecisionService.class);

    @Autowired
    ProjectsContainer projectsContainer;

    private Project getProjectFromProjectsContainer(UUID id) {
        return projectsContainer.getProjectHashMap().get(id);
    }

    public UnionsWithSingleLimitingDecision getUnionsWithSingleLimitingDecision(UUID id, Double consistencyThreshold) {
        logger.info("Id:\t" + id);
        if(consistencyThreshold != null) logger.info("ConsistencyThreshold:\t" + consistencyThreshold);

        Project project = getProjectFromProjectsContainer(id);
        if(project == null) {
            return null;
        }

        if(consistencyThreshold != null) {
            UnionsWithSingleLimitingDecision unionsWithSingleLimitingDecision = new UnionsWithSingleLimitingDecision(
                new InformationTableWithDecisionDistributions(project.getInformationTable()),
                new VCDominanceBasedRoughSetCalculator(EpsilonConsistencyMeasure.getInstance(), consistencyThreshold)
            );

            project.setUnionsWithSingleLimitingDecision(unionsWithSingleLimitingDecision);
            project.setCalculatedUnionsWithSingleLimitingDecision(true);
        }

        return project.getUnionsWithSingleLimitingDecision();
    }
}