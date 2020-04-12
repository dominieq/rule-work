import { getItemName } from "./utilFunctions";

function parseCrossValidationItems(fold, settings) {
    let items = [];

    if (fold && Object.keys(fold).length) {
        for (let i = 0; i < fold.validationTable.objects.length; i++) {
            items.push({
                id: i,
                name: getItemName(i, fold.validationTable.objects, settings),
                traits: {
                    ...fold.validationTable,
                    ...fold.classificationValidationTable.classificationResults[i]
                },
                tables: {
                    indicesOfCoveringRules: fold.classificationValidationTable.indicesOfCoveringRules[i],
                },
            });
        }
    }

    return items;
}

export default parseCrossValidationItems;
