import { responseJson } from "./utilFunctions";

async function fetchClassification(base, projectId, method, data) {
    const response = await fetch(`${base}/projects/${projectId}/classification`, {
        method: method,
        body: data
    }).catch(() => {
        throw { message: "Server not responding", open: true, severity: "error" };
    });

    return await responseJson(response);
}

export default fetchClassification;