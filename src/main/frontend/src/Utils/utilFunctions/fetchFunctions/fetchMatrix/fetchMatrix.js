import { AlertError, InvalidPathParamsException } from "../../../Classes";
import { responseJson } from "../parseResponse";

/**
 * Performs an API call with GET method on <code>/projects/{projectId}/classification/misclassificationMatrix</cdode>
 * or <code>/projects/{projectId}/crossValidation/{foldIndex}/misclassificationMatrix</code>
 * to retrieve information about misclassifcation matrix from selected project.
 *
 * @category Utils
 * @subcategory Functions
 * @param {string} resource -  The name of a selected resource.
 * @param {Object} pathParams - The path parameters in the URL of an API call.
 * @param {string} pathParams.projectId - The identifier of a selected project.
 * @param {Object} [queryParams] - The query parameters in the URL of an API call.
 * @param {string} queryParams.typeOfMatrix - The type of matrix to fetch.
 * @param {string} [queryParams.numberOfFold] - The index of a selected fold.
 * @param {string} [base=http://localhost:8080] - The host in the URL of an API call.
 * @throws AlertError
 * @throws InvalidPathParamsException
 * @returns {Promise<Object>}
 */
async function fetchMatrix(resource, pathParams, queryParams, base = "http://localhost:8080") {
    if (!(resource != null && resource !== "")) {
        throw new InvalidPathParamsException("Resource should be defined when fetching matrix.", { resource });
    }

    if (!(pathParams != null && pathParams.hasOwnProperty("projectId"))) {
        throw new InvalidPathParamsException("Path params should be defined when fetching matrix.", pathParams);
    }

    const url = new URL(`/projects/${pathParams.projectId}/${resource}/misclassificationMatrix`, base);

    if (queryParams != null) {
        if (queryParams.hasOwnProperty("typeOfMatrix")) {
            url.searchParams.append("typeOfMatrix", queryParams.typeOfMatrix);
        }
        if (queryParams.hasOwnProperty("numberOfFold")) {
            url.searchParams.append("numberOfFold", queryParams.numberOfFold);
        }
    }

    const response = await fetch(url, {
        method: "GET"
    }).catch(() => {
        throw new AlertError("Server not responding", true, "error");
    });

    return await responseJson(response);
}

export default fetchMatrix;
