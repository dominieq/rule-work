import { AlertError, InvalidPathParamsException } from "../../../Classes";
import { responseJson } from "../parseResponse";

/**
 * <h3>Overview</h3>
 * Performs an API call with GET or PUT method and a specified body on <code>/projects/{projectId}/crossValidation</code>
 * where <code>projectId</code> is the identifier of a selected project.
 *
 * <h3>Goal</h3>
 * The goal of this function is to retrieve or calculate cross-validation for a selected project.
 *
 * <h3>Example response</h3>
 * <pre><code>
 *     {
 *         "isCurrentData": true,
 *         "parameters": {
 *              "typeOfUnions": "MONOTONIC",
 *              "consistencyThreshold": 0.0,
 *              "typeOfRules": "CERTAIN",
 *              "classifierType": "SIMPLE_RULE_CLASSIFIER",
 *              "defaultClassificationResultType": "MAJORITY_DECISION_CLASS",
 *              "numberOfFolds": 10,
 *              "seed": 0
 *         }
 *     }
 * </pre></code>
 *
 * <h3>Usage</h3>
 * In order to calculate cross-validation with the following parameters:
 * <ul>
 *     <li>type of unions - monotonic</li>
 *     <li>consistency threshold - 0.0</li>
 *     <li>type of rules - certain</li>
 *     <li>classifier type - simple rule classifier</li>
 *     <li>default classification result type - majority decision class</li>
 *     <li>number of folds - 10</li>
 * </ul>
 * create a <code>FormData</code> object and append mentioned parameters to the body using <code>append</code> method.
 *
 * @category Utils
 * @subcategory Functions
 * @param {string} pathParams - The path parameters in the URL of an API call.
 * @param {string} pathParams.projectId - The identifier of a selected project.
 * @param {string} method - The HTTP method of an API call.
 * @param {Object} body - The body in the message of an API call.
 * @param {string} [base=http://localhost:8080] - The host and port in the URL of an API call.
 * @throws AlertError
 * @throws InvalidPathParamsException
 * @returns {Promise<Object>}
 */
async function fetchCrossValidation(pathParams, method, body, base = "http://localhost:8080") {
    if (!(pathParams != null && pathParams.hasOwnProperty("projectId"))) {
        throw new InvalidPathParamsException("Path params should be defined when fetching cross-validation", pathParams);
    }

    if (body != null && !body instanceof FormData) {
        throw new InvalidPathParamsException("Body should be a valid FormData object.", body);
    }

    const url = new URL(`/projects/${pathParams.projectId}/crossValidation`, base)

    const response = await fetch(url, { method, body }).catch(() => {
        throw new AlertError("Server not responding", true, "error");
    });

   return await responseJson(response);
}

export default fetchCrossValidation;
