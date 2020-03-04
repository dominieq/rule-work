package pl.put.poznan.rulework.service;

import org.rulelearn.approximations.Union;
import org.rulelearn.approximations.Unions;
import org.rulelearn.approximations.VCDominanceBasedRoughSetCalculator;
import org.rulelearn.measures.dominance.EpsilonConsistencyMeasure;
import org.rulelearn.rules.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.put.poznan.rulework.model.Project;
import pl.put.poznan.rulework.model.ProjectsContainer;

import java.util.UUID;

@Service
public class RulesService {

    private static final Logger logger = LoggerFactory.getLogger(RulesService.class);

    @Autowired
    ProjectsContainer projectsContainer;

    private Project getProjectFromProjectsContainer(UUID id) {
        return projectsContainer.getProjectHashMap().get(id);
    }

    public RuleSetWithCharacteristics getRules(UUID id) {
        logger.info("Id:\t" + id);

        Project project = getProjectFromProjectsContainer(id);
        if(project == null) {
            return null;
        }

        return project.getRuleSetWithCharacteristics();
    }

    public RuleSetWithCharacteristics putRules(UUID id) {
        logger.info("Id:\t" + id);

        Project project = getProjectFromProjectsContainer(id);
        if(project == null) {
            return null;
        }

        Unions unions = project.getUnionsWithSingleLimitingDecision();

        final RuleInductionStoppingConditionChecker stoppingConditionChecker =
                new EvaluationAndCoverageStoppingConditionChecker(
                        EpsilonConsistencyMeasure.getInstance(),
                        EpsilonConsistencyMeasure.getInstance(),
                        ((VCDominanceBasedRoughSetCalculator) unions.getRoughSetCalculator()).getLowerApproximationConsistencyThreshold()
                );

        RuleInducerComponents certainRuleInducerComponents = new CertainRuleInducerComponents.Builder().
                ruleInductionStoppingConditionChecker(stoppingConditionChecker).
                ruleConditionsPruner(new AttributeOrderRuleConditionsPruner(stoppingConditionChecker)).
                build();

        RuleInducerComponents possibleRuleInducerComponents = new PossibleRuleInducerComponents.Builder().
                ruleInductionStoppingConditionChecker(stoppingConditionChecker).
                ruleConditionsPruner(new AttributeOrderRuleConditionsPruner(stoppingConditionChecker)).
                build();

        ApproximatedSetProvider unionAtLeastProvider = new UnionProvider(Union.UnionType.AT_LEAST, unions);
        ApproximatedSetProvider unionAtMostProvider = new UnionProvider(Union.UnionType.AT_MOST, unions);
        ApproximatedSetRuleDecisionsProvider unionRuleDecisionsProvider = new UnionWithSingleLimitingDecisionRuleDecisionsProvider();

        RuleSetWithComputableCharacteristics upwardCertainRules = (new VCDomLEM(certainRuleInducerComponents, unionAtLeastProvider, unionRuleDecisionsProvider)).generateRules();
        upwardCertainRules.calculateAllCharacteristics();
        RuleSetWithComputableCharacteristics downwardCertainRules = (new VCDomLEM(certainRuleInducerComponents, unionAtMostProvider, unionRuleDecisionsProvider)).generateRules();
        downwardCertainRules.calculateAllCharacteristics();

        RuleSetWithComputableCharacteristics upwardPossibleRules = (new VCDomLEM(possibleRuleInducerComponents, unionAtLeastProvider, unionRuleDecisionsProvider)).generateRules();
        upwardPossibleRules.calculateAllCharacteristics();
        RuleSetWithComputableCharacteristics downwardPossibleRules = (new VCDomLEM(possibleRuleInducerComponents, unionAtMostProvider, unionRuleDecisionsProvider)).generateRules();
        downwardPossibleRules.calculateAllCharacteristics();

        RuleSetWithCharacteristics tmpRuleSet1 = RuleSetWithCharacteristics.join(upwardCertainRules, downwardCertainRules);
        RuleSetWithCharacteristics tmpRuleSet2 = RuleSetWithCharacteristics.join(upwardPossibleRules, downwardPossibleRules);
        project.setRuleSetWithCharacteristics(RuleSetWithCharacteristics.join(tmpRuleSet1, tmpRuleSet2));

        return project.getRuleSetWithCharacteristics();
    }

}