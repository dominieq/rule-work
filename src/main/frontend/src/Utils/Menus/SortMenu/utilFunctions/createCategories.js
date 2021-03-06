import createFullCategories from "./createFullCategories";

/**
 * <h3>Overview</h3>
 * Creates categories where labels and values are the same.
 *
 * @memberOf SortMenu
 * @param {string[]} categories - The array of strings that will be used as labels and values.
 * @param {string} [noneLabel = "none"] - The label used to reset filtration.
 * @param {string} [noneValue = ""] - The value associated with <code>noneLabel</code>.
 * @returns {Object[]} - The array of categories.
 */
function createCategories(categories, noneLabel = "none", noneValue = "") {
    return createFullCategories(categories, categories, noneLabel, noneValue);
}

export default createCategories;
